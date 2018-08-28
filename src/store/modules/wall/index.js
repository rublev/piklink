import actions from './actions'
import mutations from './mutations'

const state = {
	index: {
		images: []
	},
	images: [],
}

export default {
	namespaced: true,
	state,
	actions,
	mutations,
}