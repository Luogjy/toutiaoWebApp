<template>
  <section class="wrapper">
    <div @click="news" class="item-wrapper">
      <img class="img" :src="newsImg">
      <span ref="news" class="title" :class="{active:newsActive}">新闻</span>
    </div>

    <div @click="picture" class="item-wrapper">
      <img class="img" :src="pictureImg">
      <span ref="picture" class="title" :class="{active:pictureActive}">图片</span>
    </div>

    <div @click="video" class="item-wrapper">
      <img class="img" :src="videoImg">
      <span ref="video" class="title" :class="{active:videoActive}">视频</span>
    </div>

    <div @click="toutiaouser" class="item-wrapper">
      <img class="img" :src="toutiaouserImg">
      <span ref="toutiaouser" class="title" :class="{active:toutiaouserActive}">头条号</span>
    </div>

  </section>
</template>

<script>
  export default {
    data() {
      return {
        newsImg: require('../common/img/news_light.png'),
        pictureImg: require('../common/img/picture.png'),
        videoImg: require('../common/img/video.png'),
        toutiaouserImg: require('../common/img/toutiaouser.png'),
        newsActive: true,
        pictureActive: false,
        videoActive: false,
        toutiaouserActive: false
      };
    },
    methods: {
      news() {
        this.$emit('clickNews');
        this.newsImg = require('../common/img/news_light.png');
        this.pictureImg = require('../common/img/picture.png');
        this.videoImg = require('../common/img/video.png');
        this.toutiaouserImg = require('../common/img/toutiaouser.png');
        this.newsActive = true;
        this.pictureActive = false;
        this.videoActive = false;
        this.toutiaouserActive = false;
        this.$router.push('/news')
      },
      picture() {
        this.$emit('clickPicture');
        this.pictureImg = require('../common/img/picture_light.png');
        this.newsImg = require('../common/img/news.png');
        this.videoImg = require('../common/img/video.png');
        this.toutiaouserImg = require('../common/img/toutiaouser.png');
        this.newsActive = false;
        this.pictureActive = true;
        this.videoActive = false;
        this.toutiaouserActive = false;
        this.$router.push('/picture')
      },
      video() {
        this.$emit('clickVideo');
        this.videoImg = require('../common/img/video_light.png');
        this.newsImg = require('../common/img/news.png');
        this.pictureImg = require('../common/img/picture.png');
        this.toutiaouserImg = require('../common/img/toutiaouser.png');
        this.newsActive = false;
        this.pictureActive = false;
        this.videoActive = true;
        this.toutiaouserActive = false;
        this.$router.push('/video')
      },
      toutiaouser() {
        this.$emit('clickToutiaouser');
        this.toutiaouserImg = require('../common/img/toutiaouser_light.png');
        this.newsImg = require('../common/img/news.png');
        this.pictureImg = require('../common/img/picture.png');
        this.videoImg = require('../common/img/video.png');
        this.newsActive = false;
        this.pictureActive = false;
        this.videoActive = false;
        this.toutiaouserActive = true;
        this.$router.push('/toutiaouser')
      }

    }
  };
</script>

<style scoped lang="scss">
  $item_width: 72px;
  $img_width: 20px;
  $bar_height: 44px;
  $color_normal: #616161;
  $color_active: #607D8B;

  .wrapper {
    box-sizing: border-box;
    height: $bar_height;
    display: flex;
    flex-direction: row;
    white-space: nowrap;
    background: #fff;
    justify-content: space-around;

    .item-wrapper {
      box-sizing: border-box;
      width: $item_width;
      height: 100%;
      position: relative;

      .img {
        /*试下绝对定位居中*/
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;

        top: 4px;
        bottom: 0;
        width: $img_width;
      }
      .title {
        position: absolute;
        display: inline-block;
        width: $item_width;
        font-size: 12px;
        text-align: center;
        top: 26px;
        color: $color_normal;
        &.active {
          color: $color_active;
        }
      }
    }
  }

</style>
