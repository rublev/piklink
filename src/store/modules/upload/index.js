import actions from './actions'
import mutations from './mutations'

const state = {
	file: null,
	fileName: null
}

export default {
	namespaced: true,
	state,
	actions,
	mutations,
}