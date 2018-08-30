const UPDATE_IMAGES = (state, payload) => {
	console.log('payload', payload)
	state.images = payload.images
}

const UPDATE_ALL_IMAGES = (state, payload) => {
	const { index, images } = payload
	state.index = index
	state.images = images
}

const RESET_IMAGES = state => {
	state.index.images = []
	state.images = []
}

export default {
	UPDATE_IMAGES,
	UPDATE_ALL_IMAGES,
	RESET_IMAGES,
}