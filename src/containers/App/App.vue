<script>

	import Notification from '@/components/Notification/Notification'

	import '@/svg'
	import 'normalize.css'
	import './styles/style.scss' // unscoped because it needs to style globally

	export default {
		name: 'app',
		components: {
			Notification,
		}
	}

</script>

<template>
	<div id='app' class='app'>
		<Notification />
		<router-view />
	</div>
</template>