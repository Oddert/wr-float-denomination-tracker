import { createContext } from 'react'

import {
	InspectRepoInitialStateT,
} from './types'

export const InspectRepoContext = createContext<any>({})

export const ABS_START_DATE = '2021-03-30'

const baseDate = new Date(ABS_START_DATE)

export const inspectRepoInitialState: InspectRepoInitialStateT = {
	repo: undefined,
	startTime: new Date(baseDate.getTime() - 1000 * 60 * 60 * 24 * 7 * 5),
	endTime: new Date(baseDate),
	useAdjustments: false,
	adjustmentStepSize: .2,
	inspecting: null,
	constants: {
		WIDTH: 1200,
		HEIGHT: 500,
		Y_PADDING: 20,
	},
	data: [],
	parsedCountBags: [],
}

