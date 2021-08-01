
import {
	InspectRepoActionTypes, ParsedCountBagsT,
} from './types'

import {
	ServerCountType,
} from '../../global'

export const repoSet = (repo?: number) => ({
	type: InspectRepoActionTypes.REPO_SET,
	payload: repo
})
export const startDateSet = (date: Date) => ({
	type: InspectRepoActionTypes.START_DATE_SET,
	payload: date
})
export const endDateSet = (date: Date) => ({
	type: InspectRepoActionTypes.END_DATE_SET,
	payload: date
})
export const adjustmentUseSet = (useAdjustments: boolean) => ({
	type: InspectRepoActionTypes.ADJUSTMENTS_USE_SET,
	payload: useAdjustments
})
export const adjustmentStepSizeSet = (adjustment: number) => ({
	type: InspectRepoActionTypes.ADJUSTMENT_STEP_SIZE_SET,
	payload: adjustment
})
export const inspectingSet = (inspecting: any) => ({
	type: InspectRepoActionTypes.INSPECTING_SET,
	payload: inspecting
})
export const inspectingClear = () => ({
	type: InspectRepoActionTypes.INSPECTING_CLEAR,
})

export const dataSet = (data: ServerCountType[]) => ({
	type: InspectRepoActionTypes.DATA_SET,
	payload: data
})

export const parsedCountBagsSet = (parsedCountBags: ParsedCountBagsT) => ({
	type: InspectRepoActionTypes.PARSED_DATA_BAGS_SET,
	payload: parsedCountBags
})