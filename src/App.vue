<template>
  <div id="app">
    <action-bar/>
    <tab/>
    <navigation-bar/>
  </div>
</template>

<script>
  import ActionBar from './common/components/action-bar';
  import Tab from './common/components/tab';
  import NavigationBar from './components/navigation-bar';
  import 'swiper/dist/css/swiper.css';
  // import {Swiper, SwiperSlide} from 'vue-awesome-swiper';

  export default {
    components: {
      ActionBar, Tab, NavigationBar
      // Swiper, SwiperSlide
    }
  };
</script>

<style>
</style>
