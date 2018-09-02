export const updateAllImages = ({ commit }, imagesObj) => {
	commit('UPDATE_ALL_IMAGES', imagesObj)
}

export default {
	updateAllImages,
}