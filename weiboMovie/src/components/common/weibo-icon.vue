<template>
  <i class="m-icon" :class="icon" v-if="icon"></i>
</template>
<style>

</style>
<script>
  export default{
    props: ['user'],
    computed: {
      icon() {
        const rank = this.user.mbrank;
        if (rank) {
          return 'm-icon-vipl' + rank;
        }
        return 0;
      }
    }
  };
</script>
