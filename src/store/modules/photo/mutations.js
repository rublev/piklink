const SELECT_PHOTO = (state, file) => {
	state.file = file
}

const ADD_IMAGE = (state, payload) => {
	console.log('ADD_IMAGE', payload)
	const { path, created } = payload
	state.index.images = [...state.images, { path, created }]
}

const UPLOAD_IMAGE = (state, payload) => {
	const { indexImages, images } = payload
	state.index.images = indexImages
	state.images = images
}

export default {
	SELECT_PHOTO,
	ADD_IMAGE,
	UPLOAD_IMAGE,
}