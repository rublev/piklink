import * as blockstack from 'blockstack'
import { encryptECIES, decryptECIES } from 'blockstack/lib/encryption'
import { delay } from '@/utils'

const fetchFile = path => {
	return blockstack.getFile(path)
}

export const loading = ({ commit }, loadingState) => {
	commit('LOADING', loadingState)
}

export const setupUser = async ({ commit, dispatch }) => {
	dispatch('loading', true)
	await delay(1000)
	const data = blockstack.loadUserData()
	const profile = new blockstack.Person(data.profile)

	commit('GET_USER_DATA_AND_PROFILE', { data, profile })

	const index = await blockstack.getFile('index.json')
		.then(images => JSON.parse(images) || { images: [] })

	const images = await Promise.all(index.images.map(async (image) => {
		return await fetchFile(image.path)
	}))

	dispatch('wall/updateAllImages', { index, images }, { root: true })
	dispatch('loading', false)
}

export default {
	setupUser,
	loading,
}