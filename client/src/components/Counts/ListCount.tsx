import React from 'react'

import {
	Flex,
	Link,
	Text,
	Checkbox,
} from '@chakra-ui/react'
import { 
	ListCount as ListCountT, 
	Repository 
} from '../../global'

interface Props {
	listCount: ListCountT
	repositories: Repository[]
}

const ListCount: React.FC<Props> = ({
	listCount,
	repositories,
}) => {

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

	const titleMap = (str: any): string => {
		const m: any = {
			'complete': 'This count is a fully completed count.',
			'partial': 'This count is partially complete meaning at least the bagged coin data is present.',
			'incomplete': 'This count is missing data and will not show on any graphs or analytics.',
			'unverified': 'This count is unverified, a duty partner must authorise it.',
		}
		return m[str]
	}

	const date = new Date(listCount.timestamp)
	const py='10px'
	const px='40px'
	const currentRepository = repositories.find((repo: Repository) => listCount.repositoryId === repo.id)
	return (
		<Flex
			key={listCount.id}
			bgColor='#ffffff'
			alignItems='center'
			justifyContent='space-between'
			m='4px 0'
			borderLeft='10px solid'
			borderLeftColor={colourMap(listCount.completionStatus)}
			transition='.1s linear'
			title={titleMap(listCount.completionStatus)}
			_hover={{
				bgColor: '#DADADB'
			}}
		>
			<Link 
				href={`#/count/${listCount.id}`}
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
							currentRepository ? currentRepository.name : ''
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
}

export default ListCount