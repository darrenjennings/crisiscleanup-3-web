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
      <h1 class="text-xl font-bold">Favorite</h1>
      <cc-popup :is-showing-modal="callIncoming" />
    </template>
  </Loader>
</template>

<script>
import User from '@/models/User';
import { mapActions, mapGetters } from 'vuex';
import Loader from '@/components/Loader.vue';

export default {
  name: 'Phone',
  components: {
    Loader,
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
