<template>
  <transition name="expand">
    <div @touchmove.prevent v-if="show">
      <div class="m-mask" v-if="backdrop"
        @click.prevent="cancel"></div>
      <div class="m-dialog">
        <header>
          <div v-if="title && type == 'prompt'" class="m-dialog-title" v-text="title"></div>
          <h2 v-if="title && type != 'prompt'" v-text="title"></h2>
          <h3 v-if="text" v-text="text"></h3>
          <img v-if="pic" :src="pic" alt="">
          <div class="m-dialog-form" v-if="type == 'prompt'">
            <div class="bar-text" v-text="inputErrorText"></div>
            <input ref="inputText" @keyup.enter="ok" type="text" @input="inputErrorText = ''" v-model="inputValue" :placeholder="inputPlaceholder">
          </div>
        </header>
        <footer class="m-btm-btns m-box">
          <div class="m-box-col" v-if="type != 'alert'">
            <mv-btn @click.native="cancel()">取消</mv-btn>
          </div>
          <div class="m-box-col">
            <mv-btn @click.native="ok" :btncolor="style.btncolor" :color="style.color || 'orange'" :disabled="style.disabled">{{ btnText }}</mv-btn>
          </div>
        </footer>
      </div>
    </div>
  </transition>
</template>
<style scoped>
.expand-enter-active, .expand-leave-active {
  transition: all .2s ease;
}
.expand-enter, .expand-leave-active  {
  opacity: 0;
}
.bar-text {
  font-size: 0.6875rem;
  color: #FF8200;
  text-align: center;
  padding: 0 0 0.375rem 0;
}
</style>
<script>
  import Bus from '../bus';
  const init = {
    type: 'alert',
    btnText: '确定',
    btnCallback: () => {},
    backdrop: true,
    show: false,
    title: '',
    pic: '',
    text: '',
    style: {
      btncolor: null,
      disabled: null,
      color: null
    },
    inputValue: '',
    inputPlaceholder: '',
    validate: null,
    inputErrorText: '',
  };
  export default{
    name: 'msgbox',
    data() {
      return Object.assign({}, init);
    },
    watch: {
      'type'(val) {
        const typeList = ['alert', 'confirm', 'prompt'];
        if (!typeList.some(item => (item === val))) {
          console.error('未知类型的msgbox');
        }
      },
      'show'(show) {
        if (!show) {
          this.init();
        }
      }
    },
    computed: {
      validateInputValue() {
        if (this.validate) {
          if (this.validate(this.inputValue)) {
            return this.inputValue;
          }
          return '';
        }
        return this.inputValue;
      }
    },
    methods: {
      init() {
        Object.assign(this.$data, init);
      },
      cancel() {
        if (this.type !== 'alert') {
          this.show = false;
        }
      },
      ok() {
        this.show = false;
        if (this.btnCallback) {
          this.btnCallback();
        }
      },
      call(obj, resolve, reject) {
        let options = {};
        if (!obj) {
          options = { show: false };
        } else {
          options = obj;
        }
        Object.assign(this, {
          show: true
        }, options);
        if (typeof resolve === 'function') {
          this.ok = function () {
            if (this.validate && this.validateInputValue.length === 0) {
              this.inputErrorText = '输入有误';
            }
            const showVal = resolve(this.validateInputValue);
            if (typeof showVal === 'boolean') {
              this.show = showVal;
            }
          };
        }
        if (typeof reject === 'function') {
          this.cancel = function () {
            reject.call();
            if (this.type !== 'alert') {
              this.show = false;
            }
          };
        }
        this.$nextTick(() => {
          if (this.$refs.inputText) {
            this.$refs.inputText.focus();
          }
        });
      },
      calls(obj) {
        return new Promise((resolve, reject) => {
          this.call(obj);

          this.ok = function () {
            this.show = false;
            resolve();
          };

          this.cancel = function () {
            this.show = false;
            reject();
          };
        });
      },
    },
    created() {
      Bus.$on('mvMsgbox', (obj, resolve, reject) => {
        this.call(obj, resolve, reject);
      });
    }
  };
</script>
