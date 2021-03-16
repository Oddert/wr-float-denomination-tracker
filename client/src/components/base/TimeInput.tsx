import React from 'react'
import { Box } from '@chakra-ui/react'
import { TimeIcon } from '@chakra-ui/icons'
import DatePicker from 'react-datepicker'

const TimeInput: React.FC<any> = (props: any) => (
	<Box
		border='2px solid'
		display='inline-flex'
		color='theme_light.text.light'
		borderColor='theme_light.text.lighter'
		p='2px 16px'
		fontSize='18px'
		position='relative'
		alignItems='center'
		title={props.title || 'select a time'}
		transition='.1s linear'
		_hover={{
			color: 'theme_light.text.standard',
			borderColor: 'theme_light.text.light',
		}}
	>
		<DatePicker 
			{...props}
		/>
		<TimeIcon />
	</Box>
)

export default TimeInput 