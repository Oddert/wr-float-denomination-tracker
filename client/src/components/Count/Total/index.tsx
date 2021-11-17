import React, { useContext } from 'react'
import { 
	Box, 
	Divider,
	// Flex,
	Grid,
	// Text,
	Heading,
	GridItem, 
} from '@chakra-ui/react'

import { StateType } from '../utils/types'

import Overall from './Overall'
import Sub from './Sub'
import CountContext from '../utils/CountContext'

const Total: React.FC = () => {
	const { state }: { state: StateType } = useContext(CountContext)
	
	const bagged: number = state.data.bagged.total || 0
	const loose: number = state.data.loose.total || 0
	const notes: number = state.data.notes.total || 0
	// const total = state.data.total

	return (
		<Box>
			<Divider />
			<Grid
				templateColumns='1fr 1fr'
				templateRows='auto auto'
				justifyItems='center'
				p='40px 10px 10px'
			>
				<GridItem
					display='flex'
					alignItems='center'
				>
					<Heading as='h3'>
						Till Total
					</Heading>
				</GridItem>
				<GridItem
					display='flex'
					alignItems='center'
				>
					<Overall total={bagged + loose + notes} />
				</GridItem>
				<Sub 
					bagged={bagged}
					loose={loose}
					notes={notes}
				/>
			</Grid>
		</Box>
	)
}

export default Total