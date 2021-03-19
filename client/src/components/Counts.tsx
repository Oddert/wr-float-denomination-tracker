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
	const repos = ['401', '403', 'lotto']
	const [repo, setRepo] = useState('all')

	const countState = useSelector((state: any) => state.counts)
	const { data: counts, updated } = countState
	const days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']

	const colorMap = (str: any): string => {
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
				value={repo}
				onChange={(e: any) => setRepo(e.target.value)}
			>
				<option value='all'>All</option>
				{
					repos.map((e: any) =>
						<option 
							key={e} 
							value={e}
						>
							{e}
						</option>
					)
				}
			</Select>
			<Flex
				direction='column'
			>
				{
					counts
						.filter((each: any) => each.repository === repo || repo === 'all')
						.map((each: any) => {
							const date = new Date(each.date)
							const py='10px'
							const px='40px'
							return (
								<Flex
									key={each._id}
									bgColor='#ffffff'
									alignItems='center'
									justifyContent='space-between'
									m='4px 0'
									borderLeft='10px solid'
									borderLeftColor={colorMap(each.status)}
									transition='.1s linear'
									_hover={{
										bgColor: '#DADADB'
									}}
								>
									<Link 
										href={`#/count/${each._id}`}
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
												{each.repository}
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