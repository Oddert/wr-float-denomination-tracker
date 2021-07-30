import React, { useContext } from 'react'
import { useSelector } from 'react-redux'

import Select from '../base/Select'

import initialState from '../../constants/initialState'
import { InspectRepoContext } from './Utils'
import { repoSet } from './InspectRepoActions'

interface Props {
}

const RepoSelect: React.FC<Props> = () => {
	const { contextState, contextDispatch } = useContext(InspectRepoContext)
	const repoList = useSelector((s: typeof initialState) => s.repositories.repositoryList)

	const { repo } = contextState

	return (
		<Select
			onChange={(e: any) => contextDispatch(repoSet(e.target.value))}
			value={repo}
			w='250px'
		>
			{
				repoList.map((each: any) => 
					<option
						key={each.id}
						value={each.id}
					>
						{
							each.name
						}
					</option>
				)
			}
		</Select>
	)
}

export default RepoSelect