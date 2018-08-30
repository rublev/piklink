import md5 from 'md5'
import * as blockstack from 'blockstack'
import moment from 'moment'

const uploadImage = async ({ dispatch, rootState }, image) => {
	const path = 'images/' + md5(image)
	try {
		await blockstack.putFile(path, image) // Can omit this declaration cuz i dont think fileUrl is used.
		const created = moment().toISOString()
		const rootStateIndex = _.cloneDeep(rootState.wall.index);
		const index =  {
			...rootStateIndex,
			images: [...rootStateIndex.images, { path, created }]
		}
		const images = [...rootState.wall.images, image]
		await blockstack.putFile('index.json', JSON.stringify(index))
		dispatch('wall/updateAllImages', { index, images }, { root: true })
	} catch(e) {
		console.error(e)
	}
}

const resetImages = async ({ commit }) => {
	await blockstack.putFile('index.json', JSON.stringify(null))
	commit('RESET_IMAGES')
}

export default {
	uploadImage,
	resetImages,
}