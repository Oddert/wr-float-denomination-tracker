import { createContext } from "react"


export const InspectRepoContext = createContext<any>({})

export const ABS_START_DATE = '2021-03-30'

export interface InspectRepoInitialStateT {
	repo?: number
	startTime: Date
	endTime: Date
	useAdjustments: boolean
}

export enum InspectRepoActionTypes {
	REPO_SET = 'REPO_SET',
	START_DATE_SET = 'START_DATE_SET',
	END_DATE_SET = 'END_DATE_SET',
	USE_ADJUSTMENTS_SET = 'USE_ADJUSTMENTS_SET'
}

export interface InspectRepoAction {
	type: InspectRepoActionTypes
	payload: any
}

const baseDate = new Date(ABS_START_DATE)

export const inspectRepoInitialState: InspectRepoInitialStateT = {
	repo: undefined,
	startTime: new Date(baseDate.getTime() - 1000 * 60 * 60 * 24 * 7 * 5),
	endTime: new Date(baseDate),
	useAdjustments: false,
}

