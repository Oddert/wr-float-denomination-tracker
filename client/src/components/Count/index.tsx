import React, { Dispatch, useReducer, useEffect } from 'react'
import {
	Flex,
	FormLabel,
	Divider,
	Text,
	Skeleton,
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

import BaggedCoin from './BaggedCoin/'
import Counter from './Counter'
import LooseCoin from './LooseCoin/'
import Notes from './Notes/'
import Repository from './Repository'
import Supervisor from './Supervisor'
import Time from './Time'

import CountContext from './utils/CountContext'
import { CountActions, validateCount } from './utils/API'

import {
	StateType,
	ActionType,
} from './utils/types'

import countReducer from './utils/reducer'
import initialState from './utils/initialState'
import SaveInterface from './SaveInterface/'

interface Props {
	edit?: boolean
}

const Count: React.FC<Props> = ({ edit }) => {

	const params: any = useParams()
	const [state, dispatch]: [StateType, Dispatch<ActionType>] = useReducer(countReducer, initialState)

	useEffect(() => {
		
		// console.clear()

		// const completeCount = {"repository":"403","status":"complete","timestamp":1616094172738,"_id":"fen3fuh43f8hf2h2fh87h","data": {"bagged":{"pence_one":500,"pence_two":300,"pence_five":2000,"pence_ten":1000,"pence_twenty":7000,"pence_fifty":3000,"pound_one":18000,"pound_two":10000,"note_five":1000,"total":42800},"loose":{"pence_one":164,"pence_two":200,"pence_five":1425,"pence_ten":1370,"pence_twenty":600,"pence_fifty":2450,"pound_one":6100,"pound_two":400,"other":0,"total":12709},"notes":{"note_one":0,"note_five":7500,"note_ten":24000,"note_twenty":12000,"note_fifty":5000,"total":48500},"total":0},"counter":"Robyn F H Veitch","supervisor":"Mr Robot","unferified":false,"ready":true}
		// const partialCount = {"repository":"403","status":"complete","timestamp":1616094172738,"_id":"fen3fuh43f8hf2h2fh87h","data": {"bagged":{"pence_one":800,"pence_two":300,"pence_five":3500,"pence_ten":4500,"pence_twenty":1000,"pence_fifty":1000,"pound_one":12000,"pound_two":4000,"note_five":0,"total":27100},"loose":{"pence_one":null,"pence_two":null,"pence_five":null,"pence_ten":null,"pence_twenty":null,"pence_fifty":null,"pound_one":null,"pound_two":null,"other":null,"total":null},"notes":{"note_one":null,"note_five":null,"note_ten":null,"note_twenty":null,"note_fifty":5000,"total":5000},"total":0},"counter":"Robyn F H Veitch","supervisor":"Mr Robot","unferified":false,"ready":true}
		// const incompleteCount = {"repository":"403","status":"complete","timestamp":1616094172738,"_id":"fen3fuh43f8hf2h2fh87h","data": {"bagged":{"pence_one":0,"pence_two":300,"pence_five":3500,"pence_ten":null,"pence_twenty":0,"pence_fifty":1000,"pound_one":12000,"pound_two":4000,"note_five":0,"total":20800},"loose":{"pence_one":0,"pence_two":0,"pence_five":0,"pence_ten":0,"pence_twenty":0,"pence_fifty":0,"pound_one":0,"pound_two":0,"other":0,"total":0},"notes":{"note_one":0,"note_five":0,"note_ten":0,"note_twenty":0,"note_fifty":5000,"total":5000},"total":0},"counter":"Robyn F H Veitch","supervisor":"Mr Robot","unferified":false,"ready":true}
		// const unverifiedCount = {"repository":"403","status":"complete","timestamp":1616094172738,"_id":"fen3fuh43f8hf2h2fh87h","data": {"bagged":{"pence_one":400,"pence_two":200,"pence_five":4000,"pence_ten":1000,"pence_twenty":2000,"pence_fifty":9000,"pound_one":8000,"pound_two":12000,"note_five":0,"total":36600},"loose":{"pence_one":0,"pence_two":0,"pence_five":0,"pence_ten":0,"pence_twenty":0,"pence_fifty":0,"pound_one":0,"pound_two":0,"other":0,"total":0},"notes":{"note_one":0,"note_five":0,"note_ten":0,"note_twenty":0,"note_fifty":5000,"total":5000},"total":0},"counter":"Robyn F H Veitch","supervisor":"Mr Robot","unferified":false,"ready":true}
		// const fragmentedCount = {"repository":"403","status":"complete","timestamp":1616094172738,"_id":"fen3fuh43f8hf2h2fh87h","data": {"bagged":{"pence_one":400,"pence_two":200,"pence_ten":1000,"pence_twenty":2000,"pence_fifty":9000,"pound_one":8000,"pound_two":12000,"note_five":0,"total":36600},"loose":{"pence_one":0,"pence_two":0,"pence_ten":0,"pence_twenty":0,"pence_fifty":0,"pound_one":0,"pound_two":0,"other":0,"total":0},"notes":{"note_one":0,"note_five":0,"note_ten":0,"note_twenty":0,"note_fifty":5000,"total":5000},"total":0},"counter":"Robyn F H Veitch","supervisor":"Mr Robot","unferified":false,"ready":true}

		// console.log('completeCount', validateCount(completeCount))
		// console.log('partialCount', validateCount(partialCount))
		// console.log('incompleteCount', validateCount(incompleteCount))
		// console.log('unverifiedCount', validateCount(unverifiedCount))
		// console.log('fragmentedCount', validateCount(fragmentedCount))

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
			.then(res => {
				const validation = validateCount(res.count)
				if (validation.code === 'invalid') {
					console.log('invalid response from the server')
				} else {
					dispatch({ type: CountActions.WRITE_ALL, payload: res.count })
				}
			})
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
					<SaveInterface 
						edit={edit}
					/>
				</Flex>
			</Flex>
		</CountContext.Provider>
	)
}

export default Count