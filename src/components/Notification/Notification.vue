<style lang='scss' scoped src='./style.scss' />

<script>

	import { mapState, mapActions } from 'vuex'

	export default {
		name: 'notification',
		methods: {
			...mapActions({
				closeNotification: 'notifications/closeNotification'
			}),
		},
		computed: mapState({
			'show': state => state.notifications.show,
			'type': state => state.notifications.type,
			'message': state => state.notifications.message,
			'duration': state => state.notifications.duration,
		}),
	}
</script>

<template>
	<div :class='{ notification: true, show, [type]: type }'>
		<div class='badge'>
			{{ type }}
		</div>
		<p v-html='message' />
		<div class='close' @click='closeNotification()'>
			<ion-icon class='icon' name='close' />
		</div>
	</div>
</template>