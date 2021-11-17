import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { 
	countsDataWriteMultiple, 
	countsServerTotalWrite 
} from '../../actions'
import initialState from '../../constants/initialState'

import { 
	Repository, 
	ListCount as ListCountT, 
	ReduxStateType,
	ServerCountType
} from '../../global'

import {
	Flex,
	Skeleton,
} from '@chakra-ui/react'

// import Select from '../base/Select'

import QuickAdd from '../QuickAdd'
import ListCount from './ListCount'
import FilterRepos from './FilterRepos'
import PaginateNumberInput from './PaginateNumberInput'

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
	const [page, setPage] = useState(0)

	const countState = useSelector((state: ReduxStateType) => state.counts)
	const { data: counts, updated, pageLength } = countState

	useEffect(() => {
		// dispatch(countsDataWriteAll(page, pageLength))
		dispatch(countsServerTotalWrite())
	}, [dispatch, page])

	useEffect(() => {
		if ((page + 1) * pageLength > counts.length && (counts.length % pageLength === 0)) {
			dispatch(countsDataWriteMultiple(page, pageLength, selectedRepo))
		}
		
	// eslint-disable-next-line react-hooks/exhaustive-deps		
	}, [dispatch, page])

	function changeSeletedRepo (value: string) {
		setSelectedRepo(value)
		setPage(0)
		dispatch(countsDataWriteMultiple(page, pageLength))
	}

	if (!updated) {
		return (
			<Flex
				direction='column'
			>
				<Skeleton height='40px' width='50%' my='10px' />
				{
					Array.from({ length: 3 }).map((e: unknown, i) => 
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
				changeSeletedRepo={changeSeletedRepo}
				repositories={repositories}
			/>
			<Flex
				direction='column'
			>
				{
					counts
						.filter((each: ServerCountType) => 
							each.repositoryId === Number(selectedRepo) || selectedRepo === 'all'
						)
						.slice(page * pageLength, (page + 1) * pageLength)
						.map((each, idx: number) => 
							<ListCount 
								key={idx}
								listCount={each} 
								repositories={repositories} 
							/>
						)
				}
			</Flex>
			<PaginateNumberInput 
				page={page}
				setPage={setPage}
				pageLength={pageLength}
			/>
			<QuickAdd />
		</div>
	)
}

export default Counts