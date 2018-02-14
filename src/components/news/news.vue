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
          {name: '推荐'},
          {name: '热点'},
          {name: '视频'},
          {name: '社会'},
          {name: '娱乐'},
          {name: '科技'},
          {name: '汽车'},
          {name: '问答'},
          {name: '问答2'},
          {name: '问答3'},
          {name: '问答4'},
          {name: '问答5'},
          {name: '问答6'},
          {name: '问答7'}
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
