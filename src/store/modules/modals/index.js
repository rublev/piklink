import actions from './actions';
import mutations from './mutations';

const state = {
	modalVisible: false,
	modalComponent: null,
};

export default {
	namespaced: true,
	state,
	actions,
	mutations,
}