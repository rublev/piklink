import md5 from 'md5'
import * as blockstack from 'blockstack'
import moment from 'moment'
import { delay, uuidv4 } from '@/utils'

import {
	URL_PREFIX
} from '@/constants.js'

export const setupPublicUser = async ({ commit, dispatch }, userData) => {
	const { username, imageId } = userData
	dispatch('setPublicUsername', username)
	dispatch('user/loading', true, { root: true })
	await delay(1000)
	const options = {
	  username,
	  app: `${URL_PREFIX}`,
	  decrypt: false,
	}
	await blockstack.getFile('index.json', options).then(res => {
		const images = JSON.parse(res) || []
		dispatch('wall/updateImages', images, { root: true })
	})
	if (imageId) dispatch('wall/fetchImage', imageId, { root: true })
	dispatch('user/loading', false, { root: true })
}

export const setPublicUsername = async ({ commit }, username) => {
	commit('GET_PUBLIC_USERNAME', username)
}

export const getPublicProfile = async ({ commit }, username) => {
	blockstack.lookupProfile(username).then(res => {
		const avatar = res.image[0].contentUrl
		const name = res.name
		return { username, name, avatar }
	}).then(res => {
		commit('GET_PUBLIC_DATA', res)
	})
}

export default {
	setupPublicUser,
	setPublicUsername,
	getPublicProfile,
}