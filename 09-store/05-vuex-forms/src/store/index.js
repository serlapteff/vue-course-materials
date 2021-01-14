import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import form from './modules/form';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['form'],
});

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  modules: {
    form,
  },
  plugins: [vuexLocal.plugin],
});
