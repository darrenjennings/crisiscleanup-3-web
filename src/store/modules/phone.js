import { EventBus } from '@/event-bus';
import Pda from '@/models/Pda';
import PhoneOutbound from '@/models/PhoneOutbound';
import Worksite from '@/models/Worksite';
import * as ConnectService from '@/services/acs.service';
import * as SSO from '@/services/sso.service';
import { PhoneApi } from '@/utils/api';
import Logger from '@/utils/log';
import axios from 'axios';
import { camelCase } from 'lodash';

const Log = Logger({
  name: 'phone.store',
  middlewares: [
    (result) => {
      result.unshift('[phone.store] ');
      return result;
    },
  ],
});

const getStateDefaults = () => ({
  contact: {
    id: null,
    duration: null,
    state: null,
    attributes: {
      pdas: [],
      worksites: [],
      outboundIds: [],
      callerId: null,
    },
  },
  controller: {
    contactId: null,
    outboundId: null,
    cases: {
      pdas: [],
      worksites: [],
    },
    resolved: false,
    currentCase: {
      id: null,
      type: null,
    },
    status: {
      id: null,
      notes: '',
    },
  },
});

/**
 * @todo Refactor Phone and Split into multiple Stores
 * @body Split into Controller, Agent, Contact substores.
 */

const PhoneState = {
  agent: {},
  agentState: ConnectService.STATES.OFFLINE,
  agentConfig: null,
  metrics: {},
  connectRunning: false,
  connectAuthed: false,
  streams: null,
  popupOpen: false,
  credentials: SSO.retrieveCredentials(),
  ...getStateDefaults(),
};

// getters
const getters = {
  agentId: (state) => (state.agent ? state.agent.agent_id : null),
  agentState: (state) =>
    state.agentState !== null
      ? state.agentState
      : ConnectService.STATES.OFFLINE,
  connectRunning: (state) => state.connectRunning, // is connect initialized?
  connectReady: (state) => state.connectRunning && state.agentConfig, // is connect done w/ init and auth?
  popupOpen: (state) => state.popupOpen,
  authToken: (state) =>
    state.credentials ? state.credentials.AccessToken : '',
  agentAvailable: (state) =>
    state.agentState === ConnectService.STATES.ROUTABLE,
  callIncoming: (state) =>
    state.agentState === ConnectService.STATES.PENDING_CALL,
  contactState: (state) =>
    state.contact.id ? state.contact.state : ConnectService.STATES.POLLING,
  contactAttributes: (state) =>
    state.contact.attributes ? state.contact.attributes : {},
  callerId: (state) =>
    state.contact.attributes ? state.contact.attributes.callerId : '',
  pdas: (state) => (state.controller ? state.controller.cases.pdas : []),
  worksites: (state) =>
    state.controller ? state.controller.cases.worksites : [],
  callDuration: (state) => (state.contact ? state.contact.duration : 0),
  currentCases: (state) => (state.controller ? state.controller.cases : {}),
  currentPdaId: (state) => {
    const {
      controller: { currentCase },
    } = state;
    if (currentCase.type === 'pda') {
      return currentCase.id;
    }
    return null;
  },
  casesResolved: (state) =>
    state.controller ? state.controller.resolved : false,
  currentCaseId: (state) => {
    const {
      controller: {
        currentCase: { id },
      },
    } = state;
    if (id) {
      return id;
    }
    return null;
  },
  currentCase: (state) => {
    const {
      controller: {
        currentCase: { id, type },
      },
    } = state;
    if (id) {
      switch (type) {
        case 'pda':
          return Pda.find(id);
        case 'worksite':
          return Worksite.find(id);
        default:
          return null;
      }
    }
    return null;
  },
  outboundIds: (state) =>
    state.contact.attributes ? state.contact.attributes.outboundIds : [],
  currentOutbound: (state) => {
    const {
      controller: { outboundId, currentCase },
    } = state;
    if (outboundId) {
      return PhoneOutbound.find(outboundId);
    }
    if (currentCase) {
      const caseIdx = state.contact.attributes.pdas.indexOf(
        state.controller.currentCase.id,
      );
      const id = state.contact.attributes.outboundIds.filter((outId, idx) =>
        idx === caseIdx ? outId : false,
      );
      if (id) {
        return PhoneOutbound.find(id[0]);
      }
    }

    return null;
  },
  currentCaseType: (state) =>
    state.controller.currentCase ? state.controller.currentCase.type : null,
  caseStatusId: (state) =>
    state.controller.status ? state.controller.status.id : null,
};

