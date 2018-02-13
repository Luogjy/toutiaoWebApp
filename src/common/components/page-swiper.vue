<template>
  <section ref="myWrapper" class="my-wrapper">
    <tab @clickItem="currentItem" :items="tabItems"/>
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
  import {mapMutations} from 'vuex';

  let that;
  export default {
    props: {
      myWrapperHeight: {
        type: Number,
        default: 300
      }
    },
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
          {name: '问答'},
          {name: '问答2'},
          {name: '问答3'},
          {name: '问答4'},
          {name: '问答5'},
          {name: '问答6'},
          {name: '问答7'}
        ],
        swiperOption: { // vue-awesome-swiper所有参数都写这里，所有的参数同 swiper 官方 api 参数
          scrollbar: {
            el: '.swiper-scrollbar'
          },
          speed: 150, // 划动时的切换速度，默认300毫秒
          // autoHeight: true, // wrapper和container会随着当前slide的高度而发生变化
          watchSlidesProgress: true,
          on: {
            progress: function (progress) {
              // that.swiperProgress = progress; // 本来想这么给子组件属性传值的，但频率太高。父组件给子组件通过属性传递值时，太频繁会导致卡顿
              that.setSwiperProgress(progress);
            },
            slideChange: function () {
              that.setSwiperActiveIndex(this.activeIndex);
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
      },
      myWrapper() {
        return this.$refs.myWrapper;
      }
    },
    mounted() {
      // this.$refs.myWrapper.style.height = this.myWrapperHeight + 'px';
      this.$refs.myWrapper.style.height = this.myWrapperHeight + 'px';
      this.resetSwiperSlideHeight();
    },
    methods: {
      currentItem(index) {
        this.swiper.slideTo(index, 150, false);
      },
      // 重设swiper-slide标签的宽度
      resetSwiperSlideHeight() {
        setTimeout(() => {
          // this.slideContent.style.height = this.swiperWrapper.offsetHeight/* 实际高度 */ + 'px';
          if (this.swiper.el.children[0]) {
            if (this.swiper.el.children[0].children[0]) {
              this.swiper.el.children[0].children[0].children[0].style.height = this.swiperWrapper.offsetHeight/* 实际高度 */ + 'px';
            }
          }
        }, 200);
      },
      /*
        https://vuex.vuejs.org/zh-cn/mutations.html
        你可以在组件中使用 this.$store.commit('xxx') 提交 mutation，或者使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用（需要在根节点注入 store）
        【mapMutations放在methods下】
     */
      ...mapMutations({
        setSwiperProgress: 'SWIPER_PROGRESS',
        setSwiperActiveIndex: 'SWIPER_ACTIVE_INDEX'
      })
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
