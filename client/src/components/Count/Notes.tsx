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
		<>
			<FormLabel
				title='Notes in the till or Uncounted Pickups is this was a spot check. (Uncounted Pickups are notes which were in the safe during a pickup but not yet processed. Hence VBS would have assumed they were still in the till.'
			>
				Notes / Uncounted Pickups
			</FormLabel>
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
						denomination='note_fifty'
					/>
					<NoteInput 
						label='£20'
						step={2000}
						denomination='note_twenty'
					/>
					<NoteInput 
						label='£10'
						step={1000}
						denomination='note_ten'
					/>
					<NoteInput 
						label='£5'
						step={500}
						denomination='note_five'
					/>
					<NoteInput 
						label='£1 (Scottish)'
						step={100}
						denomination='note_one'
					/>
				</Flex>
				<Divider />
			</GridItem>
		</>
	)
}

export default BaggedCoin