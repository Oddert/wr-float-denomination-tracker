import React, { Dispatch, useReducer } from 'react'
import {
	Flex,
	FormLabel,
	Divider,
	Text,
} from '@chakra-ui/react'

import Repository from './Repository'
import BaggedCoin from './BaggedCoin'
import LooseCoin from './LooseCoin'
import Notes from './Notes'
import Counter from './Counter'
import Time from './Time'

import AddCountContext from './AddCountContext'
import { repositories, CountActions } from './API'
import Supervisor from './Supervisor'

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

interface State {
	repository: typeof repositories
	counter: string
	supervisor: string
	data: DataType
}

interface Action {
	type: CountActions
	payload: any
}

const Count: React.FC = () => {

	const countReducer = (state: State, action: Action) => {
		console.log(action)
		switch(action.type) {
			case CountActions.UPDATE_REPO:
				return {
					...state,
					repository: action.payload
				}
			case CountActions.UPDATE_COUTNER:
				return {
					...state,
					counter: action.payload
				}
			case CountActions.UPDATE_SUPERVISOR:
				return {
					...state,
					supervisor: action.payload
				}
			case CountActions.UPDATE_TIME:
				return {
					...state,
					timestamp: action.payload
				}
			case CountActions.UPDATE_BAG:
				return updateBag(state, action)
			case CountActions.UPDATE_LOOSE:
				return updateLoose(state, action)
			case CountActions.UPDATE_NOTES:
				return updateNotes(state, action)
			default: return state
		}
	}

	function updateBag (state: State, action: Action): State {
		const bagged = {
			...state.data.bagged,
			...action.payload,
		}
		const total: number = Object.keys(bagged)
			.filter(e => e !== 'total')
			.reduce((acc, each) => acc + bagged[each], 0)

		return {
			...state,
			data: {
				...state.data,
				bagged: {
					...bagged,
					total,
				}
			}
		}
	}

	function updateLoose (state: State, action: Action): State {
		const loose = {
			...state.data.loose,
			...action.payload,
		}
		const total: number = Object.keys(loose)
			.filter(e => e !== 'total')
			.reduce((acc, each) => acc + loose[each], 0)

		return {
			...state,
			data: {
				...state.data,
				loose: {
					...loose,
					total,
				}
			}
		}
	}

	function updateNotes (state: State, action: Action): State {
		const notes = {
			...state.data.notes,
			...action.payload,
		}
		const total: number = Object.keys(notes)
			.filter(e => e !== 'total')
			.reduce((acc, each) => acc + notes[each], 0)

		return {
			...state,
			data: {
				...state.data,
				notes: {
					...notes,
					total,
				}
			}
		}
	}
	
	const [state, dispatch]: [State, Dispatch<Action>] = useReducer(countReducer, {
		repository: repositories[0],
		counter: '',
		supervisor: '',
		data: {
			bagged: {
				pence_one: 0,
				pence_two: 0,
				pence_five: 0,
				pence_ten: 0,
				pence_twenty: 0,
				pence_fifty: 0,
				pound_one: 0,
				pound_two: 0,
				note_five: 0,
				total: 0,
			},
			loose: {
				pence_one: 0,
				pence_two: 0,
				pence_five: 0,
				pence_ten: 0,
				pence_twenty: 0,
				pence_fifty: 0,
				pound_one: 0,
				pound_two: 0,
				other: 0,
				total: 0,
			},
			notes: {
				note_one: 0,
				note_five: 0,
				note_ten: 0,
				note_twenty: 0,
				note_fifty: 0,
			},
			total: 0,
		},
		timestamp: Date.now(),
	})

	return (
		<AddCountContext.Provider value={{
			state, dispatch
		}}>
			<Text
				wordBreak='break-all'
			>
				{ JSON.stringify(state) }
			</Text>
			<Flex
				flexDirection='column'
			>
				<Repository />
				<Flex
					flexDirection='column'
					bgColor='#fff'
					p='3em'
				>
					<Time />
					<Flex
						w='100%'
						justifyContent='space-around'
						m='30px 0'
					>
						<Counter />
						<Supervisor />
					</Flex>
					<Divider />
					<FormLabel>Bagged Coin</FormLabel>
					<BaggedCoin />
					<FormLabel>Loose Coin</FormLabel>
					<LooseCoin />
					<Notes />
				</Flex>
			</Flex>
		</AddCountContext.Provider>
	)
}

export default Count