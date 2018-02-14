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

    <navigation-bar ref="navBar" class="nav-bar"/>
  </div>
</template>

<script>
  import ActionBar from './common/components/action-bar';
  import NavigationBar from './components/navigation-bar';
  import PageSwiper from './common/components/page-swiper';

  export default {
    data() {
      return {
        // myWrapperHeight: 100
      };
    },
    computed: {
      actionBar() {
        return this.$refs.actionBar.$el;
      },
      navBar() {
        return this.$refs.navBar.$el;
      }
    },
    mounted() {
      // this.myWrapperHeight = window.screen.availHeight - this.actionBar.offsetHeight - this.navBar.offsetHeight;
    },
    components: {
      ActionBar, NavigationBar, PageSwiper
    }
  };
</script>

<style scoped lang="scss">
  .wrapper {
    width: 100%;
    .main-body {
      width: 100%;
      background: purple;
    }
    .nav-bar {
      position: fixed;
      bottom: 0;
    }
  }

</style>
