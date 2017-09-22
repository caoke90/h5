<template>
<transition name="toast">
<div v-if="show" class="mv-toast">
  <div class="m-mask" v-if="backdrop" @touchstart.stop.prevent></div>
  <div class="m-popup" @touchstart.stop.prevent>
    <div class="m-box m-box-dir m-box-center">
      <header>
        <i class="m-font m-font-line-check" v-if="curType === 'ok'"></i>
        <i class="m-font m-font-line-close" v-if="curType === 'error'"></i>
        <i class="m-font m-font-warn" v-if="curType === 'warning'"></i>
        <div class="m-loading m-loading-light" v-if="curType === 'wait'">
          <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
        </div>
      </header>
      <h3 v-html="text"></h3>
    </div>
  </div>
</div>
</transition>
</template>
<style>
.mv-toast .m-mask{
  z-index: 999999996;
}
.mv-toast .m-popup{
  z-index: 999999999;
}
.toast-enter-active, .toast-leave-active {
  transition: all .2s ease;
}
.toast-enter, .toast-leave-active {
  opacity: 0;
}
</style>
<script>
  import Bus from '../bus';
  export default{
    name: 'toast',
    // props: {
    //   type: {
    //     type: String,
    //     default: 'ok',
    //     validator(value) {
    //       return [
    //         'ok',
    //         'error',
    //         'warning',
    //         'wait',
    //       ].indexOf(value) > -1;
    //     }
    //   },
    // },

    data() {
      return {
        duration: 2000,
        backdrop: true,
        show: false,
        text: '',
        curType: this.type,
        type: 'ok',
      };
    },
    // computed: {
    //   curType() {
    //     'ok error warning wait'.split(' ').indexOf(value)
    //     [
    //         'ok',
    //         'error',
    //         'warning',
    //         'wait',
    //       ].indexOf(value) > -1
    //   }
    // }
    methods: {
      call(obj, callback) {
        let options = {};
        if (typeof obj === 'string') {
          options = { text: obj };
        } else if (!obj) {
          options = { show: false };
        } else {
          options = obj;
          const hasType = 'ok error warning wait'.split(' ')
            .indexOf(options.type) > -1;

          options.curType = hasType ? options.type : this.type;
          delete options.type;
        }

        Object.assign(this, {
          show: true
        }, options);

        if (typeof callback === 'function') {
          callback(this);
        }
      },
      calls(obj) {
        return new Promise((resolve) => {
          this.call(obj);
          resolve(this);
        });
      },
    },
    created() {
      window.mvToast = this;
      Bus.$on('mvToast', (obj, callback) => {
        this.call(obj, callback);
      });
    },
    watch: {
      'show'(val) {
        if (val && this.curType !== 'wait') {
          setTimeout(() => {
            this.show = false;
          }, this.duration);
        }
      },
      'curType'(val, oldval) {
        if (val !== 'wait' && oldval === 'wait') {
          setTimeout(() => {
            this.show = false;
          }, this.duration);
        }
      },
    }
  };
</script>
