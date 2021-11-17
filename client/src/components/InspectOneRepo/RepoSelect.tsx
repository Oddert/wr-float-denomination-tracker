import React, { ChangeEvent, useContext } from 'react'
import { useSelector } from 'react-redux'

import Select from '../base/Select'

import initialState from '../../constants/initialState'
import { InspectRepoContext } from './Utils'
import { repoSet } from './InspectRepoActions'
import { Repository } from '../../global'

interface Props {
}

const RepoSelect: React.FC<Props> = () => {
	const { contextState, contextDispatch } = useContext(InspectRepoContext)
	const repoList = useSelector((s: typeof initialState) => s.repositories.repositoryList)

	const { repo } = contextState

	const handleChange = (e: ChangeEvent<HTMLSelectElement>) => contextDispatch(repoSet(Number(e.target.value)))

	return (
		<Select
			onChange={handleChange}
			value={repo}
			w='250px'
		>
			{
				repoList.map((each: Repository) => 
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