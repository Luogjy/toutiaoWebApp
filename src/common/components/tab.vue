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
        startX: 0,
        currentTabMarginLeft: 0,
        currentIndicatorLeft: 0,
        initTabWrapperOffsetWidth: 0,
        initTabWrapperScrollWidth: 0,
        initIndicatorOffsetWidth: 0,
        // 页面切换都一定程度时，指示器的暂时固定位置
        temporaryFixedIndicatorLeft: 0,
        // 手指划动tab栏的距离
        touchMoveTabMarginLeft: 0
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
      this.initTabWrapperScrollWidth = this.tabWrapper.scrollWidth;
      this.initTabWrapperOffsetWidth = this.tabWrapper.offsetWidth;
      this.initIndicatorOffsetWidth = this.indicator.offsetWidth; // 移动的过程中宽度竟然会偶然突变的，所有还是记录一个初始值比较靠谱
      this.temporaryFixedIndicatorLeft = this.initIndicatorOffsetWidth * 1.5;
    },
    watch: {
      swiperProgress(newValue, oldValue) { // 页面滑动进度变化时
        const count = this.items.length;

        if (this.initTabWrapperScrollWidth <= this.initTabWrapperOffsetWidth) { // 如果浏览器可显宽度装得下tab栏
          this.indicator.style.left = (this.initIndicatorOffsetWidth * newValue * (count - 1)) + 'px';
        } else { // 如果浏览器可显宽度装不下tab栏
          if (count <= 3) { // 只有3个tab项就不管了，正常的手机应该都会够空间
            this.indicator.style.left = (this.initIndicatorOffsetWidth * newValue * (count - 1)) + 'px';
          } else {
            let indicatorLeft = (this.initIndicatorOffsetWidth * newValue * (count - 1)); // 指示器的计算位置
            let tempIndicatorLeft = indicatorLeft;

            if (Math.abs(this.currentTabMarginLeft) + this.initTabWrapperOffsetWidth <= this.initTabWrapperScrollWidth) { // 页面滑动进度变化时，如果预计最后一个tab还没完全显示
              if (indicatorLeft >= this.temporaryFixedIndicatorLeft) { // 111222
                indicatorLeft = this.temporaryFixedIndicatorLeft;
              }

              let tabMarginLeft = indicatorLeft - tempIndicatorLeft;

              if (Math.abs(tabMarginLeft) + this.initTabWrapperOffsetWidth > this.initTabWrapperScrollWidth) { // 修正例如拖动tab到末尾而页面还在第一页时点击tab切换页面 或者 在tab从运动到不能运动由于拖动过快 等 导致tab栏过度运动
                tabMarginLeft = this.initTabWrapperOffsetWidth - this.initTabWrapperScrollWidth;
                indicatorLeft = this.temporaryFixedIndicatorLeft +
                  (tempIndicatorLeft - (Math.abs(tabMarginLeft) + this.temporaryFixedIndicatorLeft)); // 完全显示的话tab就不能运动了，那就让指示器就要代替它运动
              }

              if (this.touchMoveTabMarginLeft !== 0) { // 修正一下手动划动过tab栏时的位置
                this.touchMoveTabMarginLeft = 0;
                this.tabWrapper.scrollLeft = 0; // 横向滚动到0
                // this.titleWrapper.style.marginLeft = 0 + 'px';
              }

              this.currentIndicatorLeft = indicatorLeft; // 存一下指示器的位置
              this.currentTabMarginLeft = tabMarginLeft; // 存一下tab栏的位置
              this.indicator.style.left = this.currentIndicatorLeft + 'px';
              this.titleWrapper.style.marginLeft = this.currentTabMarginLeft + 'px';
            } else { // 页面滑动进度变化时，如果预计最后一个tab已经完全显示
              this.currentIndicatorLeft = this.temporaryFixedIndicatorLeft +
                (tempIndicatorLeft - (Math.abs(this.currentTabMarginLeft) + this.temporaryFixedIndicatorLeft)); // 完全显示的话tab就不能运动了，那就让指示器就要代替它运动
              this.indicator.style.left = this.currentIndicatorLeft + 'px';

              if (this.currentIndicatorLeft <= this.temporaryFixedIndicatorLeft) {
                this.currentTabMarginLeft = this.currentTabMarginLeft +
                  (this.temporaryFixedIndicatorLeft - this.currentIndicatorLeft);
              }
              this.titleWrapper.style.marginLeft = this.currentTabMarginLeft + 'px';
            }
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

        let titleWrapperMarginLeft = this.titleWrapper.style.marginLeft ? this.titleWrapper.style.marginLeft : 0;
        let tabMarginLeft = Number.parseFloat(titleWrapperMarginLeft) + deltaX;
        this.touchMoveTabMarginLeft = this.touchMoveTabMarginLeft + tabMarginLeft;

        if (deltaX > 0) { // 手指往右划
          let indicatorLeft = Number.parseFloat(this.indicator.style.left) + deltaX;
          if (tabMarginLeft > 0) {
            tabMarginLeft = 0;
            indicatorLeft = this.swiperActiveIndex * this.initIndicatorOffsetWidth;
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
  @import "../css/size";

  /*tab宽度*/
  $tab_width: 55px;

  .wrapper {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;

    .tab-wrapper {
      box-sizing: border-box;
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
        border-bottom: 2px solid #E9DADA;
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
