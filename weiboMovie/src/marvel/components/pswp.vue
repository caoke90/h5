<template>
<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="pswp__bg">
  </div>
  <div class="pswp__scroll-wrap">
    <div class="pswp__container">
      <div class="pswp__item">
      </div>
      <div class="pswp__item">
      </div>
      <div class="pswp__item">
      </div>
    </div>
    <div class="pswp__ui pswp__ui--hidden">
      <div class="pswp__top-bar">
        <div class="pswp__counter">
        </div>
        <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
        <button class="pswp__button pswp__button--fs hide" title="Toggle fullscreen"></button>
        <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
        <div class="pswp__preloader">
          <div class="pswp__preloader__icn">
            <div class="pswp__preloader__cut">
              <div class="pswp__preloader__donut">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
        <div class="pswp__share-tooltip">
        </div>
      </div>
      <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
      </button>
      <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
      </button>
      <div class="pswp__caption">
        <div class="pswp__caption__center">
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<style>
  @import './pswp/photoswipe.css';
  @import './pswp/default-skin/default-skin.css';
.pswp{
  z-index: 999999999;
}
.pswp--supports-fs .pswp__button--fs.hide{
	display: none;
}
</style>
<script>
import PhotoSwipe from 'photoswipe';
import PhotoSwipeUIDefault from 'photoswipe/dist/photoswipe-ui-default';
import Bus from '../bus';

export default {
  name: 'pswp',
  created() {
    Bus.$on('mvGallery', (index, list) => {
      this.openPhotoSwipe(index, list);
    });
  },
  methods: {
    openPhotoSwipe(index, list) {
      const options = {
        showHideOpacity: true,
        loop: false,
        getThumbBoundsFn(i) {
          const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
          const rect = list[i].el.getBoundingClientRect();
          return {
            x: rect.left,
            y: rect.top + pageYScroll,
            w: rect.width
          };
        },
        index: index,
      };
      const pswp = new PhotoSwipe(this.$el, PhotoSwipeUIDefault, list, options);
      pswp.init();
    },
  }
};
</script>
