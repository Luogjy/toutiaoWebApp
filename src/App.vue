<template>
  <div ref="wrapper" class="wrapper" id="app">
    <action-bar/>
    <div class="main-body">
      <page-swiper/>
    </div>
    <navigation-bar class="nav-bar"/>
  </div>
</template>

<script>
  import ActionBar from './common/components/action-bar';
  import NavigationBar from './components/navigation-bar';
  import PageSwiper from './common/components/page-swiper';

  export default {
    data() {
      return {
        myWrapperHeight: 0
      };
    },
    mounted() {
      // console.log(this.$refs.wrapper.clientHeight);
      // this.myWrapperHeight = window.screen.availHeight;
      console.log(window.screen.availHeight);
    },
    components: {
      ActionBar, NavigationBar, PageSwiper
    }
  };
</script>

<style scoped lang="scss">
  @import "./common/css/size";

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
