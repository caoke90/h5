<template>
  <div v-show="showloading" ref='loading' class="m-tips m-tips-tp">
    <div class="m-loading m-loading-dark">
    <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
    </div>
  </div>
</template>
<style>

</style>
<script>
  import Bus from '../bus';
  export default{
    name: 'pagemore',

    created() {
      this.$nextTick(() => {
        this.loadingHeiht = this.$el.clientHeight;
      });
      Bus.$on('requestEnd', () => {
        this.requesting = false;
      });
      Bus.$on('hideLoadmore', () => {
        this.showloading = false;
      });
    },

    props: {
      loadGap: {
        type: Number,
        default: 0
      },
      nextPage: {
        type: Function,
        default: function () {
        }
      },
    },
    data() {
      return {
        loadingHeiht: 0,
        showloading: true,
        requesting: false,
      };
    },
    watch: {
      'requesting'(isRequesting) {
        if (isRequesting) {
          window.onscroll = null;
        } else {
          window.onscroll = this.loadmore;
        }
      },
    },
    mounted() {
      window.onscroll = this.loadmore;
    },
    methods: {
      getOffsetPosition: function (elem) {
        /* eslint no-param-reassign: 0 */
        /* eslint space-in-parens: 0 */
        if (!elem) {
          return { left: 0, top: 0 };
        }
        let top = 0;
        let left = 0;
        if ('getBoundingClientRect' in document.documentElement) {
          const box = elem.getBoundingClientRect();
          const doc = elem.ownerDocument;
          const body = doc.body;
          const docElem = doc.documentElement;
          const clientTop = docElem.clientTop || body.clientTop || 0;
          const clientLeft = docElem.clientLeft || body.clientLeft || 0;
          top = box.top + (self.pageYOffset ||
            docElem && docElem.scrollTop ||
            body.scrollTop ) - clientTop;
          left = box.left + (self.pageXOffset ||
            docElem && docElem.scrollLeft ||
            body.scrollLeft) - clientLeft;
        } else {
          do {
            top += elem.offsetTop || 0;
            left += elem.offsetLeft || 0;
            elem = elem.offsetParent;
          } while (elem);
        }
        return { left: left, top: top };
      },
      loadmore: function () {
        const scrolltop = document.body.scrollTop;
        const clientheight = document.documentElement.clientHeight;
        const top = this.getOffsetPosition(this.$refs.loading).top;
        if (scrolltop > clientheight
          && top + this.loadingHeiht / 2 < scrolltop + clientheight + this.loadGap) {
          // console.log(top + ' ' + scrolltop + ' ' + clientheight);
          this.nextPage();
          this.requesting = true;
        }
      }
    }
  };
</script>
