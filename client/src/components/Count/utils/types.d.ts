export interface BaggedType {
	pence_one: number | null
	pence_two: number | null
	pence_five: number | null
	pence_ten: number | null
	pence_twenty: number | null
	pence_fifty: number | null
	pound_one: number | null
	pound_two: number | null
	note_five: number | null
	total: number | null
}

export interface LooseType {
	pence_one: number | null
	pence_two: number | null
	pence_five: number | null
	pence_ten: number | null
	pence_twenty: number | null
	pence_fifty: number | null
	pound_one: number | null
	pound_two: number | null
	other: number | null
	total: number | null
}

export interface NotesType {
	note_one: number | null
	note_five: number | null
	note_ten: number | null
	note_twenty: number | null
	note_fifty: number | null
	total: number | null
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
	verified: boolean
}

export interface ActionType {
	type: CountActions
	payload: any
}

export interface Validation {
	code: 'complete' | 'incomplete' | 'partial' | 'unverified' | 'invalid'
	message: string
	verified: boolean
}