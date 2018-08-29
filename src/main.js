import Vue from 'vue'
import Vuex from 'vuex'
import { sync } from 'vuex-router-sync'
import _ from 'lodash'
import * as svgicon from 'vue-svgicon'
import * as blockstack from 'blockstack'

import App from '@/containers/App/App'
import router from '@/router'

import store from './store'

Vue.use(Vuex)

sync(store, router)

Vue.set(Vue.prototype, '_', _)
Vue.set(Vue.prototype, 'blockstack', blockstack)

Vue.use(svgicon, {
	tagName: 'svgicon'
})

Vue.config.productionTip = false

Vue.config.ignoredElements = ['ion-icon']

/* eslint-disable no-new */
new Vue({
	el: '#app',
	store,
	router,
  components: { App },
  template: '<App/>'
})
