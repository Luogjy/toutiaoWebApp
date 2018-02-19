<template>
  <div>
    <page-swiper :items="items"/>
  </div>
</template>

<script>
  import PageSwiper from '../../common/components/page-swiper';
  import {getEnableChannel} from './js/channel';
  import {getNewsList} from './js/news';
  import {requestSuccessStr} from '../../common/js/constant';

  export default {
    data() {
      return {
        items: []
      };
    },
    created() {
      this.items = getEnableChannel(); // 获取开启的频道
      this.items.forEach((item, index) => {
        getNewsList(item.id).then((res) => {
          // item.contents = []; // 添加属性contents
          this.$set(item, 'contents', []); // 添加属性contents。设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的，同时触发视图更新。这个方法主要用于避开 Vue 不能检测属性被添加的限制。
          if (res.message === requestSuccessStr) {
            res.data.forEach((item1, index) => {
              item.contents.push(JSON.parse(item1.content));
            });
          }
          console.log(item);
        });
      });
    },
    components: {
      PageSwiper
    }
  };
</script>

<style scoped>

</style>
