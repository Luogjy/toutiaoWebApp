<template>
  <section class="wrapper">
    <div class="tab-wrapper">
      <ul class="title-wrapper">
        <li @click="clickItem(index)" class="title" :key="index" v-for="(item,index) in items">{{item.name}}</li>
      </ul>
      <div v-show="items.length" ref="indicator" class="indicator"></div>
    </div>
    <img class="add" src="../img/add.png">
  </section>

</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    data() {
      return {
        tab_width: 55 // tab宽度
      };
    },
    props: {
      items: {
        type: Array,
        default: function () {
          return [];
        }
      }
      // swiperProgress: {
      //   type: Number,
      //   default: 0
      // }
    },
    mounted() {
      if (this.items.length < 3) {
        this.indicator.style.width = this.items.length * this.tab_width + 'px';
      }
    },
    watch: {
      swiperProgress(newValue, oldValue) {
        console.log(newValue);
        this.indicator.style.left = (Number.parseFloat(this.indicator.style.width) * newValue) + 'px';
      }
    },
    methods: {
      clickItem(index) {
        this.$emit('clickItem', index);
      }
    },
    computed: {
      indicator() {
        return this.$refs.indicator;
      },
      /*
       mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性。
       https://vuex.vuejs.org/zh-cn/getters.html
       使用对象展开运算符将 getter 混入 computed 对象中
       想将一个 getter 属性另取一个名字，使用对象形式，这里不打算取其他名字，所以直接用数组了
       【mapGetters下的字段都对应在在src/store/getters.js】
      */
      ...mapGetters([
        'swiperProgress'
      ])
    }
  };
</script>

<style scoped lang="scss">
  @import "../css/color";

  $tab_height: 36px;
  /*tab宽度*/
  $tab_width: 55px;

  .wrapper {
    display: flex;
    flex-direction: row;

    .tab-wrapper {
      /*对剩余空间进行划分。可以小数。*/
      flex-grow: 1;
      height: $tab_height;
      /*父不换行且横向滚动*/
      white-space: nowrap;
      overflow-x: scroll;
      position: relative;

      .title-wrapper {
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        /*主轴对齐方式*/
        justify-content: flex-start;
        height: $tab_height;
        background: $main_color;

        .title {
          width: $tab_width;

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

      /*tab底部的指示器*/
      .indicator {
        content: " ";
        width: $tab_width;
        height: 0;
        display: inline-block;
        position: absolute;
        top: 34px;
        left: 0;
        /* margin-top: -68px; */
        border-bottom: 2px solid #C80000;
      }
    }

    .add {
      box-sizing: border-box;
      width: $tab_height;
      height: $tab_height;
      padding: 12px;
      background: $main_color;
    }
  }
</style>
