<template>
  <section>
    <div class="item-wrapper" :key="content.title" v-for="(content) in contents">
      <div class="one">
        <img v-if="content.media_info" class="icon" :src="content.media_info.avatar_url">
        <img v-else class="icon border">
        <span
          class="info">{{content.media_name}}-{{content.comment_count}}评论-{{formatBeHotTime(content.behot_time)}}</span>
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
  </section>
</template>

<script>
  import {formatTime, padStart} from '../js/util';

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
      formatBeHotTime(time) { // 格式化创建时间
        return formatTime(time);
      },
      // 视频时长格式化
      snapshotTime(duration) {
        let min = Math.floor(duration / 60);
        let sec = duration % 60;
        sec = padStart(sec);
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
</style>
