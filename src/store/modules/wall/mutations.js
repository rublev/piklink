const UPDATE_IMAGES = (state, payload) => {
	console.log('payload', payload)
	state.images = payload.images
}

const UPDATE_ALL_IMAGES = (state, payload) => {
	const { index, images } = payload
	state.index = index
	state.images = images
}

export default {
	UPDATE_IMAGES,
	UPDATE_ALL_IMAGES,
}