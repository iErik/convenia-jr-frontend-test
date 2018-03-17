import Vue from 'vue';

import App from 'components/App';

import 'styles/app';

new Vue({
  el: '#v-app',
  render: createElement => createElement(App)
});
