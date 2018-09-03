import actions from './actions'
import mutations from './mutations'

const state = {
	images: [],
	modalImage: null
}

export default {
	namespaced: true,
	state,
	actions,
	mutations,
}