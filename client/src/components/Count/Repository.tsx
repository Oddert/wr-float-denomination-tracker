import React, { useContext } from 'react'
import {
	Box,
} from '@chakra-ui/react'

import Select from '../base/Select'

import CountContext from './utils/CountContext'
import { repositories, CountActions } from './utils/API'

const Repository = () => {
	const { state, dispatch } = useContext(CountContext)
	return (
		<Box
			p='10px 0 20px'
		>
			<Select
				w='50%'
				value={state.repository}
				onChange={(e: any) => dispatch({ type: CountActions.UPDATE_REPO, payload: e.target.value})}
			>
				{
					repositories.map(each =>
						<option value={each} key={each}>{each}</option>	
					)
				}
			</Select>
		</Box>
	)
}

export default Repository