import React, { useState } from 'react'

import {
	Flex,
	Text,
	Checkbox,
	Link,
	Skeleton,
} from '@chakra-ui/react'

import Select from './base/Select'
import { useEffect } from 'react'
import { countsDataWriteAll } from '../actions'
import { useDispatch, useSelector } from 'react-redux'

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
	const repositories = useSelector((s: any) => s.repositories.repositoryList)
	// const repos = ['401', '403', 'lotto']
	const [selectedRepo, setSelectedRepo] = useState('all')

	const countState = useSelector((state: any) => state.counts)
	const { data: counts, updated } = countState
	const days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']

	const colourMap = (str: any): string => {
		const m: any = {
			'complete': 'theme_light.info.complete',
			'partial': 'theme_light.info.partial',
			'incomplete': 'theme_light.info.unfinished',
			'unverified': 'theme_light.info.unverified',
		}
		return m[str]
	}

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
			<Select
				w='50%'
				value={selectedRepo}
				onChange={(e: any) => setSelectedRepo(e.target.value)}
			>
				<option value='all'>All</option>
				{
					repositories.map((e: any) =>
						<option 
							key={e.id} 
							value={e.id}
						>
							{e.name}
						</option>
					)
				}
			</Select>
			<Flex
				direction='column'
			>
				{
					counts
						.filter((each: any) => each.repositoryId === Number(selectedRepo) || selectedRepo === 'all')
						.map((each: any) => {
							const date = new Date(each.timestamp)
							const py='10px'
							const px='40px'
							return (
								<Flex
									key={each.id}
									bgColor='#ffffff'
									alignItems='center'
									justifyContent='space-between'
									m='4px 0'
									borderLeft='10px solid'
									borderLeftColor={colourMap(each.completionStatus)}
									transition='.1s linear'
									_hover={{
										bgColor: '#DADADB'
									}}
								>
									<Link 
										href={`#/count/${each.id}`}
										flex='1'
										py={py}
										pl={px}
										_hover={{
											textDecoration: 'none'
										}}
									>
										<Flex
											alignItems='center'
											justifyContent='space-between'
										>
											<Text>
												{
													repositories.find((repo: any) => each.repositoryId === repo.id).name
												}
											</Text>
											<Text>
												{days[date.getDay()]}
											</Text>
											<Text>
												{date.toLocaleDateString('en-GB')}
											</Text>
											<Text>
												{date.toLocaleTimeString('en-GB')}
											</Text>
										</Flex>
									</Link>
									<Flex
										alignItems='center'
										justifyContent='center'
										px={px}
									>
										<Checkbox></Checkbox>
									</Flex>
								</Flex>
							)
						})
				}
			</Flex>
		</div>
	)
}

export default Counts