const SHOW_MODAL = (state, componentName) => {
	state = Object.assign(state, {
		modalVisible: true,
		modalComponent: componentName,
	})
}

const HIDE_MODAL = (state) => {
	state = Object.assign(state, {
		modalVisible: false,
		modalComponent: null,
	})
}

export default {
	SHOW_MODAL,
	HIDE_MODAL,
}