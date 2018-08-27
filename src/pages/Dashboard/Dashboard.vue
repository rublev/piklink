<style lang='scss' scoped src='./style.scss' />

<script>

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
			if (blockstack.isUserSignedIn()) {
				this.userData = blockstack.loadUserData()
				// console.log('dashboard 1 userData', this.userData)
				this.user = new blockstack.Person(this.userData.profile)
				this.user.username = this.userData.username
			} else if (blockstack.isSignInPending()) {
				blockstack.handlePendingSignIn()
					.then((userData) => {
						// console.log('dashboard 2 userData', userData)
						window.location = window.location.origin
					})
			} else {
				window.location = window.location.origin
			}
		},
		methods: {
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