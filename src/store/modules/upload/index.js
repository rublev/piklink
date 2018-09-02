import actions from './actions'
import mutations from './mutations'

const state = {
	image: null,
	imageName: null
}

export default {
	namespaced: true,
	state,
	actions,
	mutations,
}