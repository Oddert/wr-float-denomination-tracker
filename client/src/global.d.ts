
declare global {
	interface TestInterface {
		data: string
	}
}

declare global {
	interface Flash {
		createdAt: number
		duration: number
		title?: string
		description?: string
		catt?: string
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

type completionStatus = 'complete' | 'incomplete' | 'partial' | 'unverified'

export interface Repository {
	id: number
	name: string
	updatedOn: number
	activated: boolean | number
	activatedById?: number
	deactivatedById?: number
	deletedById?: number
	createdOn?: number
	deactivatedOn?: number
	description?: string
	activatedOn?: number
	deleted?: boolean | number
	deletedOn?: number
}

export type FlashCatts = 'unverified' | 'info' | 'complete' | 'partial' | 'danger' | 'incomplete'

export interface Partner {
	id: number,
	tillNumber: string,
	firstName: string,
	createdOn: number,
	preferredName?: string,
	middleNames?: string,
	lastName?: string,
	pending?: boolean,
	updatedOn?: number,
	deleted?: boolean,
	deletedOn?: number,
}

export interface ListCount {
	id: number
	floatId: number
	timestamp: number
	comment?: string
	repositoryId?: number
	deletedById?: number
	counterId?: number
	supervisorId?: number
	authenticatorId?: number
	completionStatus: completionStatus
	createdOn: number
	verified: boolean
	deleted?: boolean
	deletedOn?: number
	updatedOn?: number
}

export interface ServerCountType {
	repositoryId?: number | null
	timestamp?: number | null
	counter?: string | null
	counterId?: number | null
	supervisor?: string | null
	supervisorId?: number | null
	float?: ServerFloatType | null
}

export interface ServerFloatType {
	bagPence1?: number | null
	bagPence2?: number | null
	bagPence5?: number | null
	bagPence10?: number | null
	bagPence20?: number | null
	bagPence50?: number | null
	bagPound1?: number | null
	bagPound2?: number | null
	bagNote5?: number | null
	bagTotal?: number | null
	loosePence1?: number | null
	loosePence2?: number | null
	loosePence5?: number | null
	loosePence10?: number | null
	loosePence20?: number | null
	loosePence50?: number | null
	loosePound1?: number | null
	loosePound2?: number | null
	looseOther?: number | null
	looseTotal?: number | null
	note1?: number | null
	note5?: number | null
	note10?: number | null
	note20?: number | null
	note50?: number | null
	noteTotal?: number | null
	floatTotal?: number | null
}