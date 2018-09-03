import md5 from 'md5'
import * as blockstack from 'blockstack'
import moment from 'moment'
import { delay, uuidv4 } from '@/utils'

import {
	URL_PREFIX
} from '@/constants.js'

export const setupPublicUser = async ({ dispatch }, userData) => {
	const { username, imageId } = userData
	console.log('userData', userData)
	dispatch('user/loading', true, { root: true })
	await delay(1000)
	const options = {
	  user: username,
	  app: `${URL_PREFIX}`
	}
	await blockstack.getFile('index.json', options)
		.then(res => {
			const images = JSON.parse(res) || []
			dispatch('wall/updateImages', images, { root: true })
		})
	if (imageId) dispatch('wall/fetchImage', imageId, { root: true })
	dispatch('user/loading', false, { root: true })
}


export default {
	setupPublicUser,
}