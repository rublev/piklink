const SEED_IMAGES = (state, payload) => {
	const { images } = payload
	state.index.images = images
}

const UPDATE_IMAGES = (state, payload) => {
	state.images = payload.images
	state.index.images = payload.indexImages
}

export default {
	SEED_IMAGES,
	UPDATE_IMAGES,
}