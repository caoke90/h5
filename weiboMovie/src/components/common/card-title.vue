<template>
  <div class="card-title" v-if="item.title">
    <div class="m-ctrl-box">
      <div class="m-diy-btn m-box-col m-box-center m-box-center-a">
        <mv-img :needlazy="true" :src="item.title.icon_url" v-if="item.title.icon_url"></mv-img>
        <h4 v-html="item.title.text"></h4>
      </div>
    </div>
    <aside v-if="showTriangle" @click="gomore()"><i class="m-font m-font-arrow-down"></i></aside>
  </div>
</template>
<style>
</style>
<script>
  export default{
    props: ['item', 'showTriangle', 'gomore'],
    data() {
      return {};
    }
  };
</script>
