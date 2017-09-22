<template>
  <div
      @mousedown="startDrag" @touchstart="startDrag"
      @mousemove="onDrag" @touchmove="onDrag"
      @mouseup="stopDrag" @touchend="stopDrag" @mouseleave="stopDrag"
      @transitionend="transitionEnd"
      :style="{transform:translate,transitionDuration:transition}">
        <div class="m-tips m-tips-tp">
          <div class="m-loading m-loading-dark" v-if='requesting'><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
          <i v-else class="m-font m-font-down m-font-down-ani" :class="{'up':dragging && dY > topDistance}"></i>
          <span class="main-link" v-text="status" v-if="showText"></span>
        </div>
      <slot></slot>
      <div style="position:fixed"></div><!-- 这个空标签是为了PC端chrome的一个难以言喻的bug，是关于下拉拖拽的，我也不知道为什么加上这个就好使了，如果删掉这个你啥事都没有，可能是这个bug已经被修复了，你就删掉它吧 -->
  </div>
</template>
<style>
.m-font-down-ani{
  transition: all .2s ease;
}
.m-font-down-ani.up{
  transform:rotate(180deg);
}
</style>
<script>
  import Bus from '../bus';

  export default{
    name: 'loadmore',

    created() {
      this.$nextTick(() => {
        this.topBarHeight = this.$el.children[0].clientHeight;
      });
      Bus.$on('mvLoadEnd', () => {
        this.loadEnd();
      });
      Bus.$on('mvLoadStart', () => {
        document.body.scrollTop = 0;
        this.loadStart();
      });
    },

    props: {
      topDistance: {
        type: Number,
        default: 100
      },
      topPullText: {
        type: String,
        default: '下拉刷新'
      },
      topDropText: {
        type: String,
        default: '加载中...'
      },
      topLoadingText: {
        type: String,
        default: '释放更新'
      },
      showText: {
        type: Boolean,
        default: true
      },
      topMethod: {
        type: Function
      },
    },
    data() {
      return {
        topBarHeight: 0,
        requesting: false,
        dragging: false,
        startY: 0,
        dY: 0,
        reset: true,
      };
    },
    computed: {
      transition() {
        return (this.dragging || (this.dY === 0 && this.reset)) ? '0s' : '200ms';
      },
      translate() {
        const distance = 80 * Math.atan(this.dY / 200) - this.topBarHeight;
        return `translateY(${distance}px)`;
      },
      status() {
        if (this.dragging && this.dY > this.topDistance) {
          return this.topLoadingText;
        } else if (this.requesting) {
          return this.topDropText;
        }
        return this.topPullText;
      },
    },
    watch: {
      'requesting'(val) {
        if (!val) {
          this.dY = 0;
        }
      },
    },
    methods: {
      loadStart() {
        this.requesting = true;
        this.topMethod();
        this.dY = this.topDistance;
      },
      loadEnd() {
        this.requesting = false;
      },
      startDrag(e) {
        const TouchEvent = e.changedTouches ? e.changedTouches[0] : e;
        if (document.body.scrollTop <= 0) {
          this.startY = TouchEvent.pageY;
          this.dragging = true;
          this.reset = false;
        }
      },
      onDrag(e) {
        const TouchEvent = e.changedTouches ? e.changedTouches[0] : e;
        if (this.dragging && TouchEvent.pageY - this.startY > 0 && window.scrollY <= 0) {
          e.preventDefault();
          this.dY = TouchEvent.pageY - this.startY;
          if (this.requesting) {
            this.dY = this.dY + this.topDistance;
          }
        }
      },
      stopDrag() {
        this.dragging = false;
        if (this.dY > this.topDistance && window.scrollY <= 0) {
          this.loadStart();
        } else {
          this.dY = 0;
        }
      },
      transitionEnd() {
        if (this.dY === this.topDistance && !this.requesting) {
          this.dY = 0;
        }
        if (this.dY === 0) {
          this.reset = true;
        }
      },
    }
  };
</script>
