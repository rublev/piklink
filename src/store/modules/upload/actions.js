import md5 from 'md5'
import * as blockstack from 'blockstack'
import moment from 'moment'
import { delay } from '@/utils'

const uploadImage = async ({ dispatch, rootState }, image) => {
	dispatch('user/loading', true, { root: true })
	await delay(1000)
	const path = 'images/' + md5(image)
	try {
		await blockstack.putFile(path, image) // Can omit this declaration cuz i dont think fileUrl is used.
		const created = moment().toISOString()
		const rootStateIndex = _.cloneDeep(rootState.wall.index);
		const index =  {
			...rootStateIndex,
			images: [{ path, created }, ...rootStateIndex.images]
		}
		const images = [image, ...rootState.wall.images]
		await blockstack.putFile('index.json', JSON.stringify(index))
		dispatch('wall/updateAllImages', { index, images }, { root: true })
		dispatch('user/loading', false, { root: true })
	} catch(e) {
		console.error(e)
	}
}

const resetImages = async ({ dispatch }) => {
	await blockstack.putFile('index.json', JSON.stringify(null))
	dispatch('user/setupUser', {}, { root: true })
}

export default {
	uploadImage,
	resetImages,
}