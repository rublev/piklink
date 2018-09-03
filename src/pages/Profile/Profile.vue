<style lang='scss' scoped src='./style.scss' />

<script>

	import { mapState, mapActions } from 'vuex'

	import Navigation from '@/components/Navigation/Navigation'
	import PublicWall from '@/components/PublicWall/PublicWall'
	import Loader from '@/components/Loader/Loader'
	import Modal from '@/components/Modal/Modal'

	export default {
		name: 'profile',
		components: {
			Navigation,
			PublicWall,
			Loader,
			Modal,
		},
		data: () => ({
			showModal: null
		}),
		mounted () {
			this.showModal = this.$route.meta.showModal
			const username = `${this.$route.params.user}.id.blockstack`
			const { imageId } = this.$route.params
			this.setupPublicUser({ username, imageId })
		},
		watch: {
			'$route.meta'({ showModal }) {
				this.showModal = showModal
			}
		},
		computed: {
			...mapState({
				loading: state => state.user.loading,
			}),
		},
		methods: {
			...mapActions({
				setupPublicUser: 'public/setupPublicUser',
			}),
		}
	}

</script>

<template>
	<div class='profile'>
		<Modal v-if='showModal' ref='modal'>
			<router-view name='ProfileImageDisplay'/>
		</Modal>
		<transition name='fade-loader'>
			<Loader ref='loader' v-show='loading' />
		</transition>
		<Navigation />
		<PublicWall />
	</div>
</template>