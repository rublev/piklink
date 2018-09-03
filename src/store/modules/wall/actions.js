export const updateImages = ({ commit }, images) => {
	commit('UPDATE_IMAGES', images)
}

export const fetchImage = ({ state, commit }, id) => {
	const image = _.find(state.images, obj => {
		return obj.id == id
	})
	commit('SELECT_IMAGE_FOR_MODAL', image.data)
}

export default {
	updateImages,
	fetchImage,
}