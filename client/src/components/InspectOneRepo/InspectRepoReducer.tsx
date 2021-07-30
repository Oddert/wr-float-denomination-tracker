
import {
	InspectRepoActionTypes,
	InspectRepoInitialStateT,
	InspectRepoAction,
} from './Utils'

const InspectRepoReducer = (state: InspectRepoInitialStateT, action: InspectRepoAction) => {
	switch (action.type) {
		case InspectRepoActionTypes.REPO_SET: return reduceRepoSet(state, action)
		case InspectRepoActionTypes.START_DATE_SET: return reduceStartDateSet(state, action)
		case InspectRepoActionTypes.END_DATE_SET: return reduceEndDateSet(state, action)
		case InspectRepoActionTypes.USE_ADJUSTMENTS_SET: return reduceAdjustmentUseSet(state, action)
		default: return state
	}
}

function reduceRepoSet (state: InspectRepoInitialStateT, action: InspectRepoAction): InspectRepoInitialStateT {
	return {
		...state,
		repo: action.payload
	}
}

function reduceStartDateSet (state: InspectRepoInitialStateT, action: InspectRepoAction): InspectRepoInitialStateT {
	return {
		...state,
		startTime: action.payload
	}
}

function reduceEndDateSet (state: InspectRepoInitialStateT, action: InspectRepoAction): InspectRepoInitialStateT {
	return {
		...state,
		endTime: action.payload
	}
}

function reduceAdjustmentUseSet (state: InspectRepoInitialStateT, action: InspectRepoAction): InspectRepoInitialStateT {
	return {
		...state,
		useAdjustments: action.payload
	}
}

export default InspectRepoReducer