export interface BaggedType {
	pence_one: number
	pence_two: number
	pence_five: number
	pence_ten: number
	pence_twenty: number
	pence_fifty: number
	pound_one: number
	pound_two: number
	note_five: number
	total: number
}

export interface LooseType {
	pence_one: number
	pence_two: number
	pence_five: number
	pence_ten: number
	pence_twenty: number
	pence_fifty: number
	pound_one: number
	pound_two: number
	other: number
	total: number
}

export interface NotesType {
	note_one: number
	note_five: number
	note_ten: number
	note_twenty: number
	note_fifty: number
}

export interface DataType {
	bagged: BaggedType
	loose: LooseType
	notes: NotesType
	total: number
}

export interface StateType {
	repository: string
	timestamp: number | Date
	data: DataType
	counter: string
	supervisor: string
	ready: boolean
}

export interface ActionType {
	type: CountActions
	payload: any
}

export interface Validation {
	code: 'complete' | 'incomplete' | 'partial' | 'unverified' | 'invalid'
	message: string
}