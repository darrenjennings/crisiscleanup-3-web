<template>
  <div class="board board--grid shadow-crisiscleanup-card">
    <div class="grid--nav">
      <board-nav :routes="headerNav" :lang="lang" :active-key="activeKey" />
    </div>
    <div class="grid--callinfo">
      <call-info :lang="lang" />
    </div>
    <div class="grid--status">
      <board-status :lang="lang" />
    </div>
  </div>
</template>

<script>
import { LangMixin } from '@/mixins';
import BoardNav from './Nav.vue';
import CallInfo from './CallInfo.vue';
import BoardStatus from './Status.vue';

const HeaderNav = [
  {
    key: 'currentCall',
  },
  {
    key: 'scripts',
  },
];

export default {
  name: 'AgentBoard',
  mixins: [LangMixin],
  components: {
    BoardNav,
    CallInfo,
    BoardStatus,
  },
  data() {
    return {
      activeKey: 'currentCall',
      headerNav: HeaderNav,
    };
  },
  computed: {
    lang() {
      return this.getLang({
        currentCall: '~~Current Call',
        scripts: '~~Scripts',
        calltime: '~~Call Time',
        english: '~~English',
        callStat: {
          calls: '~~Calls',
          days: '~~Days',
        },
        notes: '~~Notes',
        callStatus: '~~Call Status *',
        issuesResolved: '~~Issues resolved',
      });
    },
  },
};
</script>

<style scoped lang="scss">
$areas: nav callinfo status advocate;

.board {
  @apply bg-white h-full w-full;
  &--grid {
    display: inline-grid;
    grid:
      [r1] 'nav' auto [r1end]
      [r2] 'callinfo' .5fr[r2end]
      [r3] 'status' 2fr [r3end]
      [r4] 'advocate' 1fr [r4end]
      / auto;

    .grid {
      @each $area in $areas {
        &--#{$area} {
          grid-area: $area;
        }
      }

      &--callinfo {
        position: relative;
        &:after {
          content: '';
          height: 1px;
          width: 100%;
          @apply bg-crisiscleanup-grey-100;
          position: absolute;
          bottom: 0px;
          opacity: 0.5;
        }
      }
    }
  }
}
</style>
