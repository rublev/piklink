const GET_USER_DATA_AND_PROFILE = (state, payload) => {
	const { data, profile } = payload
	state.data = data
	state.profile = profile
	state.loggedIn = true
}

export default {
	GET_USER_DATA_AND_PROFILE,
}