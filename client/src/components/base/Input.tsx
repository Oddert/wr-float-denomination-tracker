import React from 'react'
import {
	Input as ChakraInput
} from '@chakra-ui/react'

type ChakraInputType = typeof ChakraInput
interface Props extends ChakraInputType {
	placeholder?: string
}

const Input: React.FC<any> = (props: Props) => <ChakraInput
	{...props}
	color='theme_light.text.light'
	borderRadius='0'
	border='2px solid'
	borderColor='theme_light.text.lighter'
	m='10px 0'
	_hover={{
		borderColor: 'theme_light.text.standard'
	}}
	_focus={{
		color: 'theme_light.text.darker',
		boxShadow: '0 0 0 2px #5EAFFB',
	}}
/>

export default Input