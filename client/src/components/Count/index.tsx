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
import Counter from './Counter/'
import LooseCoin from './LooseCoin/'
import Notes from './Notes/'
import Repository from './Repository'
import Time from './Time'

import CountContext from './utils/CountContext'
import { 
	CountActions, 
	// validateCount,
} from './utils/API'

import {
	StateType,
	ActionType,
} from './utils/types'

import countReducer from './utils/reducer'
import initialState from './utils/initialState'
import SaveInterface from './SaveInterface/'
import { useSelector } from 'react-redux'

interface Props {
	edit?: boolean
}

const Count: React.FC<Props> = ({ edit }) => {

	const params: any = useParams()
	const users = useSelector((s: any) => s.auth.userList)
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
			.then(res => {
				// const validation = validateCount(res.count)
				// if (validation.code === 'invalid') {
				// 	console.log('invalid response from the server')
				// } else {
					if (res.status > 100 && res.status < 300) {
						const count = res.count[0]
						const stateFromRequest: StateType = {
							repository: `${count.repositoryId}`,
							repositoryId: count.repositoryId,
							timestamp: count.timestamp,
							counter: '',
							counterId: count.counterId,
							supervisor: `${count.supervisorId}`,
							supervisorId: count.supervisorId,
							ready: false,
							verified: Boolean(count.verified),
							data: {
								bagged: {
									pence_one: count.float.bagPence1,
									pence_two: count.float.bagPence2,
									pence_five: count.float.bagPence5,
									pence_ten: count.float.bagPence10,
									pence_twenty: count.float.bagPence20,
									pence_fifty: count.float.bagPence50,
									pound_one: count.float.bagPound1,
									pound_two: count.float.bagPound2,
									note_five: count.bagNoteFive,
									total: count.bagTotal,
								},
								loose: {
									pence_one: count.float.loosePence1,
									pence_two: count.float.loosePence2,
									pence_five: count.float.loosePence5,
									pence_ten: count.float.loosePence10,
									pence_twenty: count.float.loosePence20,
									pence_fifty: count.float.loosePence50,
									pound_one: count.float.loosePound1,
									pound_two: count.float.loosePound2,
									other: count.looseOther,
									total: count.looseTotal,
								},
								notes: {
									note_one: count.float.note1,
									note_five: count.float.note5,
									note_ten: count.float.note10,
									note_twenty: count.float.note20,
									note_fifty: count.float.note50,
									total: count.float.noteTotal,
								},
								total: count.float.floatTotal
							}
						}
						// TODO: replace with server side join
						if (users) {
							const selectedUser = users[count.counterId]
							if (selectedUser) {
								stateFromRequest.counter = selectedUser.preferredName
							}
						}
						dispatch({ type: CountActions.WRITE_ALL, payload: stateFromRequest })
					} else {
						console.error(res.errorMessage)
					}
				// }
			})
			.catch(err => console.error(err))
	}, [edit, params.id, dispatch])

	if (edit && !state.ready) {
		return (
			<Flex
				direction='column'
			>
				<Text
					wordBreak='break-all'
				>
					{ JSON.stringify(state) }
				</Text>
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
					m='0 0 6em'
				>
					<Time />
					<Flex
						w='100%'
						justifyContent='space-around'
						m='30px 0'
					>
						<Counter 
							label='Counter'
							dispatchType={CountActions.UPDATE_COUTNER}
							stateAssignment='counter'
						/>
						<Counter 
							label='Supervisor'
							dispatchType={CountActions.UPDATE_SUPERVISOR}
							stateAssignment='supervisor'
						/>
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