<style lang='scss' scoped src='./style.scss' />

<script>

	import { mapState, mapActions } from 'vuex'

	import Navigation from '@/components/Navigation/Navigation'
	import Upload from '@/components/Upload/Upload'
	import Wall from '@/components/Wall/Wall'
	import Loader from '@/components/Loader/Loader'

	export default {
		name: 'dashboard',
		components: {
			Navigation,
			Upload,
			Wall,
			Loader,
		},
		mounted() {
			const blockstack = this.blockstack
			if (blockstack.isSignInPending()) {
				blockstack.handlePendingSignIn().then(data => {
					this.$router.push('/')
				})
			} else if (blockstack.isUserSignedIn()) {
				this.setupUser()
			} else {
				this.$router.push('/')
			}
		},
		computed: {
			...mapState({
				loading: state => state.user.loading,
			}),
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
	<div class='dashboard'>
		<transition name='fade1'>
			<Loader ref='loader' v-show='loading' />
		</transition>
		<Navigation />
		<Upload />
		<Wall />
	</div>
</template>