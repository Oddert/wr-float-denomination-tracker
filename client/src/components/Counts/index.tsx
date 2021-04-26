import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { countsDataWriteAll } from '../../actions'
import initialState from '../../constants/initialState'

import { 
	Repository, 
	ListCount as ListCountT 
} from '../../global'

import {
	Flex,
	// Text,
	// Checkbox,
	// Link,
	Skeleton,
} from '@chakra-ui/react'

// import Select from '../base/Select'

import QuickAdd from '../QuickAdd'
import ListCount from './ListCount'
import FilterRepos from './FilterRepos'

// interface CountType {
// 	repository: '403' | '401' | 'lotto',
// 	status: 'complete' | 'incomplete' | 'partial' | 'unverified',
// 	date: number,
// 	_id: string,
// }

// TODO: implament save buttons
// TODO: show floating 0's
// TODO: support long empty strings
// TODO: 20p bagged validation is off -still
// TODO: £50 cannot be set to zero?
// TODO: backspace goes to 0 before empty string

const Counts: React.FC = () => {
	const dispatch = useDispatch()
	const repositories: Repository[] = useSelector((s: typeof initialState) => s.repositories.repositoryList)
	// const repos = ['401', '403', 'lotto']
	const [selectedRepo, setSelectedRepo] = useState('all')

	const countState = useSelector((state: any) => state.counts)
	const { data: counts, updated } = countState

	useEffect(() => {
		dispatch(countsDataWriteAll())
	}, [dispatch])

	if (!updated) {
		return (
			<Flex
				direction='column'
				>
				<Skeleton height='40px' width='50%' my='10px' />
				{
					Array.from({ length: 3 }).map((e: any, i) => 
						<Skeleton height='30px' my='4px' key={i} />
					)
				}
			</Flex>
		)
	}
	return (
		<div>
			<FilterRepos
				selectedRepo={selectedRepo}
				setSelectedRepo={setSelectedRepo}
				repositories={repositories}
			/>
			<Flex
				direction='column'
			>
				{
					counts
						.filter((each: any) => 
							each.repositoryId === Number(selectedRepo) || selectedRepo === 'all')
						.map((each: ListCountT, idx: number) => 
							<ListCount 
								key={idx}
								listCount={each} 
								repositories={repositories} 
							/>
						)
				}
			</Flex>
			<QuickAdd />
		</div>
	)
}

export default Counts