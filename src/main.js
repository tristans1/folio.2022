import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { Icon } from '@iconify/vue2';

Vue.component('IconComponent', Icon);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
