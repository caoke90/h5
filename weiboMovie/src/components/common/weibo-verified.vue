<template>
  <i class="m-icon" :class="clsName" v-if="cls"></i>
</template>
<style>

</style>
<script>
  export default{
    props: ['user'],
    computed: {
      cls() {
        if (this.user) {
          const type = this.user.verified_type;
          if (this.user.verified) {
            if (type === 0) {
              if (this.user.verified_type_ext === 1) {
                return 'goldv';
              }
              return 'yellowv';
            }
            if (type > 0 && type < 8) {
              return 'bluev';
            }
          } else {
            if (type === 220) {
              return 'club';
            }
            if (type === 10) {
              return 'vgirl';
            }
          }
        }
        return 0;
      },
      clsName() {
        return `m-icon-${this.cls}`;
      }
    }
  };

</script>

