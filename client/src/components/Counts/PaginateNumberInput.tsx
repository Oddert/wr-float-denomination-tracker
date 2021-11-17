import React from 'react'

import {
	Button,
	Flex,
	Input,
} from '@chakra-ui/react'
import { 
	ChevronLeftIcon,
	ChevronRightIcon, 
} from '@chakra-ui/icons'

interface Props {
	page: number
	pageLength: number
	setPage: any
}

const PaginateNumberInput: React.FC<Props> = ({
	page,
	pageLength,
	setPage,
}) => {

	const increment = () => setPage(page + 1)

	const decrement = () => {
		if (page === 0) return
		setPage(page - 1)
	}

	return (
		<Flex
			justifyContent='center'
			m='50px 0'
			position='sticky'
			bottom='10px'
		>
			<Button
				variant='ui'
				onClick={decrement}
			>
				<ChevronLeftIcon />
				Previous
			</Button>
			<Input 
				value={page}
				// TODO: Reimplament
				// onChange={(e: any) => console.log(e)}
				w='100px'
				textAlign='center'
			/>
			<Button
				variant='ui'
				onClick={increment}
			>
				Next
				<ChevronRightIcon />
			</Button>
		</Flex>
	)
}

export default PaginateNumberInput