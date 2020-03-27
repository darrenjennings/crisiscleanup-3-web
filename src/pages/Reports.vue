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
      <div class="flex-row">
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

export default {
  name: 'Phone',
  components: {
    Loader,
    TeammatesInvited,
    ClaimedWorksites,
    ActiveTeammates,
    CompletedWorksites,
    InactiveTeammates,
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
