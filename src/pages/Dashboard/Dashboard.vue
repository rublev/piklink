<style lang='scss' scoped src='./style.scss' />

<script>

	import { mapState, mapActions } from 'vuex'

	import Navigation from '@/components/Navigation/Navigation'
	import Upload from '@/components/Upload/Upload'
	import Wall from '@/components/Wall/Wall'
	import Loader from '@/components/Loader/Loader'
	import Modal from '@/components/Modal/Modal'

	export default {
		name: 'dashboard',
		components: {
			Navigation,
			Upload,
			Wall,
			Loader,
			Modal,
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
			},
			showModal() {
				console.log('show modal')
			}
		}
	}

</script>

<template>
	<div class='dashboard'>
		<Modal v-if='showModal' ref='modal'>
			<router-view name='rule'/>
		</Modal>
		<transition name='fade-loader'>
			<Loader ref='loader' v-show='loading' />
		</transition>
		<Navigation />
		<Upload />
		<Wall />
	</div>
</template>