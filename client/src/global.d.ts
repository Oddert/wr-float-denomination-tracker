
declare global {
	interface TestInterface {
		data: string
	}
}


interface BaggedType {
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

interface LooseType {
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

interface NotesType {
	note_one: number
	note_five: number
	note_ten: number
	note_twenty: number
	note_fifty: number
}

interface DataType {
	bagged: BaggedType
	loose: LooseType
	notes: NotesType
	total: number
}

interface StateType {
	repository: string
	timestamp: number | Date
	data: DataType
	counter: string
	supervisor: string
	ready: boolean
}

interface ActionType {
	type: CountActions
	payload: any
}

interface Validation {
	code: 'complete' | 'incomplete' | 'partial' | 'unverified' | 'invalid'
	message: string
}