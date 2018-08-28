import md5 from 'md5'
import * as blockstack from 'blockstack'
import moment from 'moment'

import {
	updateImages,
} from '@/store/modules/wall/actions'

const uploadPhoto = ({ dispatch, state, rootState }, file) => {
	console.log('file', file)
	const filereader = new FileReader()
	filereader.onload = event => {
		const result = event.target.result
		// console.log('result', result)
		const path = 'images/' + md5(result)
		blockstack.putFile(path, result)
			.then(fileUrl => {
				console.log('fileUrl', fileUrl)
				const { index } = rootState.wall
				const created = moment().toISOString()
				const image = result
				const indexImages = [...index.images, { path, created }]
				console.log('indexImages', indexImages)
				const images = [...rootState.wall.images, image]
				blockstack.putFile('index.json', JSON.stringify(index))
					.then(() => {
						console.log('index.json uploaded')
						dispatch('wall/updateImages', { images, indexImages }, { root: true })
					})
					.catch((e) => {
						console.error(e)
					})
			})
			.catch((e) => {
				console.error(e)
			})
	}
	filereader.readAsDataURL(file)
}

const selectPhoto = ({ commit }, event) => {
	commit('SELECT_PHOTO', event.target.files[0])
}

export default {
	uploadPhoto,
	selectPhoto,
}