<template>
  <div id="app">
    <action-bar/>
    <tab/>
    <navigation-bar/>
    <page-swiper/>
  </div>
</template>

<script>
  import ActionBar from './common/components/action-bar';
  import Tab from './common/components/tab';
  import NavigationBar from './components/navigation-bar';
  import PageSwiper from './common/components/page-swiper';

  export default {
    components: {
      ActionBar, Tab, NavigationBar, PageSwiper
    }
  };
</script>

<style>
</style>
