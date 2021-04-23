import React, { useContext } from 'react'

import { 
	Button,
} from '@chakra-ui/react'
import CountContext from '../utils/CountContext'

import { uiFlashWriteOne } from '../../../actions'
import { FlashCatts } from '../../../global'
import { useDispatch } from 'react-redux'

interface Props {
	edit?: boolean
}

interface ServerCountType {
	repositoryId?: number | null
	timestamp?: number | null
	counter?: string | null
	counterId?: number | null
	supervisor?: string | null
	supervisorId?: number | null
	float?: ServerFloatType | null
}

interface ServerFloatType {
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

const Save: React.FC<Props> = ({
	edit
}) => {
	const { state } = useContext(CountContext)
	const dispatch = useDispatch()

	const handleClick = () => {
		if (edit) {
			console.log('Send ajax to PUT, show flash')
			// optional perform validation and show popup
			console.log(state)
			// return
			const count: ServerCountType = {
				repositoryId: state.repositoryId,
				timestamp: state.timestamp,
				float: {
					bagPence1: state.data.bagged.pence_one,
					bagPence2: state.data.bagged.pence_two,
					bagPence5: state.data.bagged.pence_five,
					// bagPence10: state.data.bagged.pence_ten,
					// bagPence20: state.data.bagged.pence_twenty,
					// bagPence50: state.data.bagged.pence_fifty,
					// bagPound1: state.data.bagged.pound_one,
					// bagPound2: state.data.bagged.pound_two,
					bagNote5: state.data.bagged.note_five,
					bagTotal: state.data.bagged.total,
					// loosePence1: state.data.loose.pence_one,
					// loosePence2: state.data.loose.pence_two,
					// loosePence5: state.data.loose.pence_five,
					// loosePence10: state.data.loose.pence_ten,
					loosePence20: state.data.loose.pence_twenty,
					loosePence50: state.data.loose.pence_fifty,
					loosePound1: state.data.loose.pound_one,
					loosePound2: state.data.loose.pound_two,
					looseOther: state.data.loose.other,
					looseTotal: state.data.loose.total,
					// note1: state.data.notes.note_one,
					// note5: state.data.notes.note_five,
					// note10: state.data.notes.note_ten,
					// note20: state.data.notes.note_twenty,
					// note50: state.data.notes.note_fifty,
					noteTotal: state.data.notes.total,
					floatTotal: state.data.notes.total
				}
			}
			if (!state.counterId) {
				count.counterId = null
				count.counter = state.counter
			} else {
				count.counter = ''
				count.counterId = state.counterId
			}
			if (!state.supervisorId) {
				count.supervisorId = null
				count.supervisor = state.supervisor
			} else {
				count.supervisor = ''
				count.supervisorId = state.supervisorId
			}
			console.log(count)
			const EXT = `/api/v1/count/${state.id}`
			const OPTS = {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ count })
			}
			fetch(EXT, OPTS)
				.then(res => res.json())
				.then(res => {
					console.log(res)
					const catt: FlashCatts = res.validation.code
					if (res.status === 200) {
						dispatch(uiFlashWriteOne('Count updated', '', catt, 8000))
					} else {
						dispatch(uiFlashWriteOne('There was an issue updating the count', res.errorMessage || res.responseMessage || '', catt, 8000))
					}
				})
				.catch(error => {
					dispatch(uiFlashWriteOne('Something went wrong.', error, 'danger', 8000))
					console.error(error)
				})
		} else {
			console.log('Send ajax POST, show flash')
			const EXT = `/api/v1/count/1`
			const OPTS = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					count: {
						// repositoryId: 1,
						// counterId: 1,
						data: {
							bagged: {
								pence_one: 5,
								pence_two: 2,
								// pence_five: null,
								// pence_ten: null,
								// pence_twenty: null,
								// pence_fifty: null,
								// pound_one: null,
								// pound_two: null,
								// note_five: null,
								// total: null,
							},
							loose: {
								// pence_one: null,
								// pence_two: null,
								// pence_five: null,
								// pence_ten: null,
								pence_twenty: 8,
								// pence_fifty: null,
								// pound_one: null,
								// pound_two: null,
								// other: null,
								// total: null,
							},
							notes: {
								// note_one: null,
								// note_five: null,
								// note_ten: null,
								// note_twenty: null,
								note_fifty: 40,
							// 	total: null,
							},
							// total: null,
						}
					}
				})
			}
			fetch(EXT, OPTS)
				.then(res => res.json())
				.then(res => console.log(res))
				.catch(err => console.error(err))
		}
	}

	return (
		<Button
			variant='link'
			size='lg'
			my='16px'
			onClick={handleClick}
		>
			Save
		</Button>
	)
}

export default Save