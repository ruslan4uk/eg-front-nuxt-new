export default {

  /**
   * Get init data
   */
  actions: {
    async nuxtServerInit({ dispatch }) {
      await dispatch('init/init')
    }
  }

}
