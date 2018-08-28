const showNotification = ({ commit }, data) => {
	commit('SHOW_NOTIF', data)
	setTimeout(() => {
		commit('CLOSE_NOTIF')
	}, data.duration)
}

const closeNotification = ({ commit }) => {
	commit('CLOSE_NOTIF')
}

export default {
	showNotification,
	closeNotification,
}