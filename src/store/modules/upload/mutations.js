const RESET_IMAGES = (state) => {
	state.images = []
	state.index = { images: [] }
}

const SET_IMAGE = (state, payload) => {
	const { image, name } = payload
	state.image = image
	state.imageName = name
}

const CANCEL_IMAGE = (state) => {
	state.image = null
	state.imageName = null
}

export default {
	SET_IMAGE,
	RESET_IMAGES,
	CANCEL_IMAGE,
}