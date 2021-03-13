import React, { useContext } from 'react'
import {
	InputGroup,
	FormLabel,
} from '@chakra-ui/react'

import Input from '../base/Input'

import AddCountContext from './AddCountContext'
import { CountActions } from './API'

const Counter: React.FC = () => {
	const { state, dispatch } = useContext(AddCountContext)
	return (
		<InputGroup
			display='flex'
			flexDirection='column'
			p='0 10px'
		>
			<FormLabel>Counter</FormLabel>
			<Input 
				value={state.counter} 
				onChange={(e: any) => dispatch({ type: CountActions.UPDATE_COUTNER, payload: e.target.value })}
			/>
		</InputGroup>
	)
}

export default Counter