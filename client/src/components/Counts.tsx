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
	// const counts: CountType[] = [
	// 	{ repository: '403', status: 'complete', date: Date.now(), _id: 'fen3fuh43f8hf2h2fh87h' },
	// 	{ repository: '401', status: 'complete', date: Date.now(), _id: 'xm3rgm439x8ug9348cg98' },
	// 	{ repository: '403', status: 'incomplete', date: Date.now() - 14863542, _id: 'oiweiowenfbnowg093893' },
	// 	{ repository: '401', status: 'unverified', date: Date.now() - 248635424, _id: 'aldpqwomcpm2f2309j0jv' },
	// 	{ repository: 'lotto', status: 'incomplete', date: Date.now() - 348635424, _id: 'p0kd209xxf3349c3094gj' },
	// 	{ repository: '403', status: 'partial', date: Date.now() - 442635424, _id: '02j3f092j3fj8r9232222' },
	// 	{ repository: '401', status: 'partial', date: Date.now() - 442635424, _id: '09jf92ehfn9hfpe38hhf3' },
	// 	{ repository: '403', status: 'complete', date: Date.now() - 493685464, _id: 'f32ojf093jtx0k4ugx384' },
	// 	{ repository: '403', status: 'complete', date: Date.now() - 492685464, _id: '3ncty3oky4toy3ohc8234' },
	// 	{ repository: 'lotto', status: 'complete', date: Date.now() - 552635424, _id: '3rx394+5x+34xt43g34gq' },
	// 	{ repository: 'lotto', status: 'unverified', date: Date.now() - 862635424, _id: 'eg9crw1g8rw6tb24r9t84' },
	// 	{ repository: '403', status: 'complete', date: Date.now() - 89234245, _id: 'fj9839g34tmc0h4thcg03' },
	// ]
	const countState = useSelector((state: any) => state.counts)
	const { data: counts, updated } = countState
	const days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
	// interface ColorMapType {
	// 	'complete': string,
	// 	'partial': string,
	// 	'incomplete': string,
	// 	'unverified': string,
	// } 
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