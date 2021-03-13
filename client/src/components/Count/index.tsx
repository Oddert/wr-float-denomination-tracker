import React, { Dispatch, useReducer } from 'react'
import {
	Flex,
	FormLabel,
	InputGroup,
	Divider,
	Text,
} from '@chakra-ui/react'

import Input from '../base/Input'
import Repository from './Repository'
import BaggedCoin from './BaggedCoin'
import LooseCoin from './LooseCoin'
import Notes from './Notes'
import Counter from './Counter'
import Time from './Time'

import AddCountContext from './AddCountContext'
import { repositories, CountActions } from './API'

interface State {
	repository: typeof repositories
	counter: string
	supervisor: string
}

interface Action {
	type: CountActions
	payload: any
}

const Count: React.FC = () => {

	const countReducer = (state: State, action: Action) => {
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
			default: return state
		}
	}
	
	const [state, dispatch]: [State, Dispatch<Action>] = useReducer(countReducer, {
		repository: repositories[0],
		counter: '',
		supervisor: '',
		timestamp: Date.now(),
	})

	return (
		<AddCountContext.Provider value={{
			state, dispatch
		}}>
			<Text>{JSON.stringify(state)}</Text>
			<Flex
				flexDirection='column'
			>
				<Repository />
				<Flex
					flexDirection='column'
					bgColor='#fff'
					p='25px'
				>
					<FormLabel>Date</FormLabel>
					<Time />
					<Flex
						w='100%'
						justifyContent='space-around'
						m='30px 0'
					>
						<Counter />
						<InputGroup
							display='flex'
							flexDirection='column'
							p='0 10px'
						>
							<FormLabel>Supervisor</FormLabel>
							<Input />
						</InputGroup>
					</Flex>
					<Divider />
					<FormLabel>Bagged Coin</FormLabel>
					<BaggedCoin />
					<FormLabel>Loose Coin</FormLabel>
					<LooseCoin />
					<FormLabel>Notes / Uncounted Pickups</FormLabel>
					<Notes />
				</Flex>
			</Flex>
		</AddCountContext.Provider>
	)
}

export default Count