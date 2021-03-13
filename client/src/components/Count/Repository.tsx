import React, { useContext } from 'react'
import {
	Box,
} from '@chakra-ui/react'

import Select from '../base/Select'

import AddCountContext from './AddCountContext'
import { repositories, CountActions } from './API'

const Repository = () => {
	const { state, dispatch } = useContext(AddCountContext)
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