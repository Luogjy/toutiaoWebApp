<template>
  <section class="my-wrapper">
    <tab @clickItem="currentItem" :items="tabItems" :swiper-progress="SwiperProgress"/>
    <div ref="mySwiperWrapper" class="my-swiper-wrapper">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide>
          <div ref="mySlideContent" class="my-slide-content">
            推荐
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="my-slide-content">
            热点
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="my-slide-content">
            视频
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="my-slide-content">
            社会
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="my-slide-content">
            娱乐
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="my-slide-content">
            科技
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="my-slide-content">
            汽车
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="my-slide-content">
            问答
          </div>
        </swiper-slide>

      </swiper>
    </div>
  </section>
</template>

<script>
  import Tab from './tab';
  import 'swiper/dist/css/swiper.css'; // vue-awesome-swiper的样式表
  import {swiper, swiperSlide} from 'vue-awesome-swiper';

  export default {
    data() {
      return {
        tabItems: [
          {name: '推荐'},
          {name: '热点'},
          {name: '视频'},
          {name: '社会'},
          {name: '娱乐'},
          {name: '科技'},
          {name: '汽车'},
          {name: '问答'}
        ],
        SwiperProgress: 0,
        swiperOption: { // vue-awesome-swiper所有参数都写这里，所有的参数同 swiper 官方 api 参数
          scrollbar: {
            el: '.swiper-scrollbar'
          },
          // autoHeight: true, // wrapper和container会随着当前slide的高度而发生变化
          watchSlidesProgress: true,
          on: {
            progress: function (progress) {
              console.log(progress);
              this.SwiperProgress = progress;
            }
          }
        }
      };
    },
    computed: {
      swiper() { // 之前我怎么没想到呢，明明可以这样用计算属性代替$refs这个繁琐的方式获取实例的啊
        return this.$refs.mySwiper.swiper;
      },
      swiperWrapper() {
        return this.$refs.mySwiperWrapper;
      },
      slideContent() {
        return this.$refs.mySlideContent;
      }
    },
    mounted() {
      this.resetSwiperSlideHeight();
    },
    methods: {
      currentItem(index) {
        this.swiper.slideTo(index, 400, false);
      },
      // 重设swiper-slide标签的宽度
      resetSwiperSlideHeight() {
        setTimeout(() => {
          this.slideContent.style.height = this.swiperWrapper.offsetHeight/* 实际高度 */ + 'px';
        }, 20);
      }
    },
    components: {
      Tab, swiper, swiperSlide
    }
  };
</script>

<style scoped lang="scss">
  @import "../css/color";

  .my-wrapper {
    display: flex;
    flex-direction: column;
    height: 300px;
    .my-swiper-wrapper {
      flex-grow: 1;
      width: 100%;
      background: #222222;
      .swiper-slide {
        width: 100%;
        .my-slide-content {
          color: red;
        }
      }
    }

  }
</style>
