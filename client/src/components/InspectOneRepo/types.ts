import {
	ServerCountTypeFloatConfirmed,
	ServerFloatType,
} from '../../global'

import {
	MarkSeriesPoint,
} from 'react-vis'
import { Dispatch } from 'react'

export interface SingleParsedCountBagT { 
	label: string, 
	y: number
	x: number
	timestamp: number | string
	id: number
}

export interface ContextCrosshair extends ServerFloatType {
	title: string
	time: string
	date: string
	countId: number
}

export type BagTypes = 'bagNote5' | 'bagPound2' | 'bagPound1' | 'bagPence50' | 'bagPence20' | 'bagPence10' | 'bagPence5' | 'bagPence2' | 'bagPence1'
export const bagTypes = ['bagNote5', 'bagPound2', 'bagPound1', 'bagPence50', 'bagPence20', 'bagPence10', 'bagPence5', 'bagPence2', 'bagPence1']

// TODO: figgure out why this is self referential still
export interface ParsedCountBagsT {
	bagNote5: SingleParsedCountBagT[],
	bagPound2: SingleParsedCountBagT[],
	bagPound1: SingleParsedCountBagT[],
	bagPence50: SingleParsedCountBagT[],
	bagPence20: SingleParsedCountBagT[],
	bagPence10: SingleParsedCountBagT[],
	bagPence5: SingleParsedCountBagT[],
	bagPence2: SingleParsedCountBagT[],
	bagPence1: SingleParsedCountBagT[],
}

export interface InspectRepoAction {
	type: InspectRepoActionTypes
	payload?: any
}

export enum InspectRepoActionTypes {
	REPO_SET = 'REPO_SET',
	START_DATE_SET = 'START_DATE_SET',
	END_DATE_SET = 'END_DATE_SET',
	ADJUSTMENTS_USE_SET = 'ADJUSTMENTS_USE_SET',
	ADJUSTMENT_STEP_SIZE_SET = 'ADJUSTMENT_STEP_SIZE_SET',
	INSPECTING_SET = 'INSPECTING_SET',
	INSPECTING_CLEAR = 'INSPECTING_CLEAR',
	DATA_SET = 'DATA_SET',
	PARSED_DATA_BAGS_SET = 'PARSED_DATA_BAGS_SET',
	CROSSHAIR_SET = 'CROSSHAIR_SET',
	CROSSHAIR_CLEAR = 'CROSSHAIR_CLEAR',
	CROSSHAIR_POSITION_SET = 'CROSSHAIR_POSITION_SET',
	SERIES_HOVER_SET = 'SERIES_HOVER_SET',
	SERIES_HOVER_CLEAR = 'SERIES_HOVER_CLEAR',
}

export interface xAxisLabel {
	[x: number]: string
}

export interface InspectRepoInitialStateT {
	repo?: number
	startTime: Date
	endTime: Date
	adjustYAxisRenderPosition: boolean
	adjustmentStepSize: number
	inspecting?: MarkSeriesPoint
	constants: {
		WIDTH: number
		HEIGHT: number
		Y_PADDING: number
	},
	data: ServerCountTypeFloatConfirmed[]
	parsedCountBags: ParsedCountBagsT
	xAxisLabels: xAxisLabel
	crosshair?: ContextCrosshair
	crosshairX?: number
	focusedSeries: BagTypes[]
	hoverSeries?: BagTypes
}

export interface InpectRepoContextT {
	contextState: InspectRepoInitialStateT
	contextDispatch: Dispatch<InspectRepoAction>
}