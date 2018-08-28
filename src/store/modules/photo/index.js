import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
	index: {
		images: []
	},
	images: [],
	file: null
};

export default {
	namespaced: true,
	state,
	actions,
	getters,
	mutations,
}