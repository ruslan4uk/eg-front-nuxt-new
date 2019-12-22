export default {
  namespaced: true,

  state() {
    return {
      dialogs: [],
      /**
       * { messages: [], user_to: [], user_from: [],  }
       */
      unread: 0,
    }
  },

  getters: {
    dialogs( state ) {
      return state.dialogs
    },
    unread( state ) {
      return state.unread;
    }
  },

  mutations: {
    SET_DIALOGS(state, payload) {
      state.dialogs = payload
    },
    SET_NEW_DIALOGS(state, payload) {
      state.dialogs.push(payload)
    },

    SET_DIALOG_UNREAD(state, payload) {
      let current = state.dialogs.find(x => x.uid === payload);
      if(current) {
        current.unread++;
        let unread = 0;
        state.dialogs.forEach(item => {
          unread += item.unread
        });
        state.unread = unread;
      } else {
        state.unread++
      }
    },

    DELETE_DIALOG_UNREAD(state, payload) {
      let current = state.dialogs.find(x => x.uid === payload);
      if(current) {
        current.unread = 0;
        let unread = 0;
        state.dialogs.forEach(item => {
          unread += item.unread
        });
        state.unread = unread;
      }
    },

    SET_UNREAD(state, payload) {
      state.unread = payload
    }
  },

  actions: {
    async getDialogs({ commit }) {
      await this.$axios.get('/messenger/dialogs').then(({data}) => {
        commit('SET_DIALOGS', data.data)
      })
    },

    async getUnread({ commit }) {
      await this.$axios.get('/messenger/unread').then(({ data }) => {
        commit('SET_UNREAD', data.data)
      })
    }

  }
}