// actions
const actions = {
  async getRealtimeMetrics({ commit }) {
    const resp = await axios.get(PhoneApi('metrics'));
    const newState = {};
    resp.data.results.map(({ name, value }) => {
      newState[camelCase(name)] = parseFloat(value);
      return newState;
    });
    // custom metrics
    const metric = ConnectService.METRICS;
    const needed =
      newState[metric.CONTACTS_QUEUED] - newState[metric.AVAILABLE];
    newState[metric.NEEDED] = needed >= 0 ? needed : 0;
    commit('setMetrics', newState);
    return resp;
  },
  async initConnect({ state, commit, dispatch }, htmlEl) {
    try {
      ConnectService.initConnect({
        htmlEl,
        config: { authToken: getters.authToken(PhoneState) },
        onAuth: () =>
          commit('setConnectState', { running: true, authed: true }),
        // refresh session
        onTimeout: () => this.setPopup(true),
      });
    } catch (e) {
      /**
       * @todo Debug Hidden ValueError on ACS Init
       * @body aws-connect-streams consistently raises a ValueError on startup.
       *       Seems to be harmless...
       */
      Log.error(e);
    }
    Log.debug('waiting for agent...');
    ConnectService.bindAgentEvents({
      onRefresh: async (agent) => {
        if (!state.connectRunning) {
          Log.debug('got initial agent agent!');
          const agentConfig = await agent.getConfiguration();
          Log.debug('got agent config: ', agentConfig);
          commit('setConnectState', {
            running: true,
            authed: true,
            config: agentConfig,
          });
        }
        const rawAgentState = await agent.getState();
        Log.debug('raw agent state: ', rawAgentState);
        const agentState = ConnectService.parseAgentState(rawAgentState);
        Log.debug('new agent state inbound:', agentState);
        commit('setAgentState', agentState);
      },
    });
    ConnectService.bindContactEvents({
      onRefresh: (contact) => {
        // Keep our contact state
        // in sync with connect
        const contactId = contact.getContactId();
        const contactState = contact.getStatus();
        const duration = contact.getStatusDuration();
        const contactAttrs = contact.getAttributes();
        Log.debug('got contact attributes:', contactAttrs);
        const { pdas, worksites, callerID, ids } = contactAttrs;
        Log.debug('contact refresh: ', contactState);
        const workSites = worksites.value.split(',').filter((v) => v !== '');
        const Pdas = pdas.value.split(',').filter((v) => v !== '');
        const outboundIds = ids.value.split(',').filter((v) => v !== '');
        const attributes = {
          callerId: callerID.value,
          worksites: workSites,
          pdas: Pdas,
          outboundIds,
        };
        commit('setContact', {
          id: contactId,
          duration,
          state: contactState.type,
          attributes,
        });
        dispatch('rehydrateController');
        EventBus.$emit(ConnectService.EVENTS.INBOUND, attributes);
        commit('setControllerState', { contactId });
      },
    });
  },
  async setPopup({ commit }, state = true) {
    Log.debug('setting popup:', state);
    ConnectService.setPopup({ open: state });
    commit('setPopupState', state);
  },
  async setAgentState({ commit }, state) {
    ConnectService.setAgentState(state);
    commit('setAgentState', { newState: state });
  },
  async setAgent({ commit }, agent) {
    commit('setAgent', agent);
  },
  async syncCallDuration({ commit }) {
    const agent = ConnectService.getAgent();
    const [contact] = agent.getContacts();
    commit('setContact', {
      duration: contact.getStatusDuration(),
    });
    return this.callDuration;
  },
  async stashController({ state }) {
    // store controller state
    const { controller } = state;
    Log.debug('stashing controller state...', controller);
    localStorage.setItem('ccu-ivr-ctrl', JSON.stringify(controller));
    return controller;
  },
  async rehydrateController({ state, commit }) {
    // rehydrate controller state from cookie
    Log.debug('rehydrating controller...');
    const ctrlState = JSON.parse(localStorage.getItem('ccu-ivr-ctrl'));
    if (!ctrlState) {
      Log.debug('controller rehydration bailed, no state found!');
      return null;
    }
    Log.debug('stored state:', ctrlState);
    if (state.contact.id && state.contact.id === ctrlState.contactId) {
      Log.debug('success! controller rehydrated.');
      commit('setControllerState', ctrlState);
      return ctrlState;
    }
    Log.debug('controller rehydration bailed, contact state mismatch!', {
      id: state.contact.id,
      contactId: ctrlState.contactId,
    });
    return ctrlState;
  },
  async addCases({ state, commit, dispatch }, { worksites, pdas }) {
    const { controller } = state;
    const newWorksites = new Set([
      ...controller.cases.worksites,
      ...(worksites || []),
    ]);
    const newPdas = new Set([...controller.cases.pdas, ...(pdas || [])]);
    const newCases = {
      worksites: Array.from(newWorksites),
      pdas: Array.from(newPdas),
    };
    commit('setControllerState', { cases: newCases });
    dispatch('stashController');
  },
  async setResolved({ commit }, resolved) {
    commit('setControllerState', {
      resolved,
    });
  },
  async setCurrentCase({ commit }, currentCase) {
    commit('setCurrentCase', currentCase);
  },
  async setCaseStatus({ commit }, status) {
    commit('setStatus', status);
  },
  async setOutboundId({ commit }, id) {
    commit('setOutboundId', id);
  },
  async setContactState({ commit }, newState) {
    commit('setContact', { state: newState });
  },
  async syncAgentConfig({ state, commit }) {
    if (state.connectAuthed) {
      const agent = ConnectService.getAgent();
      const config = await agent.getConfiguration();
      commit('setAgentConfig', config);
    }
  },
  async resetState({ commit }) {
    commit('resetState');
  },
};

