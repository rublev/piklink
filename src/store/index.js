import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import * as getters from '@/store/getters'
import * as actions from '@/store/actions'
import user from '@/store/modules/user';

Vue.use(Vuex)

export default new Vuex.Store({
	getters,
	actions,
	modules: {
		user,
	},
	plugins: [createLogger()],
	strict: process.env.NODE_ENV !== 'production',
})