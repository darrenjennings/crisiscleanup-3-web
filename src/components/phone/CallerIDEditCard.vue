<template>
  <modal
    v-if="active"
    modal-classes="w-1/3 edit-modal shadow-xl"
    @ok="active = false"
    @close="active = false"
  >
    <div class="flex flex-col justify-around p-12">
      <!-- Greeting -->
      <base-text
        variant="h1"
        :weight="700"
        class="text-crisiscleanup-dark-500 text-center pb-3"
      >
        {{ `${lang.title} ${currentUser.first_name}!` }}
      </base-text>
      <base-text
        variant="body"
        :weight="300"
        class="text-crisiscleanup-dark-300 text-center pb-3"
      >
        {{ lang.body }}
      </base-text>
      <base-text
        variant="body"
        :weight="300"
        class="text-crisiscleanup-dark-300 text-center pb-3"
      >
        {{ lang.bodyPhone }}
      </base-text>
      <div v-if="request.phone" class="section flex flex-col justify-around">
        <!-- Phone # -->
        <base-text variant="bodysm" :weight="100" class="section-header">
          {{ lang.inputs.phone }}
        </base-text>
        <base-input
          :value="phoneNumber"
          size="medium"
          placeholder="+1 (123) 456-7890"
          :validator="validatePhoneNumber"
          @input="(value) => (phoneNumber = value)"
        />
      </div>
      <div v-if="request.lang" class="section flex flex-col">
        <base-text variant="bodysm" :weight="100" class="section-header">
          {{ lang.inputs.lang }}
        </base-text>
        <!-- Language -->
        <form-select
          class="flex-grow border border-crisiscleanup-dark-100"
          :value="currentUser.languages"
          multiple
          :options="supportedLanguages"
          item-key="id"
          label="name_t"
          size="large"
          select-classes="bg-white border text-xs p-1 profile-select"
          :limit="2"
          @input="(value) => (languages = value)"
        />
      </div>
    </div>
    <!-- Footer -->
    <div slot="footer" class="flex p-3 my-6 justify-center mb-3 footer">
      <base-button
        variant="solid"
        size="large"
        :action="() => updateUserNeeded()"
        >{{ lang.confirm }}</base-button
      >
    </div>
  </modal>
</template>

<script>
import VueTypes from 'vue-types';
import { LangMixin, UserMixin, ValidateMixin, AgentMixin } from '@/mixins';
import Agent from '@/models/Agent';
import Language from '@/models/Language';

export default {
  name: 'EditCallerID',
  mixins: [UserMixin, LangMixin, ValidateMixin, AgentMixin],
  data() {
    return {
      number: '',
      languages: [],
      phoneNumber: '',
    };
  },
  props: {
    active: VueTypes.bool.def(false),
    request: VueTypes.shape({
      phone: VueTypes.bool.def(false),
      lang: VueTypes.bool.def(false),
    }),
  },
  methods: {
    async updateUserNeeded() {
      if (this.phoneNumber) {
        await this.updateUser(this.phoneNumber, 'mobile');
      }
      if (this.languages.length >= 1) {
        this.updateUser(null, 'primary_language');
        this.updateUser(null, 'secondary_language');
        const [primary_language, secondary_language] = this.languages;
        this.updateUser(primary_language, 'primary_language');
        this.updateUser(secondary_language, 'secondary_language');
      }
      try {
        await this.saveUser();
        this.$emit('user-updated', this.currentUser);
      } catch (e) {
        this.$log.error('Failed to save user', e);
        this.$toasted.error(e);
      }

      try {
        this.$log.debug(
          'checking if agent should be updating...',
          this.connectReady,
        );
        if (this.connectReady) {
          await Agent.api().fetch();
          const agent = Agent.query()
            .where('user_id', this.currentUser.id)
            .first();
          this.$store.dispatch('phone/setAgent', agent);
        }
      } catch (e) {
        this.$log.error('Failed to save agent', e);
        this.$toasted.error(e);
      }
    },
  },
  computed: {
    lang() {
      return this.getLang({
        title: `~~Welcome`,
        body:
          '~~Please confirm the following details for usage in the Crisis Cleanup Virtual Call Center.',
        bodyPhone:
          "Don't worry, we will hide your phone number on all inbound and outbound calls for your protection.",
        confirm: '~~Confirm',
        inputs: {
          phone: '~~Enter a valid phone number',
          lang: '~~Choose the languages you work with',
        },
      });
    },
    supportedLanguages() {
      const languages = Language.all();
      const ids = [2, 7];
      return languages.filter((l) => ids.includes(l.id));
    },
  },
};
</script>

<style scoped lang="scss">
.edit-modal {
  .section {
    @apply py-3;
    &-header {
      @apply text-crisiscleanup-dark-400 py-1;
    }
  }
  .footer {
    @apply shadow-inner;
    position: relative;
    margin: 0;
  }
}
</style>
