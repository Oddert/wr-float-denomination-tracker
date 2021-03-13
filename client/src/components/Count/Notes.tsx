import React from 'react'
import {
	Flex,
	Grid,
	GridItem,
	FormLabel,
	Box,
	Divider,
} from '@chakra-ui/react'

import NoteInput from './NoteInput'

const BaggedCoin: React.FC = () => {
	return (
		<GridItem
			colStart={1}
			colEnd={-1}
		>
			<Flex
				direction='column'
			>
				<Grid
					p='8px 20px'
					alignItems='center'
					justifyContent='space-around'
					width='100%'
					templateColumns='100px 1fr 1fr'
					justifyItems='center'
				>
					<Box></Box>
					<FormLabel>Number</FormLabel>
					<FormLabel>Value</FormLabel>
				</Grid>
				<NoteInput 
					label='£50'
					step={5000}
					startValue={2}
				/>
				<NoteInput 
					label='£20'
					step={2000}
					startValue={12}
				/>
				<NoteInput 
					label='£10'
					step={1000}
					startValue={25}
				/>
				<NoteInput 
					label='£5'
					step={500}
					startValue={6}
				/>
				<NoteInput 
					label='£1 (Scottish)'
					step={100}
					startValue={2}
				/>
			</Flex>
			<Divider />
		</GridItem>
	)
}

export default BaggedCoin