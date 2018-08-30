export const updateImages = ({ commit, state, rootState }, images) => {
	commit('UPDATE_IMAGES', images)
}

export const updateAllImages = ({ commit }, imagesObj) => {
	commit('UPDATE_ALL_IMAGES', imagesObj)
}

export default {
	updateImages,
	updateAllImages,
}