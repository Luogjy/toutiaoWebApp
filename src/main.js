import Vue from 'vue';
import App from './App';
import router from './router';
import './common/css/reset.scss';
import store from './store';
import {saveChannel} from './components/news/js/channel';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
saveChannel();
