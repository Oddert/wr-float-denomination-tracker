import React from 'react'
import { Box } from '@chakra-ui/react'
import { CalendarIcon } from '@chakra-ui/icons'
import DatePicker from 'react-datepicker'

const DateInput: React.FC<any> = (props: any) => (
	<Box
		border='2px solid'
		display='inline-flex'
		color='theme_light.text.light'
		borderColor='theme_light.text.lighter'
		p='2px 16px'
		fontSize='18px'
		position='relative'
		alignItems='center'
		title={props.title || 'pick a date'}
		transition='.1s linear'
		_hover={{
			color: 'theme_light.text.standard',
			borderColor: 'theme_light.text.light',
		}}
	>
		{/* <input 
			{...props}
			type='date' 
		/> */}
		<DatePicker
			{...props}
		/>
		<CalendarIcon />
	</Box>
)

export default DateInput 