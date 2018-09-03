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
		data: () => ({
			showModal: null,
			publicUsername: null,
		}),
		async mounted() {
			this.showModal = this.$route.meta.showModal
			const { blockstack, loggedIn } = this
			const username = this.$route.params.user
			const { imageId } = this.$route.params
			if (!loggedIn) {
				if (blockstack.isSignInPending()) {
					blockstack.handlePendingSignIn().then(data => {
						this.$router.push('/')
					})
				} else if (blockstack.isUserSignedIn()) {
					await this.setupUser(this.$route.params.id)
					this.setPublicUsername(this.publicUsername)
				} else {
					this.$router.push('/')
				}
			}
		},
		watch: {
			'$route.meta'({ showModal }) {
				this.showModal = showModal
			},
			userData() {
				this.publicUsername = this.userData.username
			}
		},
		computed: {
			...mapState({
				loading: state => state.user.loading,
				userData: state => state.user.data,
				loggedIn: state => state.user.loggedIn,
			}),
		},
		methods: {
			...mapActions({
				setupUser: 'user/setupUser',
				setPublicUsername: 'public/setPublicUsername',
			}),
		}
	}

</script>

<template>
	<div class='dashboard'>
		<Modal v-if='showModal' ref='dashboard-modal'>
			<router-view name='DashboardImageDisplay'/>
		</Modal>
		<transition name='fade-loader'>
			<Loader ref='loader' v-show='loading' />
		</transition>
		<Navigation />
		<Upload />
		<Wall />
	</div>
</template>