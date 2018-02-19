<template>
  <section ref="myWrapper" class="my-wrapper">
    <tab ref="tab" @clickItem="currentItem" :items="items" class="tab" :class="tabFixed"/>
    <div ref="mySwiperWrapper" class="my-swiper-wrapper" :class="mySwiperWrapperMarginTop">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide :key="index" v-for="(item,index) in items">
          <div class="my-slide-content">
            <div class="item-wrapper" v-if="item.contents" :key="content.title" v-for="(content) in item.contents">
              <div class="one">
                <img v-if="content.media_info" class="icon" :src="content.media_info.avatar_url">
                <img v-else class="icon border">
                <span class="info">{{content.media_name}}-{{content.comment_count}}评论-{{formatBeHotTime(content.behot_time)}}</span>
              </div>

              <div class="two">
                <div class="left">
                  <span class="title">{{content.title}}</span>
                  <div v-if="!content.video_detail_info" class="abstract">{{content.abstract}}</div>
                  <div v-else-if="content.video_detail_info" class="snapshot">
                    <img :src="content.video_detail_info.detail_video_large_image.url" class="img-snapshot">
                    <span class="snapshot-time">{{snapshotTime(content.video_duration)}}</span>
                  </div>
                </div>
                <div v-if="content.image_list" class="right">
                  <img class="title-img" :src="content.image_list[0].url">
                </div>
              </div>
            </div>
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
  import {mapMutations, mapGetters} from 'vuex';

  let that;
  export default {
    props: {
      myWrapperHeight: {
        type: Number,
        default: 300
      },
      items: {
        type: Array,
        default: function () {
          return [];
        }
      }
    },
    data() {
      return {
        swiperOption: { // vue-awesome-swiper所有参数都写这里，所有的参数同 swiper 官方 api 参数
          scrollbar: {
            el: '.swiper-scrollbar'
          },
          speed: 150, // 划动时的切换速度，默认300毫秒
          autoHeight: true, // wrapper和container会随着当前slide的高度而发生变化
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
        },
        toFixedTab: false
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
      },
      tab() {
        return this.$refs.tab.$el;
      },
      tabFixed() {
        return this.toFixedTab ? 'tab-fixed' : '';
      },
      mySwiperWrapperMarginTop() {
        return this.toFixedTab ? 'my-swiper-wrapper-marginTop' : '';
      },
      ...mapGetters(['documentScrollTop'])
    },
    mounted() {
      // this.resetSwiperSlideHeight();
    },
    watch: {
      myWrapperHeight(newValue) {
        this.$refs.myWrapper.style.height = newValue + 'px';
      },
      documentScrollTop(newValue) {
        this.toFixedTab = newValue.documentScrollTop >= newValue.actionBarHeight;
      }
    },
    methods: {
      currentItem(index) {
        this.swiper.slideTo(index, 150, false);
      },
      // 重设swiper-slide标签的高度
      resetSwiperSlideHeight() {
        setTimeout(() => {
          if (this.swiper.el.children[0]) {
            if (this.swiper.el.children[0].children[0]) {
              this.swiper.el.children[0].children[0].children[0].style.height = this.swiperWrapper.offsetHeight/* 实际高度 */ + 'px';
            }
          }
        }, 20);
      },
      formatBeHotTime(time) { // 格式化创建时间
        let now = Math.floor(new Date().getTime() / 1000);
        let between = (now - time) / 60;
        if (between <= 1) { // 如果在当前时间以前一分钟内
          return '刚刚';
        } else if (between <= 60) {
          return Math.floor(between) + '分钟前';
        } else if (between <= 60 * 24) {
          return Math.floor(between / 60) + '小时前';
        } else {
          return Math.floor(between / (60 * 24)) + '天前';
        }
      },
      // 视频时长格式化
      snapshotTime(duration) {
        let min = Math.floor(duration / 60);
        let sec = duration % 60;
        if (sec < 10) {
          sec = '0' + sec;
        }
        return `${min}:${sec}`;
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
  @import "../css/size";

  $icon_height: 20px;

  .my-wrapper {
    display: flex;
    flex-direction: column;
    height: 300px;
    .tab {
      flex-shrink: 0;
    }
    .tab-fixed {
      position: fixed;
      width: 100%;
      top: 0;
      z-index: 2;
    }
    .my-swiper-wrapper {
      flex-grow: 1;
      width: 100%;
      background: $pageSwiper_bgColor;
      .swiper-slide {
        background: $pageSwiper_bgColor;
        .my-slide-content {
          box-sizing: border-box;
          .item-wrapper {
            box-sizing: border-box;
            width: 100%;
            background: #ffffff;
            /*水平偏移、垂直偏移、模糊、扩展、颜色*/
            box-shadow: 0 1px 1px 0 #C9C9C9;
            border-top: solid #E8E8E8 1px;
            padding: 10px 10px;
            margin-top: 5px;
            margin-bottom: 5px;
            .one {
              height: $icon_height;
              font-size: 12px;
              color: #767676;
              .icon {
                display: inline-block;
                width: $icon_height;
                border-radius: 50%;
              }
              .border {
                border: #E1E1E1 1px dashed;
              }
              .info {
                margin-left: 5px;
                line-height: $icon_height;
                display: inline-block;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
            .two {
              display: flex;
              width: 100%;
              .left {
                width: 100%;
                .title {
                  display: inline-block;
                  font-size: 13px;
                  color: #757575;
                  font-weight: bold;
                  margin-top: 5px;
                  line-height: 18px;
                }
                .abstract {
                  height: 48px;
                  color: #7B7B7B;
                  margin-top: 6px;
                  font-size: 13px;
                  line-height: 16px;
                  /*对象作为弹性伸缩盒子模型显示*/
                  display: -webkit-box;
                  /*设置或检索伸缩盒对象的子元素的排列方式*/
                  -webkit-box-orient: vertical;
                  /*溢出省略的界限*/
                  -webkit-line-clamp: 3;
                  overflow: hidden;
                }
                .snapshot {
                  width: 100%;
                  margin-top: 6px;
                  position: relative;
                  .img-snapshot {
                    width: 100%;
                  }
                  .snapshot-time {
                    background: rgba(0, 0, 0, 0.5);
                    color: #ffffff;
                    font-weight: normal;
                    border-radius: 4px;
                    font-size: 12px;
                    padding: 5px 8px;
                    position: absolute;
                    bottom: 8px;
                    right: 5px;
                  }
                }
              }
              .right {
                box-sizing: border-box;
                margin-top: 2px;
                margin-left: 5px;
                flex-shrink: 0;
                width: 80px;
                height: 80px;
                overflow: hidden;
                .title-img {
                  margin-left: -15px;
                  width: 120px;
                }
              }
            }
          }
        }
      }
    }
    .my-swiper-wrapper-marginTop {
      margin-top: $tab_height;
    }

  }
</style>
