<template>
  <section class="wrapper">
    <div class="tab-wrapper">
      <ul class="title-wrapper">
        <li @click="clickItem(index)" class="title" :key="index" v-for="(item,index) in items">{{item.name}}</li>
      </ul>
    </div>
    <img class="add" src="../img/add.png">
  </section>

</template>

<script>
  export default {
    props: {
      items: {
        type: Array,
        default: function () {
          return [];
        }
      },
      SwiperProgress: {
        type: Number,
        default: 0
      }
    },
    methods: {
      clickItem(index) {
        this.$emit('clickItem', index);
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../css/color";

  $tab_height: 36px;
  $title_width: 55px;

  .wrapper {
    display: flex;
    flex-direction: row;
    position: relative;

    .tab-wrapper {
      /*对剩余空间进行划分。可以小数。*/
      flex-grow: 1;
      height: $tab_height;
      /*父不换行且横向滚动*/
      white-space: nowrap;
      overflow-x: scroll;

      .title-wrapper {
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        /*主轴对齐方式*/
        justify-content: flex-start;
        height: $tab_height;
        background: $main_color;

        .title {
          width: $title_width;

          /*空间不足时，收缩比例。默认为1。0为不收缩。如果所有子元素都不收缩就溢出。*/
          flex-shrink: 0;

          /*要加上背景色，不然右边会拖出空白，好诡异*/
          background: $main_color;

          text-align: center;
          line-height: $tab_height;
          color: $textColor_white;
          font-size: 12px;
        }
      }
    }

    .add {
      box-sizing: border-box;
      width: $tab_height;
      height: $tab_height;
      padding: 12px;
      background: $main_color;
    }

    /*tab底部的指示器*/
    /*& 代表嵌套外层的父选择器，即外层选择器链占位符
    https://www.sass.hk/docs/
    例如这里编译成.wrapper::after
    */
    &::after {
      content: " ";
      width: $title_width;
      height: 0;
      display: inline-block;
      position: absolute;
      top: 34px;
      left: 0;
      /* margin-top: -68px; */
      border-bottom: 2px solid #C80000;
    }
  }
</style>
