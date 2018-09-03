import actions from './actions'
import mutations from './mutations'

const state = {
	username: null,
	name: null,
	avatar: null,
}

export default {
	namespaced: true,
	state,
	actions,
	mutations,
}