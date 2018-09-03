import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/pages/Dashboard/Dashboard'
import Home from '@/pages/Home/Home'
import Profile from '@/pages/Profile/Profile'

import ImageDisplay from '@/components/ImageDisplay/ImageDisplay'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home,
		},
		{
			path: '/profile/:user',
			name: 'Profile',
			component: Profile,
			children: [
				{
					path: ':imageId',
					name: 'ProfileImage',
					components: {
						ProfileImageDisplay: ImageDisplay
					},
					meta: {
						showModal: true
					}
				},
			]
		},
		{
			path: '/dashboard',
			name: 'Dashboard',
			component: Dashboard,
			children: [
				{
					path: ':imageId',
					name: 'DashboardImage',
					components: {
						DashboardImageDisplay: ImageDisplay
					},
					meta: {
						showModal: true
					}
				},
			]
		},
	]
})