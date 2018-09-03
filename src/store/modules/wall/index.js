import actions from './actions'
import mutations from './mutations'

const state = {
	images: [],
	modalImage: {
		data: [],
		id: null,
		path: null,
		created: null,
	}
}

export default {
	namespaced: true,
	state,
	actions,
	mutations,
}