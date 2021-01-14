import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';
import App from './App.js';
import StoreProvider from './StoreProvider.js';

Vue.config.productionTip = false;

new Vue({
  template: `
    <StoreProvider #default>
      <App/>
    </StoreProvider>`,

  components: {
    App,
    StoreProvider,
  },
}).$mount('#app');