// mutations
const mutations = {
  setAgent(state, agent) {
    state.agent = agent;
  },
  setAgentConfig(state, newState) {
    state.agentConfig = {
      ...state.agentConfig,
      ...newState,
    };
  },
  setMetrics(state, newState) {
    state.metrics = newState;
  },
  setAgentState(state, newState) {
    state.agentState = newState;
  },
  setConnectState(state, { running, authed, config }) {
    state.connectRunning = running;
    state.connectAuthed = authed;
    state.agentConfig = config;
  },
  setPopupState(state, newState) {
    state.popupOpen = newState;
  },
  setContact(state, newState) {
    state.contact = { ...state.contact, ...newState };
  },
  setControllerState(state, newState) {
    state.controller = {
      ...state.controller,
      ...newState,
    };
  },
  setCurrentCase(state, currentCase) {
    state.controller.currentCase = {
      ...state.controller.currentCase,
      ...currentCase,
    };
  },
  setStatus(state, newStatus) {
    state.controller.status = {
      ...state.controller.status,
      ...newStatus,
    };
  },
  setOutboundId(state, newId) {
    state.controller.outboundId = newId;
  },
  resetState(state) {
    Object.assign(state, {
      ...state,
      ...getStateDefaults(),
    });
  },
};

export default {
  namespaced: true,
  state: PhoneState,
  getters,
  actions,
  mutations,
};
