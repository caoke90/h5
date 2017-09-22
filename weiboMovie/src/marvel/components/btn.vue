<template>
  <a href="javascript:;" class="m-btn"
  :class="['m-btn-' + btnBodyColor,'m-btn-text-' + btnTextColor,{'m-btn-disabled': disabled, 'm-btn-block':block}]"
  @touchstart="handleClick()">
    <slot></slot>
  </a>
</template>
<style>

</style>
<script>
  export default{
    name: 'btn',
    computed: {
      btnTextColor() {
        if (this.btncolor === 'white' && this.disabled) {
          return '';
        }
        const hasColor = ['black', 'blue', 'green', 'red', 'orange']
          .indexOf(this.color) > -1;

        if (!hasColor) {
          return 'black';
        }
        return this.color;
      },
      btnBodyColor() {
        const hasColor = ['white', 'blue', 'green', 'red', 'orange'].indexOf(this.btncolor) > -1;

        if (!hasColor) {
          return 'white';
        }
        return this.btncolor;
      },
    },
    props: {
      disabled: Boolean,
      btncolor: {
        type: String,
        default: 'white',
      },
      color: {
        type: String,
        default: 'black',
      },
      block: Boolean,
    },

    methods: {
      handleClick() {
        if (this.disabled) {
          this.$event.preventDefault();
          this.$event.stopPropagation();
        }
      }
    }
  };
</script>
