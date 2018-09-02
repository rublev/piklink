export const updateImages = ({ commit }, images) => {
	commit('UPDATE_IMAGES', images)
}

export default {
	updateImages,
}