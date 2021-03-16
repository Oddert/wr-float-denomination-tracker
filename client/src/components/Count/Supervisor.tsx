import React, { useContext } from 'react'
import {
	InputGroup,
	FormLabel,
	Box,
} from '@chakra-ui/react'

import Input from '../base/Input'

import AddCountContext from './AddCountContext'
import { CountActions } from './API'

const Supervisor: React.FC = () => {
	const { state, dispatch } = useContext(AddCountContext)
	const onChange = (e: any) => dispatch({ 
		type: CountActions.UPDATE_SUPERVISOR, 
		payload: e.target.value 
	})
	return (
		<InputGroup
			display='flex'
			flexDirection='column'
		>
			<FormLabel>Supervisor</FormLabel>
			<Box
				px='1rem'
			>
				<Input 
					value={state.supervisor} 
					onChange={onChange}
				/>
			</Box>
		</InputGroup>
	)
}

export default Supervisor