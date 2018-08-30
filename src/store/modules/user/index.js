import actions from './actions'
import mutations from './mutations'

const state = {
	data: null,
	profile: null,
	loggedIn: false,
	loading: false,
}

export default {
	namespaced: true,
	state,
	actions,
	mutations,
}