import { ReduxStateType } from '../global'

const initialState: ReduxStateType = {
  main: {},
	counts: {
		data: [],
		updated: null,
		countsServerTotal: null,
		pageLength: 10,
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
		coloursets: [
			{
				liveRed: '#db0032',
				red: '#ca6d6d',
				orange: '#ff883a',
				yellow: '#bed800',
				green: '#598d00',
				blue: '#365075',
				purple: '#6e70a8',
				black: '#333333',
				white: '#f3f3f3',
				brown: '#9f9b15',
				teal: '#3db8b5',
				tealGreen: '#03ae99',
				gold: '#f8b018',
			}
		],
		colours: {
			liveRed: '#db0032',
			red: '#ca6d6d',
			orange: '#ff883a',
			yellow: '#bed800',
			green: '#598d00',
			blue: '#365075',
			purple: '#6e70a8',
			black: '#333333',
			white: '#f3f3f3',
			brown: '#9f9b15',
			teal: '#3db8b5',
			tealGreen: '#03ae99',
			gold: '#f8b018',
		}
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
