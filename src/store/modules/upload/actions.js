import md5 from 'md5'
import * as blockstack from 'blockstack'
import moment from 'moment'

const uploadPhoto = async ({ dispatch, state, rootState }, file) => {
	const reader = new FileReader()
	reader.readAsDataURL(file)
	reader.onload = async () => {
		const result = reader.result
		const path = 'images/' + md5(result)
		try {
			await blockstack.putFile(path, result) // Can omit this declaration cuz i dont think fileUrl is used.
			const created = moment().toISOString()
			const rootStateIndex = _.cloneDeep(rootState.wall.index);
			const index =  {
				...rootStateIndex,
				images: [...rootStateIndex.images, { path, created }]
			}
			const images = [...rootState.wall.images, result]
			await blockstack.putFile('index.json', JSON.stringify(index))
			dispatch('wall/updateAllImages', { index, images }, { root: true })
		} catch(e) {
			console.error(e)
		}
	}
	reader.onerror = (error) => {
		console.log('uploadPhoto() error: ', error)
	}
}

const selectPhoto = ({ commit }, event) => {
	commit('SELECT_PHOTO', event.target.files[0])
}

const resetPhotos = async ({ commit }) => {
	await blockstack.putFile('index.json', JSON.stringify(null))
	window.location.reload()
}

export default {
	uploadPhoto,
	selectPhoto,
	resetPhotos,
}