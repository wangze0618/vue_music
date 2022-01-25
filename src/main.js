import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
// import 'lib-flexible'
import 'flexible.js'
import 'reset.css'

import { NavBar } from 'vant';
import { Tabbar, TabbarItem } from 'vant';
import { Col, Row } from 'vant';
import { Image as VanImage } from 'vant';

Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);
Vue.use(Col);
Vue.use(Row);
Vue.use(VanImage);


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
