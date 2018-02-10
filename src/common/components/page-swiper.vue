<template>
  <section class="my-wrapper">
    <tab @clickItem="currentItem" :items="tabItems" :swiper-progress="swiperProgress"/>
    <div ref="mySwiperWrapper" class="my-swiper-wrapper">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide :key="index" v-for="(item,index) in tabItems">
          <div class="my-slide-content">
            {{item.name}}
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

  let that;
  export default {
    data() {
      return {
        timer:null,
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
        swiperProgress: 0,
        swiperOption: { // vue-awesome-swiper所有参数都写这里，所有的参数同 swiper 官方 api 参数
          scrollbar: {
            el: '.swiper-scrollbar'
          },
          // autoHeight: true, // wrapper和container会随着当前slide的高度而发生变化
          watchSlidesProgress: true,
          on: {
            progress: function (progress) {
              // that.swiperProgress = progress; // 这么写会页面滑动切换卡顿
              console.log(progress);
            }
          }
        }
      };
    },
    created() {
      that = this;
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
          // this.slideContent.style.height = this.swiperWrapper.offsetHeight/* 实际高度 */ + 'px';
          if (this.swiper.el.children[0]) {
            if (this.swiper.el.children[0].children[0]) {
              this.swiper.el.children[0].children[0].children[0].style.height = this.swiperWrapper.offsetHeight/* 实际高度 */ + 'px';
              // for (let i = 0; i < this.swiper.el.children.length; i++) {
              //   this.swiper.el.children[i].children[0].children[0].style.height = this.swiperWrapper.offsetHeight/* 实际高度 */ + 'px';
              // }
            }
          }
        }, 200);
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
        background: yellowgreen;
        width: 100%;
        .my-slide-content {
          color: red;
        }
      }
    }

  }
</style>
