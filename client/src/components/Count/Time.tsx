import React, { useContext } from 'react'
import {
	Flex,
	Button,
	FormLabel,
} from '@chakra-ui/react'

import { registerLocale, setDefaultLocale } from  "react-datepicker"
import gb from 'date-fns/locale/en-GB'

// import {
	// 	DatePicker, 
// 	DatePickerInput,
// 	TimePicker,
// 	TimePickerSelect,
// } from 'carbon-components-react'

import DateInput from '../base/DateInput'
import TimeInput from '../base/TimeInput'
import CountContext from './utils/CountContext'
import { CountActions } from './utils/API'

registerLocale('gb', gb)
setDefaultLocale('gb')

const Time: React.FC = () => {
	const { state: { timestamp }, dispatch } = useContext(CountContext)

	const handleChange = (date: Date): void => {
		dispatch({
			type: CountActions.UPDATE_TIME,
			payload: date
		})
	}

	const handleResetTime = () => dispatch({ 
		type: CountActions.UPDATE_TIME, 
		payload: Date.now() 
	})

	// const handleChangeDate = (e: any) => {
	// 	const t = e.target.value
	// 	const startDate = new Date(timestamp)
	// 	const inputDate = new Date(t)
	// 	console.log({inputDate})
	// 	inputDate.setHours(startDate.getHours())
	// 	inputDate.setMinutes(startDate.getMinutes())
	// 	inputDate.setSeconds(startDate.getSeconds())
	// 	inputDate.setMilliseconds(startDate.getMilliseconds())
	// 	console.log({inputDate})
	// 	dispatch({
	// 		type: CountActions.UPDATE_TIME,
	// 		payload: inputDate.getTime()
	// 	})
	// }

	// const handleChangeTime = (e: any) => {
	// 	const t = e.target.value
	// 	const components = t.split(':')
	// 	const inputDate = new Date(timestamp)
	// 	console.log({inputDate})
	// 	inputDate.setHours(components[0])
	// 	inputDate.setMinutes(components[1])
	// 	inputDate.setSeconds(components[2])
	// 	console.log({inputDate})
	// 	dispatch({
	// 		type: CountActions.UPDATE_TIME,
	// 		payload: inputDate.getTime()
	// 	})
	// }

	// const formatDate = (utc: number) => {
	// 	const d: Date = new Date(utc)
	// 	const n = (num: number) => num < 10 ? `0${num}` : num
	// 	const year: number = d.getFullYear()
	// 	const month: number | string = n(d.getMonth()+1)
	// 	const day: number | string = n(d.getDate())
	// 	return `${year}-${month}-${day}`
	// }

	return (
		<>
			<FormLabel>Date</FormLabel>
			<Flex
				w='100%'
				justifyContent='space-around'
			>
					{/* <DatePicker
						id='date-picker'
						light={false}
						onChange={() => {}}
						onClose={() => {}}
						datePickerType="single"
						dateFormat="d/m/Y"
					>
						<DatePickerInput 
							id='date-picker-input-id'
							labelText={false}
							placeholder='mm/dd/yyyy'
							disabled={false}
							invalid={false}
							invalidText='A valid value is required'
							iconDescription='Icon description'
							onClick={() => {}}
							onChange={() => {}}
						/>
					</DatePicker>
					<TimePicker
						id='time-picker-input-id'
						onChange={(e: any) => console.log(e.target.value)}
					></TimePicker> */}
					
				{/* <DatePicker
					selected={timestamp}
					onChange={handleChange}
					name='Date Start'
					locale='gb'
					timeFormat='HH:mm'
					timeCaption='time input'
					dateFormat='dd/MM/yyyy'
				/>
				<DatePicker
					selected={timestamp}
					onChange={handleChange}
					name='Date Start'
					showTimeSelect={true}
					showTimeSelectOnly={true}
					locale='gb'
					timeFormat='HH:mm'
					timeCaption='time input'
					dateFormat='HH:mm'
				/> */}
				<DateInput 
					flex='1' 
					selected={timestamp}
					onChange={handleChange}
					name='Date Start'
					locale='gb'
					timeFormat='HH:mm'
					timeCaption='time input'
					dateFormat='dd/MM/yyyy'
				/>
				<TimeInput 
					flex='1' 
					selected={timestamp}
					onChange={handleChange}
					name='Date Start'
					showTimeSelect={true}
					showTimeSelectOnly={true}
					locale='gb'
					timeFormat='HH:mm'
					timeCaption='time input'
					dateFormat='HH:mm'
				/>
				<Button 
					variant='ui'
					onClick={handleResetTime}
				>
					Count Now
				</Button>
			</Flex>
		</>
	)
}

export default Time