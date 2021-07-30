
import {
	InspectRepoActionTypes
} from './Utils'

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
	type: InspectRepoActionTypes.USE_ADJUSTMENTS_SET,
	payload: useAdjustments
})