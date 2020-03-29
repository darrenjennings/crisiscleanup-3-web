<template>
  <Loader :loading="loading" class="h-full overflow-auto py-4 px-6 bg-gray-100">
    <template #content>
      <!-- Intro -->
      <base-text
        variant="h2"
        weight="300"
        class="text-crisiscleanup-dark-300 py-3 ml-3"
        >You have 2 paid report activate them to see more information about your
        team members</base-text
      >
      <!-- Included -->
      <h1 class="text-xl font-bold m-2 ml-3">Included</h1>
      <div class="flex flex-row jusity-between">
        <div class="flex-col w-1/3">
          <div class="my-2 mx-3 bg-white shadow h-20 content-center flex-wrap">
            <DownloadCSV />
          </div>
        </div>
      </div>
      <!-- Favorites -->
      <h1 class="text-xl font-bold m-2 ml-3 pt-5">Favorites</h1>
      <!-- <div class="flex flex-row justify-between">
        First Column
        <div class="flex-col w-1/3">
        </div>
        Second Column
        <div class="flex-col w-1/3">
        </div>
        Third Column
        <div class="flex-col w-1/3">
        </div>
      </div> -->
      <!-- Report Library -->
      <h1 class="text-xl font-bold m-2 ml-3 pt-5">Report Library</h1>
      <div class="flex flex-row jusity-between">
        <div class="flex-col w-1/3">
          <div class="my-2 mx-3 bg-white shadow h-20 content-center flex-wrap">
            <DownloadCSV />
          </div>
        </div>
      </div>
      <!-- Favorites -->
      <h1 class="text-xl font-bold m-2 ml-3 pt-5">Favorites</h1>
      <!-- <div class="flex flex-row justify-between">
        First Column
        <div class="flex-col w-1/3">
        </div>
        Second Column
        <div class="flex-col w-1/3">
        </div>
        Third Column
        <div class="flex-col w-1/3">
        </div>
      </div> -->
      <!-- Report Library -->
      <h1 class="text-xl font-bold m-2 ml-3 pt-5">Report Library</h1>
      <div class="flex flex-row jusity-between">
        <!-- First Column -->
        <div class="flex-col w-1/3">
          <!-- Worksite Completion -->
          <div class="my-2 mx-3 bg-white shadow h-24 content-center flex-wrap">
            <base-button @:click="alert(ActivationPopUp)">
              <worksite-completion />
            </base-button>
          </div>
          <!-- teammate invitation -->
          <div class="my-2 mx-3 bg-white shadow h-32 content-center flex-wrap">
            <teammate-invitation />
          </div>
          <!-- Incident Status Report -->
          <div class="my-2 mx-3 bg-white shadow h-40 content-center flex-wrap">
            <incident-status-report />
          </div>
          <!-- Org Participation Status -->
          <div class="my-2 mx-3 bg-white shadow h-40 content-center flex-wrap">
            <participation-stats />
          </div>
        </div>
        <!-- Second Column -->
        <div class="flex-col w-1/3">
          <!-- Requests -->
          <div class="my-2 mx-3 bg-white shadow h-32 content-center flex-wrap">
            <requests-card />
          </div>
          <!-- Completed Worksites -->
          <div class="my-2 mx-3 bg-white shadow h-32 content-center flex-wrap">
            <completion-summary />
          </div>
          <!-- Volunteer Work Logs -->
          <div class="my-2 mx-3 bg-white shadow h-32 content-center flex-wrap">
            <volunteer-work-logs />
          </div>
          <!-- Call Center Flow -->
          <div class="my-2 mx-3 bg-white shadow h-40 content-center flex-wrap">
            <call-center-flow />
          </div>
        </div>
        <!-- Third Column -->
        <div class="flex-col w-1/3">
          <!-- Unassigned Worksites -->
          <div class="my-2 mx-3 bg-white shadow h-40 content-center flex-wrap">
            <unassigned-worksites />
          </div>
          <!-- Estimated Commercial Values -->
          <div class="my-2 mx-3 bg-white shadow h-40 content-center flex-wrap">
            <est-commercial-value />
          </div>
        </div>
      </div>
      <cc-popup :is-showing-modal="callIncoming" />
    </template>
  </Loader>
</template>

<script>
import User from '@/models/User';
import { mapActions, mapGetters } from 'vuex';
import Loader from '@/components/Loader.vue';
import TeammateInvitation from '@/components/reports/TeammateInvitation.vue';
import EstCommercialValue from '@/components/reports/EstCommercialValue.vue';
import UnassignedWorksites from '@/components/reports/UnassignedWorksites.vue';
import WorksiteCompletion from '@/components/reports/WorksiteCompletion.vue';
import VolunteerWorkLogs from '@/components/reports/VolunteerWorkLogs.vue';
import RequestsCard from '@/components/reports/RequestsCard.vue';
import CompletionSummary from '@/components/reports/CompletionSummary.vue';
import ParticipationStats from '@/components/reports/OrgParticipationStats.vue';
import IncidentStatusReport from '@/components/reports/IncidentStatusReport.vue';
import CallCenterFlow from '@/components/reports/CallCenterFlow.vue';
import DownloadCSV from '@/components/reports/DownloadCSV.vue';

export default {
  name: 'Reports',
  components: {
    Loader,
    TeammateInvitation,
    EstCommercialValue,
    UnassignedWorksites,
    WorksiteCompletion,
    VolunteerWorkLogs,
    RequestsCard,
    CompletionSummary,
    ParticipationStats,
    IncidentStatusReport,
    CallCenterFlow,
    DownloadCSV,
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    currentUser() {
      return User.find(this.$store.getters['auth/userId']);
    },
    ...mapGetters('phone', [
      'connectReady',
      'agentState',
      'contactState',
      'callIncoming',
    ]),
  },
  methods: {
    ...mapActions('phone', ['getRealtimeMetrics']),
  },
  async mounted() {
    this.loading = true;
    await this.getRealtimeMetrics();
    this.loading = false;
  },
};
</script>
