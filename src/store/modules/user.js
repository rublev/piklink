import Vue from 'vue'

// import {
// } from '@/store/types';

const state = {
	userData: null,
	loggedIn: false,
	index: {
		images: []
	},
	images: [],
	image: [],
	imageFeed: [],
	subscribers: [],
	aesKey: null,
	tab: 'my',
	isLoading: false
};

const mutations = {

	// [TYPE] (state, payload) {
	// 	state.property = payload
	// },

};

export default {
	state,
	mutations,
};
