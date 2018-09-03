<style lang='scss' scoped src='./style.scss' />

<script>

	import { mapState, mapActions } from 'vuex'

	import Navigation from '@/components/Navigation/Navigation'
	import Wall from '@/components/Wall/Wall'
	import Loader from '@/components/Loader/Loader'
	import Modal from '@/components/Modal/Modal'

	export default {
		name: 'profile',
		components: {
			Navigation,
			Wall,
			Loader,
			Modal,
		},
		data: () => ({
			showModal: null
		}),
		mounted () {
			this.showModal = this.$route.meta.showModal
			const { blockstack, loggedIn } = this
			const username = this.$route.params.user
			const { imageId } = this.$route.params
			this.getPublicProfile(username)
			if (!loggedIn) {
				if (blockstack.isSignInPending()) {
					blockstack.handlePendingSignIn().then(data => {
						this.$router.push('/')
					})
				} else if (blockstack.isUserSignedIn()) {
					this.setupUser(this.$route.params.id)
				}
				this.setupPublicUser({ username, imageId })
			}
		},
		watch: {
			'$route.meta'({ showModal }) {
				this.showModal = showModal
			}
		},
		computed: {
			...mapState({
				loading: state => state.user.loading,
				loggedIn: state => state.user.loggedIn,
			}),
		},
		methods: {
			...mapActions({
				setupPublicUser: 'public/setupPublicUser',
				setupUser: 'user/setupUser',
				getPublicProfile: 'public/getPublicProfile',
			}),
		}
	}

</script>

<template>
	<div class='profile'>
		<Modal v-if='showModal' ref='profile-modal'>
			<router-view name='ProfileImageDisplay'/>
		</Modal>
		<transition name='fade-loader'>
			<Loader ref='loader' v-show='loading' />
		</transition>
		<Navigation />
		<Wall />
	</div>
</template>