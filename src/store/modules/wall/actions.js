/*
	update both images (file data) and metadata (created / path)
	- is used for both seeding images and updating
*/
export const updateImages = ({ commit }, imagesObj) => {
	let { images, indexImages } = imagesObj
	images = images == null ? [] : images
	indexImages = indexImages == null ? [] : indexImages
	commit('UPDATE_IMAGES', { images, indexImages })
}

export default {
	updateImages,
}