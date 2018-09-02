import actions from './actions'
import mutations from './mutations'

const state = {
	images: [],
}

export default {
	namespaced: true,
	state,
	actions,
	mutations,
}