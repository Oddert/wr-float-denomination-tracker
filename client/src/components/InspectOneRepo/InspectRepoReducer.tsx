
import {
	InspectRepoActionTypes,
	InspectRepoInitialStateT,
	InspectRepoAction,
} from './types'

const InspectRepoReducer = (state: InspectRepoInitialStateT, action: InspectRepoAction) => {
	// console.log(action)
	switch (action.type) {
		case InspectRepoActionTypes.REPO_SET: return reduceRepoSet(state, action)
		case InspectRepoActionTypes.START_DATE_SET: return reduceStartDateSet(state, action)
		case InspectRepoActionTypes.END_DATE_SET: return reduceEndDateSet(state, action)
		case InspectRepoActionTypes.ADJUSTMENTS_USE_SET: return reduceAdjustmentUseSet(state, action)
		case InspectRepoActionTypes.ADJUSTMENT_STEP_SIZE_SET: return reduceAdjustmentStepSizeSet(state, action)
		case InspectRepoActionTypes.INSPECTING_SET: return reduceInspectingSet(state, action)
		case InspectRepoActionTypes.INSPECTING_CLEAR: return reduceInspectingClear(state)
		case InspectRepoActionTypes.DATA_SET: return reduceDataSet(state, action)
		case InspectRepoActionTypes.PARSED_DATA_BAGS_SET: return reduceParsedDataBagsSet(state, action)
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

function reduceAdjustmentStepSizeSet (state: InspectRepoInitialStateT, action: InspectRepoAction): InspectRepoInitialStateT {
	return {
		...state,
		adjustmentStepSize: action.payload
	}
}

function reduceInspectingSet (state: InspectRepoInitialStateT, action: InspectRepoAction): InspectRepoInitialStateT {
	return {
		...state,
		inspecting: action.payload
	}
}

function reduceInspectingClear (state: InspectRepoInitialStateT): InspectRepoInitialStateT {
	return {
		...state,
		inspecting: undefined
	}
}

function reduceDataSet (state: InspectRepoInitialStateT, action: InspectRepoAction): InspectRepoInitialStateT {
	return {
		...state,
		data: action.payload
	}
}

function reduceParsedDataBagsSet (state: InspectRepoInitialStateT, action: InspectRepoAction): InspectRepoInitialStateT {
	return {
		...state,
		parsedCountBags: action.payload
	}
}

export default InspectRepoReducer