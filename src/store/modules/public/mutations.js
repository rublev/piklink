const GET_PUBLIC_USERNAME = (state, username) => {
	state.username = username
}

const GET_PUBLIC_DATA = (state, data) => {
	const { username, name, avatar } = data
	state.username = username
	state.name = name
	state.avatar = avatar
}

export default {
	GET_PUBLIC_USERNAME,
	GET_PUBLIC_DATA,
}