<template>
  <div>
    <page-swiper :items="items"/>
  </div>
</template>

<script>
  import PageSwiper from '../../common/components/page-swiper';
  import {getEnableChannel, updateChannel, clearChannelTimeAndScrollY} from './js/channel';
  import {getNewsList} from './js/news';
  import {requestSuccessStr} from '../../common/js/constant';
  import {mapGetters, mapMutations} from 'vuex';

  export default {
    data() {
      return {
        items: [],
        documentScrollY: 0
      };
    },
    created() {
      clearChannelTimeAndScrollY();
      this.items = getEnableChannel(); // 获取开启的频道
      this.items.forEach((item) => {
        this._getNewsList(item);
      });
    },
    methods: {
      _getNewsList(item) {
        getNewsList(item).then((res) => {
          // item.contents = []; // 添加属性contents
          this.$set(item, 'contents', []); // 添加属性contents。设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的，同时触发视图更新。这个方法主要用于避开 Vue 不能检测属性被添加的限制。
          if (res.message === requestSuccessStr) {
            res.data.forEach((item1, index) => {
              let content = JSON.parse(item1.content);
              if (content.title) { // 一般新闻
                item.contents.push(content);
                this.$set(item, 'max_behot_time', content.behot_time);
              } else {
                if (item.id === 'question_and_answer') { // 问答
                  if (content.question) { // 有题目的
                    content.question = JSON.parse(content.question);
                    content.answer = JSON.parse(content.answer);
                    content.extra = JSON.parse(content.extra);
                    item.contents.push(content);
                    this.$set(item, 'max_behot_time', content.behot_time);
                  }
                }
              }
            });
          }
          updateChannel(this.items);
          if (item.contents.length < 5) {
            this._getNewsList(item);
          }
        }).catch(() => {
          // console.log('出错了');
        });
      },
      ...mapMutations({
        setAutoScroll: 'AUTO_SCROLL'
      })
    },
    watch: {
      // documentScrollTop(newValue) { // todo 滚动到记录的位置【先放着，不够理想】
      //   this.items[this.swiperActiveIndex].scrollY = newValue.documentScrollTop;
      //   this.documentScrollY = newValue.documentScrollTop;
      // },
      // swiperActiveIndex(newValue) { // todo 滚动到记录的位置【先放着，不够理想】
      //   this.setAutoScroll(true);
      //   let y = 0;
      //   if (this.documentScrollY >= this.actionBarHeight) { // actionBar已经滚走了
      //     y = this.items[this.swiperActiveIndex].scrollY ? this.items[this.swiperActiveIndex].scrollY : this.actionBarHeight;
      //   }
      //   setTimeout(() => {
      //     window.scrollTo(0, y);
      //   }, 10);
      // }

    },
    computed: {
      ...mapGetters(['documentScrollTop', 'swiperActiveIndex', 'actionBarHeight'])
    },
    components: {
      PageSwiper
    }
  };
</script>

<style scoped>

</style>
