<template>
<div class="card m-panel card4">
    <label :for="id">
        <div class="card-wrap">
            <div class="card-main">
                <div class="m-box">
                    <div class="box-left m-box-col m-box-center-a">
                        <span class="m-img-icon" v-if="icon">
                          <img :src="icon">
                        </span>
                        <span class="link-text">
                          <span class="main-link" v-text="text"></span>
                          <slot></slot>
                        </span>
                    </div>
                    <div class="box-right m-box-center-a">
                      <label class="m-switch">
                        <input type="checkbox" :id="id" :disabled="disabled" v-model="curChecked">
                        <span></span>
                      </label>
                    </div>
                </div>
            </div>
        </div>
    </label>
</div>

</template>
<style>

</style>
<script>
  export default{
    name: 'switch',

    data() {
      return {
        id: 0,
        curChecked: this.checked,
      };
    },
    created() {
      const id = ~~(Math.random() * 100000);
      this.id = `mv${id}`;
    },
    props: {
      checked: {
        required: true
      },
      text: {
        type: String,
        required: true
      },
      icon: {
        type: String,
      },
      disabled: Boolean
    },
    watch: {
      'curChecked'() {
        this.$emit('check');
      }
    }
  };
</script>
