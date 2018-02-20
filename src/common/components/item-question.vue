<template>
  <section>
    <div class="item-wrapper" :key="content.title" v-for="(content) in contents">
      <span class="title">{{content.question.title}}</span>
      <div v-if="content.extra.wenda_image.three_image_list.length" class="three-img-wrapper">
        <img :src="item.url" alt="" :key="index" v-for="(item,index) in content.extra.wenda_image.three_image_list">
      </div>
      <img v-else-if="content.extra.wenda_image.large_image_list.length" class="big-img"
           :src="content.extra.wenda_image.large_image_list[0].url">
      <div v-else class="abstract">{{content.answer.abstract}}</div>
      <div class="info">
        <span class="answer-count">{{content.question.nice_ans_count+content.question.normal_ans_count}}回答</span>
        <span class="time">{{formatCreateTime(content.question.create_time)}}</span>
      </div>
    </div>
  </section>
</template>

<script>
  import {formatTime} from '../js/util';

  export default {
    props: {
      contents: {
        type: Array,
        default: function () {
          return [];
        }
      }
    },
    methods: {
      formatCreateTime(time) { // 格式化创建时间
        return formatTime(time);
      },
      // 视频时长格式化
      snapshotTime(duration) {
        let min = Math.floor(duration / 60);
        let sec = duration % 60;
        if (sec < 10) {
          sec = '0' + sec;
        }
        return `${min}:${sec}`;
      }
    }
  };
</script>

<style scoped lang="scss">
  $icon_height: 20px;

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
    .title {
      display: inline-block;
      font-size: 13px;
      color: #757575;
      font-weight: bold;
      line-height: 18px;
    }
    .three-img-wrapper {
      margin-top: 5px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      img {
        width: 32.5%;
        height: 20%;
      }
    }
    .big-img {
      width: 100%;
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
    .info {
      font-size: 13px;
      color: #757575;
      margin-top: 5px;
      .answer-count {
        float: left;
      }
      .time {
        float: right;
      }
      /*清除浮动*/
      &::after {
        display: block;
        content: "";
        clear: both;
      }
    }
  }
</style>
