<template>
  <div>
    <base-button
      variant="outline"
      :action="() => (isShowingModal = true)"
      text="Show Modal"
    ></base-button>
    <modal
      v-if="isShowingModal"
      title="Reports Activation"
      modal-classes="w-108"
      @ok="isShowingModal = false"
      @close="isShowingModal = false"
    >
      <div
        slot="header"
        class="flex p-1 justify-start bg-crisiscleanup-dark-400 text-white"
      >
        <base-text variant="body" weight="700" class="m-3 ml-5">
          Report Activation
        </base-text>
      </div>
      <div class="flex justify-around m-5">
        <base-text variant="body">
          Your state does not yet have a subscription to this section.
          <a
            href="mailto:aaron@crisiscleanup.org"
            class="text-crisiscleanup-yellow-900 underline"
            >Click here</a
          >
          to request more information on report access"
        </base-text>
      </div>
      <div slot="footer" class="flex p-1 justify-center">
        <base-button
          variant="outline"
          :action="
            () => {
              isShowingModal = false;
            }
          "
          text="mmk"
        ></base-button>
      </div>
    </modal>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'ActivationPopUp',
  props: {
    isShowingModal: VueTypes.bool.def(false),
  },
};
</script>
