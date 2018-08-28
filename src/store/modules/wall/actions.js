/*
	update both images (file data) and metadata (created / path)
	- is used for both seeding images and updating
*/
export const updateImages = ({ commit }, images) => {
	commit('UPDATE_IMAGES', images)
}

export default {
	updateImages,
}