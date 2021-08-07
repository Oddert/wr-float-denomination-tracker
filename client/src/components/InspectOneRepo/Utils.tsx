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
	adjustYAxisRenderPosition: false,
	adjustmentStepSize: .2,
	inspecting: undefined,
	constants: {
		WIDTH: 1200,
		HEIGHT: 500,
		Y_PADDING: 20,
	},
	data: [],
	parsedCountBags: {
		bagNote5: [],
		bagPound2: [],
		bagPound1: [],
		bagPence50: [],
		bagPence20: [],
		bagPence10: [],
		bagPence5: [],
		bagPence2: [],
		bagPence1: [],
	},
	xAxisLabels: [],
	crosshair: undefined,
	crosshairX: undefined,
	focusedSeries: [],
	hoverSeries: undefined,
}

