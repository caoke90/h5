<template>
<div @touchmove.prevent>
  <transition name="toast">
    <div class="m-wpop-box" @click="cancel" v-if="show"></div>
  </transition>
  <transition name="pop">
  <div class="m-wpbtn-lbox" v-if="show">
    <ul class="m-wpbtn-list">
      <li v-for="(item, index) in lists" @click="item.methods(item, index)" v-if="item.text">
        <a v-text="item.text"></a>
      </li>
    </ul>
    <ul class="m-wpbtn-list" v-if="cancelBtn">
      <li @click="cancel">
        <a v-text="cancelBtn"></a>
      </li>
    </ul>
  </div>
  </transition>
</div>
</template>

<script>
import Bus from '../bus';
export default{
  name: 'actionsheet',
  data() {
    return {
      lists: [],
      cancelBtn: '取消',
      show: false,
    };
  },
  // props: {
  //   lists: {
  //     type: Array,
  //     default() {
  //       return [];
  //     },
  //   },
  //   cancelBtn: {
  //     type: String,
  //     default: '取消'
  //   },
  //   show: Boolean,
  // },
  created() {
    Bus.$on('mvActionSheet', (lists, cancelBtn) => {
      this.call(lists, cancelBtn);
    });
  },
  methods: {
    call(lists, cancelBtn) {
      /* eslint no-param-reassign: 0 */
      const self = this;
      if (lists.length > 0) {
        this.lists = lists.map((item) => {
          if (item.method) {
            item.methods = (i, index) => {
              item.method(i, index);
              self.show = false;
            };
          }
          return item;
        });
        if (cancelBtn !== undefined) {
          this.cancelBtn = cancelBtn;
        }
        this.show = true;
      }
    },
    cancel() {
      this.show = false;
    }
  },
};
</script>


<style>
  .pop-enter-active, .pop-leave-active {
    transition: all .4s ease;
  }
  .pop-enter, .pop-leave-active {
    transform: translateY(100%);
  }
  .m-wpop-box{
    background-color: rgba(0,0,0,0.45);
    position: fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    z-index: 10000;
  }
  .m-wpbtn-lbox{
    position: fixed;
    z-index: 10001;
    bottom:0;
    left:0;
    right:0;

  }
  .m-wpbtn-list{
    background-color: rgba(255,255,255,0.8);
    display: block;
  }
  .m-wpbtn-list + .m-wpbtn-list{
    margin-top: 0.3125rem;
  }
  .m-wpbtn-list li{
    width:100%;
    display: block;
    text-align: center;
    border-width:1px;
    border-color:rgba(214,214,214,0.8);
    border-bottom-style: solid;
  }
  .iosx2 .m-wpbtn-list li{
    border-width: 0.5px;
  }
  .iosx3 .m-wpbtn-list li{
    border-width: 0.35714px;
  }
  .m-wpbtn-list li:last-child{
    border-bottom:0px;
  }
  .m-wpbtn-list li a{
    font-size: 1.125rem;
    color:#333;
    display: inline-block;
    height:3rem;
    line-height: 3rem;
  }
  .m-wpbtn-list li a.wp-fred{
    color:#e14123;
  }
  .m-wp-con{
    text-align: center;
    color:#939393;
    font-size: 0.8125rem;
    line-height: 1.2;
    padding:1.5rem 1.0rem;
  }
</style>
