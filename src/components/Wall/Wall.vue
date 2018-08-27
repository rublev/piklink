<style lang='scss' scoped src='./style.scss' />

<script>

	export default {
		name: 'wall',
		data: () => ({
			blockstack: window.blockstack,
			userData: null,
			loggedIn: false,
			aesKey: null,
			jsonIndex: null,
			images: null,
		}),
		mounted () {
			const blockstack = this.blockstack
			if (blockstack.isSignInPending()) {
				blockstack.handlePendingSignIn().then(data=> {
					console.dir(data)
					this.setupUser()
					this.setupKey()
					this.$router.push('/')
				})
			} else if (blockstack.isUserSignedIn()) {
				console.log('signed in')
				this.setupUser().then(() => {
					// this.loadAESKey()
				})
			}
		},
		methods: {
			loadAESKey() {
				const blockstack = this.blockstack

				blockstack.getFile(`keys/${this.userData.username}`)
					.then(data => {
						const encryptedKey = JSON.parse(data)
						const decryptedKey = decryptECIES(blockstack.loadUserData().appPrivateKey, encryptedKey)
						this.aesKey = decryptedKey
					})
			},
			setupUser() {
				const blockstack = this.blockstack

				const userData = blockstack.loadUserData();
				this.userData = userData
				this.loggedIn = true

				return blockstack.getFile('index.json').then(data => {
					console.log('data 0', data)
					if (data && !(data instanceof ArrayBuffer)) {
						console.log('data 1', data)
						const indexJson = JSON.parse(data) || { 'images': [] };
						this.jsonIndex = indexJson
					}
				})
					.then(() => {
						console.log('NEXT', this.jsonIndex)
						// const promises = this.jsonIndex.images.map(image => {
						// 	return this.fetchFile(image.path)
						// })
						// return Promise.all(this.jsonIndex.images.map(image => {
						// 	return this.fetchFile(image.path)
						// }))
					})
					// .then(images => {
					// 	this.images = images
					// })
					// .catch(e => {
					// 	console.error(e)
					// })
			},
			setupKey() {
				const aesKey = SimpleCryptoJS.generateRandom()
				const publicKey = getPublicKeyFromPrivate(blockstack.loadUserData().appPrivateKey)
				return blockstack.putFile('key.json', JSON.stringify(publicKey))
					.then(() => {
						console.log('public key saved');
						console.log(JSON.stringify(publicKey))
					})
					.then(() => {
						const encryptedAesKey = encryptECIES(publicKey, aesKey)
						const username = this.userData.username
						return blockstack.putFile(`keys/${username}`, JSON.stringify(encryptedAesKey))
					})
					.then(() => {
						this.setState({ aesKey })
					})
					.catch(e => {
						console.log(e);
					});

			}
		}
	}

</script>

<template>
	<div class='wall'>
		wall
	</div>
</template>