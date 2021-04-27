const initialState = {
  main: {},
	counts: {
		data: [],
		updated: null,
		countsServerTotal: null,
		pageLength: 3,
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
	auth: {
		userList: [],
		userListUpdated: null,
		partnerList: [],
		partnerListUpdated: null,
	},
	repositories: {
		repositoryList: [],
		repositoryListUpdated: null,
		repositoryServerTotal: null,
	}
}

export default initialState
