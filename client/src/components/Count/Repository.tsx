import React, { useContext } from 'react'
import {
	Box,
} from '@chakra-ui/react'

import Select from '../base/Select'

import { Repository as RepositoryT } from '../../global'
import initialReduxState from '../../constants/initialState'

import CountContext from './utils/CountContext'
import { CountActions } from './utils/API'
import { useSelector } from 'react-redux'

const Repository = () => {
	const { state, dispatch } = useContext(CountContext)
	const repositories: RepositoryT[] = useSelector((s: typeof initialReduxState) => s.repositories.repositoryList)
	return (
		<Box
			p='10px 0 20px'
		>
			<Select
				w='50%'
				value={state.repositoryId}
				onChange={(e: any) => dispatch({ type: CountActions.UPDATE_REPO, payload: e.target.value})}
			>
				{
					repositories.map((each: RepositoryT) =>
						<option 
							value={each.id} 
							key={each.id}
						>
							{
								each.name
							}
						</option>	
					)
				}
			</Select>
		</Box>
	)
}

export default Repository