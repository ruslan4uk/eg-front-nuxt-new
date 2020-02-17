import Vue from 'vue'
// import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

import '@/assets/index.css'

import 'element-ui/lib/theme-chalk/reset.css'

import '@/node_modules/flag-icon-css/sass/flag-icon.scss'

import ElementUi from 'element-ui';

// Fixes an issue with filters not working on mobile
ElementUi.Select.computed.readonly = function () {
  // trade-off for IE input readonly problem: https://github.com/ElemeFE/element/issues/10403
  const isIE = !this.$isServer && !Number.isNaN(Number(document.documentMode));

  return !(this.filterable || this.multiple || !isIE) && !this.visible;
};

export default ElementUi;

Vue.use(ElementUi, { locale });
