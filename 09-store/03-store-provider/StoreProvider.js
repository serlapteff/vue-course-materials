import { loginWithApi } from './api.js';

export default {
  data() {
    return {
      state: {
        user: null,
      },
    };
  },

  provide() {
    return {
      store: {
        state: this.state,
        setUser: this.setUser,
        login: this.login,
      },
    };
  },

  computed: {
    isAuthenticated() {
      return !!this.state.user;
    },
  },

  methods: {
    setUser(user) {
      this.state.user = user;
    },

    login(email, password) {
      return loginWithApi(email, password).then((user) => {
        this.setUser(user);
      });
    },
  },

  render(h) {
    return this.$scopedSlots.default();
  },
};
