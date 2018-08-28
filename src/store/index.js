import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger'

import photoModule from './modules/photo'
import userModule from './modules/user'
import notificationsModule from './modules/notifications'
import modalsModule from './modules/modals'

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		photo: photoModule,
		user: userModule,
		notifications: notificationsModule,
		modals: modalsModule,
	},
	plugins: [createLogger()],
	strict: process.env.NODE_ENV !== 'production',
});