import React from 'react'
import { Box } from '@chakra-ui/react'
import { CalendarIcon } from '@chakra-ui/icons'

const DateInput: React.FC = (props: any) => (
	<Box
		border='2px solid'
		display='inline-flex'
		borderColor='theme_light.text.lighter'
		color='theme_light.text.lighter'
		p='2px 16px'
		fontSize='20px'
		position='relative'
		alignItems='center'
		title={props.title || 'pick a date'}
		transition='.1s linear'
		_hover={{
			color: 'theme_light.text.light',
			borderColor: 'theme_light.text.light',
		}}
	>
		<input 
			{...props}
			type='date' 
		/>
		<CalendarIcon />
	</Box>
)

export default DateInput 