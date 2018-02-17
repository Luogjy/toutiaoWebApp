<template>
  <div>
    <page-swiper :items="items"/>
  </div>
</template>

<script>
  import PageSwiper from '../../common/components/page-swiper';
  import {getEnableChannel} from './js/channel';

  export default {
    data() {
      return {
        items: []
      };
    },
    created() {
      this.items = getEnableChannel(); // 获取开启的频道
    },
    components: {
      PageSwiper
    }
  };
</script>

<style scoped>

</style>
