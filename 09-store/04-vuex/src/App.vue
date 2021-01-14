<template>
  <div class="wrapper page container">
    <login-page v-if="!isAuthenticated"/>
    <div v-else>{{ user }}</div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import LoginPage from './components/LoginPage';

export default {
  name: 'App',

  components: {
    LoginPage,
  },

  computed: {
    ...mapState('auth', {
      user: (state) => state.user,
    }),

    ...mapGetters('auth', {
      isAuthenticated: 'IS_AUTHENTICATED',
    }),
  },
};
</script>

<style scoped>
p {
  margin: 1rem 0;
}
</style>
