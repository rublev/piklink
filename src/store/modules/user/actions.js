import * as blockstack from 'blockstack'
import { encryptECIES, decryptECIES } from 'blockstack/lib/encryption'
import { delay } from '@/utils'

export const loading = ({ commit }, loadingState) => {
	commit('LOADING', loadingState)
}

export const setupUser = async ({ commit, dispatch }, imageId) => {
	dispatch('loading', true)
	await delay(1000)
	const data = blockstack.loadUserData()
	const profile = new blockstack.Person(data.profile)
	commit('GET_USER_DATA_AND_PROFILE', { data, profile })
	const images = await blockstack.getFile('index.json', { decrypt: false })
		.then(images => {
			console.log(JSON.parse(images) || { images: [] })
			return JSON.parse(images) || { images: [] }
		})
	await dispatch('wall/updateImages', images, { root: true })
	if (imageId) dispatch('wall/fetchImage', imageId, { root: true })
	dispatch('loading', false)
}

export default {
	setupUser,
	loading,
}