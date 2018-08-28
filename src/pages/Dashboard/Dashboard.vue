<style lang='scss' scoped src='./style.scss' />

<script>

	import { mapState, mapActions } from 'vuex'

	import Navigation from '@/components/Navigation/Navigation'
	import Upload from '@/components/Upload/Upload'
	import Wall from '@/components/Wall/Wall'

	export default {
		name: 'dashboard',
		components: {
			Navigation,
			Upload,
			Wall,
		},
		data: () => ({
			blockstack: window.blockstack,
			user: null,
			userData: null
		}),
		mounted () {
			const blockstack = this.blockstack
			// if (blockstack.isUserSignedIn()) {
			// 	this.userData = blockstack.loadUserData()
			// 	console.log('dashboard 1 userData', this.userData)
			// 	this.user = new blockstack.Person(this.userData.profile)
			// 	this.user.username = this.userData.username
			// } else if (blockstack.isSignInPending()) {
			// 	blockstack.handlePendingSignIn()
			// 		.then((userData) => {
			// 			console.log('dashboard 2 userData', userData)
			// 			window.location = window.location.origin
			// 		})
			// } else {
			// 	window.location = window.location.origin
			// }
		},
		mounted() {
			const blockstack = this.blockstack
			// if (blockstack.isSignInPending()) {
			// 	blockstack.handlePendingSignIn().then(data => {
			// 		console.dir(data)
			// 		this.setupUser()
			// 		this.setupKey()
			// 		this.setupSubscriber()
			// 		window.history.pushState(null, null, '/')
			// 	})
			// } else if (blockstack.isUserSignedIn()) {
			// 	console.log('Signed In')
			// 	this.setupUser().then(() => {
			// 		this.setupSubscriber()
			// 		this.loadAESKey()
			// 	})
			// }
		},
		methods: {
			...mapActions({
				setupUser: 'user/setupUser',
				setupKey: 'user/setupKey',
				setupSubscriber: 'user/setupSubscriber',
				loadAESKey: 'user/loadAESKey',
			}),
			signOut () {
				this.blockstack.signUserOut(window.location.origin)
			}
		}
	}

</script>

<template>
	<div class='dashboard' v-if='user' v-bind:style='{ height: "1000px" }'>
		<Navigation :user='user' />
		<Upload />
		<Wall />
	</div>
</template>