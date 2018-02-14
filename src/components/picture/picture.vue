<template>
  <div>
    <page-swiper :items="items"/>
  </div>
</template>

<script>
  import PageSwiper from '../../common/components/page-swiper';

  export default {
    data() {
      return {
        items: [
          {name: '图片1'},
          {name: '图片2'},
          {name: '图片3'}
        ]
      };
    },
    components: {
      PageSwiper
    }
  };
</script>

<style scoped>

</style>
