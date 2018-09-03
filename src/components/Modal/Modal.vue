<style lang='scss' scoped src='./style.scss' />

<script>

	import { mapState } from 'vuex'

	export default {
		name: 'modal',
		computed: {
			...mapState({
				publicUsername: state => state.public.username,
			})
		},
		methods: {
			handleClose() {
				this.$router.push(`/profile/${this.publicUsername}`)
			}
		},
	}

</script>

<template>
	<transition name='modal-fade'>
		<div class='modal'>
			<div class='inner'>
				<button class='close-button' @click='handleClose'>x</button>
				<slot></slot>
			</div>
		</div>
	</transition>
</template>