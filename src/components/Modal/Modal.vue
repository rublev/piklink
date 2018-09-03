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
				console.log('wat')
				this.$router.push(`/profile/${this.publicUsername}`)
			}
		},
	}

</script>

<template>
	<transition name='modal-fade'>
		<div class='modal'>
			<div class='inner'>
				<button class='blank color-gray' @click='handleClose'>
					close
				</button>
				<slot></slot>
			</div>
		</div>
	</transition>
</template>