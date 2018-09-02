const UPDATE_IMAGES = (state, images) => {
	state.images = images
}

const RESET_IMAGES = state => {
	state.images = []
}

export default {
	UPDATE_IMAGES,
	RESET_IMAGES,
}