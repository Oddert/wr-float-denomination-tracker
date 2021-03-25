const initialState = {
  main: {},
	counts: {
		data: [],
		updated: null,
	},
	ui: {
		flash: [
			{
				title: 'Default Flash',
				description: 'Here is a flash that will last 20 seconds',
				createdAt: Date.now(),
				duration: 5000,
				catt: 'info',
				id: Date.now() + '_528491'
			}
		],
	},
}

export default initialState
