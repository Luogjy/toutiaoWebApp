<template>
  <section class="wrapper">
    <ul class="tab-wrapper">
      <li class="title">推荐</li>
      <li class="title">热点</li>
      <li class="title">视频</li>
      <li class="title">社会</li>
      <li class="title">娱乐</li>
      <li class="title">科技</li>
      <li class="title">汽车</li>
      <li class="title">问答</li>
    </ul>
    <div class="bottom-line"></div>
  </section>

</template>

<script>
  export default {
    name: 'tab'
  };
</script>

<style scoped lang="scss">
  @import "../css/color";

  $tab_height: 36px;
  $tab_width: 20px;
  .wrapper {
    height: $tab_height;
    width: 100%;
    /*父不换行且横向滚动*/
    white-space: nowrap;
    overflow-x: scroll;
  }

  .tab-wrapper {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: $tab_height;
    background: $main_color;

    .title {
      width: 55px;

      /*空间不足时，收缩比例。默认为1。0为不收缩。如果所有子元素都不收缩就溢出。*/
      flex-shrink: 0;

      /*要加上背景色，不然右边会拖出空白，好诡异*/
      background: $main_color;

      text-align: center;
      line-height: $tab_height;
      color: $textColor_white;
      font-size: 12px;
    }
    .bottom-line {
      height: 3px;
      margin-top: -3px;
      background: black;
      position: absolute;
    }
  }
</style>
