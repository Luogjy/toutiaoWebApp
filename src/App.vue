<template>
  <div ref="wrapper" class="wrapper" id="app">
    <action-bar ref="actionBar"/>

    <div class="main-body">
      <!--
        keep-alive 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。
        主要用于保留组件状态或避免重新渲染。这样可以避免每次加载这个组件都重新请求接口加载数据。
        用在其一个直属的子组件被开关的情形。如果你在其中有 v-for 则不会工作。
      -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>

    <navigation-bar ref="navBar" class="nav-bar" :class="showNavBar"/>
  </div>
</template>

<script>
  import ActionBar from './common/components/action-bar';
  import NavigationBar from './components/navigation-bar';
  import PageSwiper from './common/components/page-swiper';
  import {mapMutations, mapGetters} from 'vuex';

  export default {
    data() {
      return {
        // myWrapperHeight: 100
        initActionBarOffsetHeight: 0,
        preScrollTop: 0,
        toShowNavBar: true
      };
    },
    computed: {
      actionBar() {
        return this.$refs.actionBar.$el;
      },
      navBar() {
        return this.$refs.navBar.$el;
      },
      wrapper() {
        return this.$refs.wrapper;
      },
      showNavBar() {
        return this.toShowNavBar ? 'nav-bar-enter' : 'nav-bar-exit';
      },
      ...mapGetters(['swiperActiveIndex', 'theType', 'autoScroll'])
    },
    mounted() {
      this.initActionBarOffsetHeight = this.actionBar.offsetHeight;
      this.setActionBarHeight(this.initActionBarOffsetHeight);
      this.$nextTick(function () {
        window.addEventListener('scroll', this.onScroll);
      });
      // this.myWrapperHeight = window.screen.availHeight - this.actionBar.offsetHeight - this.navBar.offsetHeight;
    },
    methods: {
      onScroll() {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        this.setDocumentScrollTop({documentScrollTop: scrollTop, actionBarHeight: this.initActionBarOffsetHeight});

        // if (!this.autoScroll) { // todo 滚动到记录的位置【先放着，不够理想】
          // 导航栏的交互
          this.toShowNavBar = this.preScrollTop > scrollTop;
          this.preScrollTop = scrollTop;
        // }
        // this.setAutoScroll(false); // todo 滚动到记录的位置【先放着，不够理想】
      },
      ...mapMutations({
        setDocumentScrollTop: 'DOCUMENT_SCROLL_TOP',
        setActionBarHeight: 'ACTION_BAR_HEIGHT',
        setAutoScroll: 'AUTO_SCROLL'
      })
    },
    components: {
      ActionBar, NavigationBar, PageSwiper
    }
  };
</script>

<style scoped lang="scss">
  @import "./common/css/color";
  @import "./common/css/size";

  .wrapper {
    width: 100%;
    .main-body {
      width: 100%;
      background: $pageSwiper_bgColor;
    }
    .nav-bar {
      position: fixed;
      bottom: 0;
      z-index: 1;
    }
    .nav-bar-exit {
      transform: translateY($navigation_bar_height);
      transition-property: transform;
      transition-duration: 400ms;
    }
    .nav-bar-enter {
      transform: translateY(0);
      transition-property: transform;
      transition-duration: 400ms;
    }
  }

</style>
