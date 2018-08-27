import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/pages/Dashboard/Dashboard'
import Home from '@/pages/Home/Home'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/dashboard',
			name: 'Dashboard',
			component: Dashboard,
		},
		{
			path: '/',
			name: 'Home',
			component: Home,
		}
	]
})