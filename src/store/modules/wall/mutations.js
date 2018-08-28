const SEED_IMAGES = (state, payload) => {
	const { images } = payload
	state.index.images = images
}

const UPDATE_IMAGES = (state, payload) => {
	const { images, indexImages } = payload
	!images ? null : state.images = [...state.images, ...images]
	!indexImages ? null : state.index.images = [...state.index.images, ...indexImages.images]
}

export default {
	SEED_IMAGES,
	UPDATE_IMAGES,
}