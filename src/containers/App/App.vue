<script>

	import '@/svg'
	import 'normalize.css'
	import './styles/style.scss' // unscoped because it needs to style globally

	export default {
		name: 'app',
	}

</script>

<template>
	<div id='app' class='app'>
		<router-view />
	</div>
</template>