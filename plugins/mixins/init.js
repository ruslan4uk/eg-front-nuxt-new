import Vue from 'vue';

import { mapGetters } from 'vuex';

const User = {
  install(Vue, options) {
    Vue.mixin({
      computed: {
        ...mapGetters({
          initLanguage: 'init/language',
          initCategory: 'init/category',
          initContactType: 'init/contact_type',
          initCurrency: 'init/currency',
          initPeopleCategory: 'init/people_category',
          initPriceType: 'init/price_type',
          initService: 'init/service',
          initTiming: 'init/timing',
        })
      }
    })
  }
};

Vue.use(User);
