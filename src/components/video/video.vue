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
          {name: '视频1'},
          {name: '视频2'},
          {name: '视频3'},
          {name: '视频4'}
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
