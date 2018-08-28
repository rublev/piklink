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
		}),
		mounted() {
			const blockstack = this.blockstack
			if (blockstack.isSignInPending()) {
				blockstack.handlePendingSignIn().then(data => {
					this.setupUser()
					this.$router.push('/')
				})
			} else if (blockstack.isUserSignedIn()) {
				this.setupUser()
			} else {
				this.$router.push('/')
			}
		},
		methods: {
			...mapActions({
				setupUser: 'user/setupUser',
			}),
			signOut () {
				this.blockstack.signUserOut(window.location.origin)
			}
		}
	}

</script>

<template>
	<div class='dashboard' v-bind:style='{ height: "1000px" }'>
		<Navigation />
		<Upload />
		<!-- <Wall /> -->
	</div>
</template>