<template>
  <div
    :class="`flex items-center base-icon ${iconSelector} ${
      withText ? 'with-text' : ''
    } `"
  >
    <img
      :class="styles"
      :src="iconMap[type]"
      :alt="$t('info.icon')"
      :title="$t('info.icon')"
    />
    <slot></slot>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { kebabCase, snakeCase } from 'lodash';
import VueTypes from 'vue-types';

const iconMap = {
  dashboard: require('@/assets/icons/dashboard.svg'),
  cases: require('@/assets/icons/cases.svg'),
  calendar: require('@/assets/icons/calendar.svg'),
  call: require('@/assets/icons/call.svg'),
  chat: require('@/assets/icons/chat.svg'),
  print: require('@/assets/icons/print-big.svg'),
  pin: require('@/assets/icons/pin.svg'),
  phone: require('@/assets/icons/phone.svg'),
  'phone-user': require('@/assets/icons/phone-user.svg'),
  'phone-hangup': require('@/assets/icons/phone-hangup.svg'),
  'phone-plus': require('@/assets/icons/phone-plus.svg'),
  'earth-globe': require('@/assets/icons/earth-globe.svg'),
  'phone-contact-add': require('@/assets/icons/phone-contact-add.svg'),
  'phone-exit': require('@/assets/icons/phone-exit.svg'),
  share: require('@/assets/icons/share-big.svg'),
  download: require('@/assets/icons/download.svg'),
  active: require('@/assets/icons/active.svg'),
  edit: require('@/assets/icons/edit.svg'),
  flag: require('@/assets/icons/flag.svg'),
  filters: require('@/assets/icons/filters.svg'),
  'flag-filled': require('@/assets/icons/flag-filled.svg'),
  search: require('@/assets/icons/search.svg'),
  table: require('@/assets/icons/table.svg'),
  map: require('@/assets/icons/notactive.svg'),
  layers: require('@/assets/icons/layers.svg'),
  info: require('@/assets/icons/inform.svg'),
  trash: require('@/assets/icons/delete.svg'),
  organization: require('@/assets/icons/my-organization.svg'),
  history: require('@/assets/icons/history.svg'),
  cancel: require('@/assets/icons/big.svg'),
  help: require('@/assets/icons/help.svg'),
  up: require('@/assets/icons/up.svg'),
  down: require('@/assets/icons/down.svg'),
  updown: require('@/assets/icons/updown.svg'),
  'go-case': require('@/assets/icons/replace-case.svg'),
  'map-buffer': require('@/assets/icons/map-buffer.svg'),
  'map-circle': require('@/assets/icons/map-circle.svg'),
  'map-poly': require('@/assets/icons/map-poly.svg'),
  'map-rect': require('@/assets/icons/map-rect.svg'),
  'map-sweep': require('@/assets/icons/map-sweep.svg'),
  'map-undo': require('@/assets/icons/map-undo.svg'),
  'map-redo': require('@/assets/icons/map-redo.svg'),
  dialer: require('@/assets/icons/dialer.svg'),
  hangup: require('@/assets/icons/hangup.svg'),
};
/* eslint-enable global-require */

export const ICONS = Object.fromEntries(
  Object.entries(iconMap).map(([key]) => [snakeCase(key), key]),
);

export const ICON_SIZES = [
  'xxs',
  'xs',
  'sm',
  'small',
  'md',
  'medium',
  'lg',
  'large',
  'xl',
];

export default {
  name: 'BaseIcon',
  props: {
    type: VueTypes.oneOf(Object.values(ICONS)),
    alt: VueTypes.string,
    size: VueTypes.oneOf(ICON_SIZES).def('large'),
    selector: VueTypes.string,
    withText: VueTypes.bool.def(false),
  },
  data() {
    return {
      iconMap,
      styles: {
        'ccu-icon': true,
        'cursor-pointer': true,
        large: ['lg', 'large'].includes(this.size),
        medium: ['md', 'medium'].includes(this.size),
        small: ['sm', 'small'].includes(this.size),
        xs: this.size === 'xs',
        xxs: this.size === 'xxs',
        xl: this.size === 'xl',
        text: this.withText === true,
      },
    };
  },
  computed: {
    iconSelector() {
      return this.selector || `js-${kebabCase(this.alt)}`;
    },
  },
};
</script>

<style scoped>
.ccu-icon {
  height: 30px;
  width: 30px;
}
.ccu-icon.medium {
  height: 20px;
  width: 20px;
}
.ccu-icon.xl {
  height: 35px;
  width: 35px;
}
.ccu-icon.small {
  height: 16px;
  width: 16px;
}
.ccu-icon.xs {
  height: 10px;
  width: 10px;
}

.ccu-icon.xxs {
  height: 7px;
  width: 7px;
}

.base-icon.with-text p {
  @apply pl-2;
}

.filter-gray {
  filter: invert(84%) sepia(0%) saturate(30%) hue-rotate(209deg)
    brightness(107%) contrast(90%);
}
.filter-yellow {
  filter: invert(92%) sepia(21%) saturate(3995%) hue-rotate(346deg)
    brightness(98%) contrast(106%);
}
</style>
