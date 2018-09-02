import md5 from 'md5'
import * as blockstack from 'blockstack'
import moment from 'moment'
import { delay } from '@/utils'

const getBase64 = file => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result)
		reader.onerror = error => reject(error)
	})
}

export const dropImage = ({ dispatch }, event) => {
	const image = event.dataTransfer.items[0].getAsFile()
	const name = image.name
	if (image) dispatch('setImage', { image, name, type: 'drop' })
}

export const onPaste = async ({ dispatch }, event) => {
	const item = (event.clipboardData  || event.originalEvent.clipboardData).items
	const image = item[0].type.indexOf('image') === 0 ? item[0].getAsFile() : null
	if (image) dispatch('setImage', { image, name: 'pasted image', type: 'paste' })
}

export const uploadImage = async ({ dispatch, rootState }, image) => {
	dispatch('user/loading', true, { root: true })
	await delay(1000)
	dispatch('cancelImage')
	const path = 'images/' + md5(image)
	try {
		await blockstack.putFile(path, image) // Can omit this declaration cuz i dont think fileUrl is used.
		const created = moment().toISOString()
		const rootStateIndex = _.cloneDeep(rootState.wall.index)
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

export const resetAccountImages = async ({ dispatch }) => {
	dispatch('user/loading', {}, { root: true })
	await delay(500)
	await blockstack.putFile('index.json', JSON.stringify(null))
	dispatch('cancelImage', { root: true })
	dispatch('user/setupUser', {}, { root: true })
}

export const cancelImage = ({ commit }) => {
	commit('CANCEL_IMAGE')
}

export const setImage = async ({ commit, dispatch }, data) => {
	console.log('data.type', data.type)
	let image = null
	let name = null
	switch(data.type) {
		case 'paste':
		case 'drop':
			image = data.image
			name = data.name
			break
		default:
			image = data.target.files[0]
			name = image.name
	}
	const fileBase64 = await getBase64(image)
	dispatch('notifications/showNotification', {
		show: true,
		type: 'success',
		message: `<b>${name}</b> selected!`,
		duration: 5000
	}, { root: true })
	commit('SET_IMAGE', { image: fileBase64, name })
}

export default {
	uploadImage,
	resetAccountImages,
	cancelImage,
	setImage,
	onPaste,
	dropImage,
}