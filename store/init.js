export default {
  namespaced: true,

  state() {
    return {
      language: [],
      category: [],
      contact_type: [],
      currency: [],
      people_category: [],
      price_type: [],
      service: [],
      timing: [],
    }
  },

  getters: {
    language (state) {
      return state.language;
    },
    category (state) {
      return state.category;
    },
    contact_type (state) {
      return state.contact_type;
    },
    currency (state) {
      return state.currency;
    },
    people_category (state) {
      return state.people_category;
    },
    price_type (state) {
      return state.price_type;
    },
    service (state) {
      return state.service;
    },
    timing (state) {
      return state.timing;
    },
  },

  mutations: {
    SET_INIT_DATA(state, payload) {
      state.language          = payload.language;
      state.category          = payload.category;
      state.contact_type      = payload.contact_type;
      state.currency          = payload.currency;
      state.people_category   = payload.people_category;
      state.price_type        = payload.price_type;
      state.service           = payload.service;
      state.timing            = payload.timing;
    },
  },

  actions: {
    async init ({ commit }) {
      await this.$axios.get('/init').then( ({ data }) => {
        commit('SET_INIT_DATA', data.data);
      })
    },
  },

}
