import React, { useContext } from 'react'
import {
	InputGroup,
	FormLabel,
	Box,
} from '@chakra-ui/react'

import Input from '../base/Input'

import CountContext from './utils/CountContext'
import { CountActions } from './utils/API'

const Counter: React.FC = () => {
	const { state, dispatch } = useContext(CountContext)
	const onChange = (e: any) => dispatch({ 
		type: CountActions.UPDATE_COUTNER, 
		payload: e.target.value 
	})
	return (
		<InputGroup
			display='flex'
			flexDirection='column'
		>
			<FormLabel>Counter</FormLabel>
			<Box
				px='1rem'
			>
				<Input 
					value={state.counter} 
					onChange={onChange}
				/>
			</Box>
		</InputGroup>
	)
}

export default Counter