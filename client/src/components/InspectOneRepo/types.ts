import {
	ServerCountType,
} from '../../global'

export interface SingleParsedCountBagT { 
	label: string, 
	y: number
	x: number
	timestamp: number
	id: number
}

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
	payload: any
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
}


export interface InspectRepoInitialStateT {
	repo?: number
	startTime: Date
	endTime: Date
	useAdjustments: boolean
	adjustmentStepSize: number
	inspecting?: any
	constants: {
		WIDTH: number
		HEIGHT: number
		Y_PADDING: number
	},
	data: ServerCountType[],
	parsedCountBags: ParsedCountBagsT[],
}