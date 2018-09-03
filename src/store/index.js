import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger'

import uploadModule from './modules/upload'
import userModule from './modules/user'
import wallModule from './modules/wall'
import notificationsModule from './modules/notifications'
import publicModule from './modules/public'

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		wall: wallModule,
		upload: uploadModule,
		user: userModule,
		notifications: notificationsModule,
		public: publicModule,
	},
	plugins: [createLogger()],
	strict: process.env.NODE_ENV !== 'production',
});