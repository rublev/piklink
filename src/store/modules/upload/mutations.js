const RESET_IMAGES = (state) => {
	state.images = []
	state.index = { images: [] }
}

const SET_IMAGE = (state, payload) => {
	const { file, name } = payload
	state.file = file
	state.fileName = name
}

export default {
	SET_IMAGE,
	RESET_IMAGES,
}