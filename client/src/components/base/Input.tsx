import React from 'react'
import {
	Input as ChakraInput
} from '@chakra-ui/react'

type ChakraInputType = typeof ChakraInput
interface Props extends ChakraInputType {
	placeholder?: string
}

const Input: React.FC<any> = (props: Props) => <ChakraInput
	color='theme_light.text.light'
	borderRadius='0'
	bgColor='#f8f8f8'
	borderTop='none'
	borderLeft='none'
	borderRight='none'
	borderBottom='2px solid'
	borderColor='theme_light.text.lighter'
	m='10px 0'
	_hover={{
		borderColor: 'theme_light.text.standard'
	}}
	_focus={{
		color: 'theme_light.text.darker',
		boxShadow: '0 0 0 2px #5EAFFB',
	}}
	{...props}
/>

export default Input