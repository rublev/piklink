const SHOW_NOTIF = (state, notifOptions) => {
	state = Object.assign(state, notifOptions)
}

const CLOSE_NOTIF = (state) => {
	state = Object.assign(state, {
		show: false,
		type: '',
		message: '',
		duration: 5000,
	})
}

export default {
	SHOW_NOTIF,
	CLOSE_NOTIF,
}