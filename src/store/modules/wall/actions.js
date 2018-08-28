/*
	update both images (file data) and metadata (created / path)
	- is used for both seeding images and updating
*/
export const updateImages = ({ commit, state, rootState }, imagesObj) => {
	let { images, indexImages } = imagesObj

	images = images == null ? rootState.wall.images : [...rootState.wall.images, ...images]
	indexImages = indexImages == null ? rootState.wall.index.images : [...rootState.wall.index.images, ...indexImages]

	commit('UPDATE_IMAGES', { images, indexImages })
}

export default {
	updateImages,
}