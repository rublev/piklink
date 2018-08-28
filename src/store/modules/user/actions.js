import * as blockstack from 'blockstack'
import { encryptECIES, decryptECIES } from 'blockstack/lib/encryption'

const fetchFile = path => {
	return blockstack.getFile(path)
}

const setupUser = ({ commit, rootState, dispatch }, file) => {
	const userData = blockstack.loadUserData()
	const username = userData.username
	let profile = new blockstack.Person(userData.profile)
	profile['username'] = username
	commit('USER_DETAILS', { userData, profile })
	return blockstack.getFile('index.json').then(data => {
		if (data && !(data instanceof ArrayBuffer)) {
			const indexImages = JSON.parse(data) || { images: [] }
			dispatch('wall/updateImages', { indexImages: indexImages.images }, { root: true })
		}
	})
		.then(() => {
			const promises = rootState.wall.index.images.map(image => {
				return fetchFile(image.path)
			})
			return Promise.all(promises)
		})
		.then(images => {
			dispatch('wall/updateImages', { images }, { root: true })
		})
		.catch((e) => {
			console.error(e)
		})
}

export default {
	setupUser,
}