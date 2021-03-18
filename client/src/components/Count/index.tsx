import React, { Dispatch, useReducer, useEffect } from 'react'
import {
	Flex,
	FormLabel,
	Divider,
	Text,
	Skeleton,
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

import BaggedCoin from './BaggedCoin'
import Counter from './Counter'
import LooseCoin from './LooseCoin'
import Notes from './Notes'
import Repository from './Repository'
import Supervisor from './Supervisor'
import Time from './Time'

import CountContext from './utils/CountContext'
import { CountActions } from './utils/API'

import {
	StateType,
	ActionType,
} from './utils/types'

import countReducer from './utils/reducer'
import initialState from './utils/initialState'
import SaveInterface from './SaveInterface'

interface Props {
	edit?: boolean
}

const Count: React.FC<Props> = ({ edit }) => {

	const params: any = useParams()
	const [state, dispatch]: [StateType, Dispatch<ActionType>] = useReducer(countReducer, initialState)

	useEffect(() => {
		const ready = () => dispatch({ type: CountActions.SET_READY, payload: {} })
		if (!edit) return ready()
		const ext = `/api/v1/count/${params.id}`
		const opts = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
		}
		fetch(ext, opts)
			.then(res => res.json())
			.then(res => dispatch({ type: CountActions.WRITE_ALL, payload: res.count }))
			.catch(err => console.error(err))
	}, [edit, params.id, dispatch])

	if (edit && !state.ready) {
		return (
			<Flex
				direction='column'
			>
				<Skeleton height='30px' my='4px'></Skeleton>
				<Skeleton height='30px' my='4px'></Skeleton>
				<Skeleton height='30px' my='4px'></Skeleton>
			</Flex>
		)
	}
	return (
		<CountContext.Provider value={{
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
					<SaveInterface />
				</Flex>
			</Flex>
		</CountContext.Provider>
	)
}

export default Count