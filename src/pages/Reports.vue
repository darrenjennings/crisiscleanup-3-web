<template>
  <Loader :loading="loading" class="h-full overflow-auto py-4 px-6 bg-gray-100">
    <template #content>
      <!-- Intro -->
      <base-text
        variant="h2"
        width="300"
        class="text-crisiscleanup-dark-300 py-3"
        >You have 2 paid report activate them to see more information about your
        team members</base-text
      >
      <!-- Favorite Section -->
      <h1 class="text-xl font-bold">Favorite</h1>
      <div class="flex flex-row jusity-between">
        <!-- First Column -->
        <div class="flex-col">
          <!-- teammates invited -->
          <div
            class="my-2 mx-3 bg-white shadow h-auto content-center flex-wrap"
          >
            <TeammatesInvited />
          </div>
          <!-- Claimed Worksites -->
          <div
            class="my-2 mx-3 bg-white shadow h-auto content-center flex-wrap"
          >
            <ClaimedWorksites />
          </div>
        </div>
        <!-- Second Column -->
        <div class="flex-col">
          <!-- Active Teammates -->
          <div
            class="my-2 mx-3 bg-white shadow h-auto content-center flex-wrap"
          >
            <ActiveTeammates />
          </div>
          <!-- Completed Worksites -->
          <div
            class="my-2 mx-3 bg-white shadow h-auto content-center flex-wrap"
          >
            <CompletedWorksites />
          </div>
        </div>
        <!-- Third Column -->
        <div class="flex-col">
          <!-- Inactive Teammates -->
          <div
            class="my-2 mx-3 bg-white shadow h-auto content-center flex-wrap"
          >
            <InactiveTeammates />
          </div>
        </div>
      </div>
      <!-- Free Section -->
      <h1 class="text-xl font-bold">Free</h1>
      <div class="flex flex-row justify-between">
        <!-- First Column -->
        <div class="flex-col">
          <!-- Commercial Value -->
          <div
            class="my-2 mx-3 bg-white shadow h-auto content-center flex-wrap"
          >
            <est-commercial-value />
          </div>
          <!-- Shortest Wait Time -->
          <div
            class="my-2 mx-3 bg-white shadow h-auto content-center flex-wrap"
          >
            <shortest-wait-time />
          </div>
        </div>
        <!-- Second Column -->
        <div class="flex-col">
          <!-- Avg Wait Time -->
          <div
            class="my-2 mx-3 bg-white shadow h-auto content-center flex-wrap"
          >
            <avg-wait-time />
          </div>
          <!-- Unassigned Worksites -->
          <div
            class="my-2 mx-3 bg-white shadow h-auto content-center flex-wrap"
          >
            <unassigned-worksites />
          </div>
        </div>
        <!-- Third Column -->
        <div class="flex-col">
          <!-- Longest Wait Time -->
          <div
            class="my-2 mx-3 bg-white shadow h-auto content-center flex-wrap"
          >
            <longest-wait-time />
          </div>
          <!-- Worksite Completion -->
          <div
            class="my-2 mx-3 bg-white shadow h-auto content-center flex-wrap"
          >
            <worksite-completion />
          </div>
        </div>
      </div>
      <!-- Premium Section -->
      <h1 class="text-xl font-bold">Premium</h1>
      <div class="flex flex-row justify-start">
        <!-- Detailed Volunteer Work Logs -->
        <div class="flex-col w-1/3">
          <div
            class="my-2 mx-3 bg-white shadow h-auto content-center flex-wrap"
          >
            <volunteer-work-logs />
          </div>
        </div>
        <!-- Incomplete Worksites -->
        <div class="flex-col w-1/3">
          <div
            class="my-2 mx-3 bg-white shadow h-auto content-center flex-wrap"
          >
            <IncompleteWorksites />
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
import TeammatesInvited from '@/components/reports/TeammatesInvited.vue';
import ClaimedWorksites from '@/components/reports/ClaimedWorksites.vue';
import ActiveTeammates from '@/components/reports/ActiveTeammates.vue';
import CompletedWorksites from '@/components/reports/CompletedWorksites.vue';
import InactiveTeammates from '@/components/reports/InactiveTeammates.vue';
import EstCommercialValue from '@/components/reports/EstCommercialValue.vue';
import ShortestWaitTime from '@/components/reports/ShortestWaitTime.vue';
import LongestWaitTime from '@/components/reports/LongestWaitTime.vue';
import AvgWaitTime from '@/components/reports/AvgWaitTime.vue';
import UnassignedWorksites from '@/components/reports/UnassignedWorksites.vue';
import WorksiteCompletion from '@/components/reports/WorksiteCompletion.vue';
import VolunteerWorkLogs from '@/components/reports/VolunteerWorkLogs.vue';
import IncompleteWorksites from '@/components/reports/IncompleteWorksites.vue';

export default {
  name: 'ReportsTab',
  components: {
    Loader,
    TeammatesInvited,
    ClaimedWorksites,
    ActiveTeammates,
    CompletedWorksites,
    InactiveTeammates,
    EstCommercialValue,
    ShortestWaitTime,
    AvgWaitTime,
    UnassignedWorksites,
    LongestWaitTime,
    WorksiteCompletion,
    VolunteerWorkLogs,
    IncompleteWorksites,
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
