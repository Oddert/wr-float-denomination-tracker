export interface CountType {
	floatId: number
	repositoryId: number
	completionStatus: 'complete' | 'incomplete' | 'partial' | 'unverified'
	createdOn: number
	updatedOn?: number
	verified?: boolean
	counterId?: number
	supervisorId?: number
	deletedById?: number
	deleted?: boolean
	deletedOn?: number
}

export interface PartnerServerType {
	id: number
	preferredName: string
	firstName: string
	middleNames: string
	lastName: string
	pending: boolean
	createdOn: number
	updatedOn: number
	tillNumber: string
}

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

export interface CountClientStateType {
	repository: number
	timestamp: number | Date
	data: DataType
	counter: string
	supervisor: string
	ready: boolean
	verified: boolean
	counterId: string
	supervisorId: string
	comment?: string
}