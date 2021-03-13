import React, { useContext } from 'react'
import {
	Flex,
	Button,
} from '@chakra-ui/react'

import DateInput from '../base/DateInput'
import TimeInput from '../base/TimeInput'
import AddCountContext from './AddCountContext'
import { CountActions } from './API'


const Time: React.FC = () => {
	const { state, dispatch } = useContext(AddCountContext)

	const handleResetTime = () => dispatch({ 
		type: CountActions.UPDATE_TIME, 
		payload: Date.now() 
	})

	const handleChangeDate = (e: any) => {
		const t = e.target.value
		const startDate = new Date(state.timestamp)
		const inputDate = new Date(t)
		console.log({inputDate})
		inputDate.setHours(startDate.getHours())
		inputDate.setMinutes(startDate.getMinutes())
		inputDate.setSeconds(startDate.getSeconds())
		inputDate.setMilliseconds(startDate.getMilliseconds())
		console.log({inputDate})
		dispatch({
			type: CountActions.UPDATE_TIME,
			payload: inputDate.getTime()
		})
	}

	const handleChangeTime = (e: any) => {
		const t = e.target.value
		const components = t.split(':')
		const inputDate = new Date(state.timestamp)
		console.log({inputDate})
		inputDate.setHours(components[0])
		inputDate.setMinutes(components[1])
		inputDate.setSeconds(components[2])
		console.log({inputDate})
		dispatch({
			type: CountActions.UPDATE_TIME,
			payload: inputDate.getTime()
		})
	}

	const formatDate = (utc: number) => {
		const d: Date = new Date(utc)
		const n = (num: number) => num < 10 ? `0${num}` : num
		const year: number = d.getFullYear()
		const month: number | string = n(d.getMonth()+1)
		const day: number | string = n(d.getDate())
		return `${year}-${month}-${day}`
	}

	return (
		<Flex
			w='100%'
			justifyContent='space-around'
		>
			<DateInput 
				value={formatDate(state.timestamp)} 
				onChange={handleChangeDate} 
				flex='1' 
			/>
			<TimeInput 
				value={new Date(state.timestamp).toLocaleTimeString('en-GB')} 
				onChange={handleChangeTime}
				flex='1' 
			/>
			<Button 
				variant='ui'
				onClick={handleResetTime}
			>
				Count Now
			</Button>
		</Flex>
	)
}

export default Time