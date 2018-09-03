const UPDATE_IMAGES = (state, images) => {
	state.images = images
}

const RESET_IMAGES = state => {
	state.images = []
}

const SELECT_IMAGE_FOR_MODAL = (state, image) => {
	state.modalImage = image
}

export default {
	UPDATE_IMAGES,
	RESET_IMAGES,
	SELECT_IMAGE_FOR_MODAL,
}