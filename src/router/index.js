import Vue from 'vue';
import Router from 'vue-router';
import News from '../components/news/news';
import Picture from '../components/picture/picture';
import Video from '../components/video/video';
import Toutiaouser from '../components/toutiaouser/toutiaouser';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/news'
    },
    {
      path: '/news',
      component: News
    },
    {
      path: '/picture',
      component: Picture
    },
    {
      path: '/video',
      component: Video
    },
    {
      path: '/toutiaouser',
      component: Toutiaouser
    }

  ]
});
