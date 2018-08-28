const showModal = ({ commit }, modalName) => {
	commit('SHOW_MODAL', modalName)
}

const hideModal = ({ commit }) => {
	commit('HIDE_MODAL')
}

export default {
	showModal,
	hideModal,
}