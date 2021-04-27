import React from 'react'

import Select from '../base/Select'
import { Repository } from '../../global'

interface Props {
	selectedRepo: string
	changeSeletedRepo: any
	repositories: Repository[]
}

const FilterRepos: React.FC<Props> = ({
	selectedRepo,
	changeSeletedRepo,
	repositories,
}) => {
	return (
		<Select
			w='50%'
			value={selectedRepo}
			onChange={(e: any) => changeSeletedRepo(e.target.value)}
		>
			<option value='all'>All Repositories</option>
			{
				repositories.map((each: Repository) =>
					<option 
						key={each.id} 
						value={each.id}
					>
						{each.name}
					</option>
				)
			}
		</Select>
	)
}

export default FilterRepos