<template>
  <aside class="tips m-container-max" v-if="show" :style="{bottom: posBottom}">
    <a href="javascript:;" class="btn" ontouchstart="" @click="openApp" v-text="appTips.text"></a>
  </aside>
</template>
<style scoped>
  .tips {
    position: fixed;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 999;
  }
  .btn {
    display: inline-block;
    width: 7.75rem;
    line-height: 2.0625rem;
    text-align: center;
    border: #FD993C solid 1px;
    font-size: 1rem;
    vertical-align: middle;
    border-radius: 7.5rem;
    box-shadow: 0 4px 9px 0 rgba(165,133,104,0.38);
    background: #FD993C;
    background-clip: padding-box;
    color: #FFFFFF;
  }
  .btn:hover {
    background-color: #FE8503;
  }
  .btn {
    -webkit-animation:fadeInUp 0.5s ease-in-out both;
  }
  @-webkit-keyframes fadeInUp {
    0% {
      opacity: 0;
      -webkit-transform: translateY(1.75rem);
      transform: translateY(1.75rem)
    }

    100% {
      opacity: 1;
      -webkit-transform: translateY(0);
      transform: translateY(0)
    }
  }
</style>
<script>
  import openApp from '@wb/open-app';
  export default {
    props: {
      scheme: {
        type: String,
        required: true
      },
      appTips: {
        type: Object,
        default: function () {
          return {
            text: '微博内打开',
            barHeight: 0
          };
        }
      }
    },
    mixins: [require('../../mixin/actionLogMixin')],
    data() {
      return {
        show: 1,
        posBottom: 0
      };
    },
    mounted() {
      this.posBottom = (this.appTips.barHeight / 16 + 1.75) + 'rem';
    },
    watch: {
      'appTips.barHeight'() {
        this.posBottom = (this.appTips.barHeight / 16 + 1.75) + 'rem';
      }
    },
    methods: {
      openApp() {
        this.addLog('act_code=39&ext=pos:bottom');
        openApp.start({
          scheme: this.scheme
        });
      }
    }
  };
</script>
