import actions from './actions'
import mutations from './mutations'

const state = {
	// show: true,
	// type: 'error',
	// message: 'Some kind of message.',
	show: false,
	type: '',
	message: '',
	duration: 5000,
}

export default {
	namespaced: true,
	state,
	actions,
	mutations,
}