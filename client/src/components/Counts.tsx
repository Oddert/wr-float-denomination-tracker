import React, { useState } from 'react'

import {
	Flex,
	Text,
	Radio,
} from '@chakra-ui/react'

import Select from './base/Select'

const Counts: React.FC = () => {
	const repos = ['401', '403', 'lotto']
	const [repo, setRepo] = useState('all')
	const counts: {
		repository: '403' | '401' | 'lotto',
		status: 'complete' | 'incomplete' | 'partial' | 'unverified',
		date: number,
	}[] = [
		{ repository: '403', status: 'complete', date: Date.now() },
		{ repository: '401', status: 'complete', date: Date.now() },
		{ repository: '403', status: 'incomplete', date: Date.now() - 14863542 },
		{ repository: '401', status: 'unverified', date: Date.now() - 248635424 },
		{ repository: 'lotto', status: 'incomplete', date: Date.now() - 348635424 },
		{ repository: '403', status: 'partial', date: Date.now() - 442635424 },
		{ repository: '401', status: 'partial', date: Date.now() - 442635424 },
		{ repository: '403', status: 'complete', date: Date.now() - 493685464 },
		{ repository: '403', status: 'complete', date: Date.now() - 492685464 },
		{ repository: 'lotto', status: 'complete', date: Date.now() - 552635424 },
		{ repository: 'lotto', status: 'unverified', date: Date.now() - 862635424 },
		{ repository: '403', status: 'complete', date: Date.now() - 89234245 },
	]
	const days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
	const colorMap: {
		'complete': string,
		'partial': string,
		'incomplete': string,
		'unverified': string,
	} = {
		'complete': 'theme_light.info.complete',
		'partial': 'theme_light.info.partial',
		'incomplete': 'theme_light.info.unfinished',
		'unverified': 'theme_light.info.unverified',
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
					repos.map(e =>
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
						.filter(each => each.repository === repo || repo === 'all')
						.map(each => {
							const date = new Date(each.date)
							return (
								<Flex
									bgColor='#ffffff'
									alignItems='center'
									justifyContent='space-between'
									p='10px 40px'
									m='4px 0'
									borderLeft='10px solid'
									borderLeftColor={colorMap[each.status]}
									
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
									<Radio></Radio>
								</Flex>
							)
						})
				}
			</Flex>
		</div>
	)
}

export default Counts