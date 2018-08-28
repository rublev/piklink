const USER_DETAILS = (state, payload) => {
	const { userData, profile } = payload
	state.userData = userData
	state.profile = profile
	state.loggedIn = true
}

export default {
	USER_DETAILS,
}