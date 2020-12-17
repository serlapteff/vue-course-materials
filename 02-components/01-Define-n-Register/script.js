import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';

export const app = new Vue({
  el: '#app',

  data: () => ({
    cats: [Math.random(), Math.random(), Math.random()]
  }),
});
