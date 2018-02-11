<template>
  <section class="wrapper">
    <div ref="tabWrapper" class="tab-wrapper" @touchstart="tabTouchStart" @touchmove="tabTouchMove">
      <ul ref="titleWrapper" class="title-wrapper">
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
        startX: 0
        // tab_width: 55 // tab宽度
      };
    },
    props: {
      items: {
        type: Array,
        default: function () {
          return [];
        }
      }
    },
    mounted() {
      // this.tabWrapper.scrollLeft = 200; // 横向滚动到
    },
    watch: {
      swiperProgress(newValue, oldValue) { // 页面滑动进度变化时
        const count = this.items.length;

        if (this.tabWrapper.scrollWidth <= this.tabWrapper.offsetWidth) { // 如果浏览器可显宽度装得下tab栏
          this.indicator.style.left = (Number.parseFloat(this.indicator.offsetWidth) * newValue * (count - 1)) + 'px';
        } else { // 如果浏览器可显宽度装不下tab栏
          if (count <= 3) { // 3个都装不下就先不管了
            this.indicator.style.left = (Number.parseFloat(this.indicator.offsetWidth) * newValue * (count - 1)) + 'px';
          } else {
            // 指示器的位置
            let indicatorLeft = (Number.parseFloat(this.indicator.offsetWidth) * newValue * (count - 1));
            if (indicatorLeft >= this.indicator.offsetWidth * 1.5) {
              indicatorLeft = this.indicator.offsetWidth * 1.5;
            }
            this.indicator.style.left = indicatorLeft + 'px';

            // tab栏的位置
            let tabMarginLeft = (-this.indicator.offsetWidth * (this.swiperActiveIndex - 1.5));
            if (tabMarginLeft > 0) {
              tabMarginLeft = 0;
            }
            if (this.tabWrapper.scrollWidth + tabMarginLeft < this.tabWrapper.offsetWidth) { // todo tab栏
              tabMarginLeft = -this.indicator.offsetWidth * 0.5;
            }
            this.titleWrapper.style.marginLeft = tabMarginLeft + 'px'; // tab栏动
            console.log('Math.abs(tabMarginLeft)->' + Math.abs(tabMarginLeft));
            console.log('this.tabWrapper.scrollWidth->' + this.tabWrapper.scrollWidth);
            console.log('this.tabWrapper.offsetWidth->' + this.tabWrapper.offsetWidth);
            console.log('---------------------------->' + (this.tabWrapper.scrollWidth - this.tabWrapper.offsetWidth));
          }
        }
      }
    },
    methods: {
      clickItem(index) {
        this.$emit('clickItem', index);
      },
      tabTouchStart(e) {
        const touch = e.touches[0];
        this.startX = touch.pageX;
      },
      tabTouchMove(e) { // 在这里向右滚动tab栏是修正MarginLeft
        e.stopImmediatePropagation(); // 阻止冒泡，不然对应滑动前进后退的浏览器容易误操作
        const touch = e.touches[0];
        const deltaX = touch.pageX - this.startX; // 偏移(负值为手指往左划)
        this.startX = touch.pageX;

        if (deltaX > 0) { // 手指往右划
          let tabMarginLeft = Number.parseFloat(this.titleWrapper.style.marginLeft) + deltaX;
          let indicatorLeft = Number.parseFloat(this.indicator.style.left) + deltaX;
          if (tabMarginLeft > 0) {
            tabMarginLeft = 0;
            indicatorLeft = this.swiperActiveIndex * this.indicator.offsetWidth;
          }
          this.titleWrapper.style.marginLeft = tabMarginLeft + 'px';
          this.indicator.style.left = indicatorLeft + 'px';
        }
      }
    },
    computed: {
      indicator() {
        return this.$refs.indicator;
      },
      tabWrapper() {
        return this.$refs.tabWrapper;
      },
      titleWrapper() {
        return this.$refs.titleWrapper;
      },
      wrapperLeftContent() {
        return this.$refs.wrapperLeftContent;
      },
      /*
       mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性。
       https://vuex.vuejs.org/zh-cn/getters.html
       使用对象展开运算符将 getter 混入 computed 对象中
       想将一个 getter 属性另取一个名字，使用对象形式，这里不打算取其他名字，所以直接用数组了
       【mapGetters下的字段都对应在在src/store/getters.js】
      */
      ...mapGetters([
        'swiperProgress', // 进度
        'swiperActiveIndex' // 当前索引
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
