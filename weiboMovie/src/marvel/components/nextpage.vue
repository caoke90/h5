<template>
  <div v-show="requesting" class="m-tips m-tips-tp">
    <div class="m-loading m-loading-dark">
    <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
    </div>
  </div>
</template>
<style scoped>
  .m-tips {
    margin: 0 auto;
    padding-top: 0.625rem;
    display: block;
  }
</style>
<script>
  export default{
    name: 'nextpage',
    props: {
      requesting: {
        type: Boolean,
        default: false
      },
    },
  };
</script>
