import React, { useContext } from 'react'
import {
	Flex,
	Grid,
	GridItem,
	FormLabel,
	Box,
	Divider,
} from '@chakra-ui/react'

import NoteInputWrapper from './NoteInputWrapper'
import CountContext from '../utils/CountContext'
import SubTotal from '../SubTotal'

const BaggedCoin: React.FC = () => {
	const { state: { data: { notes: { total } } } } = useContext(CountContext)
	return (
		<>
			<Divider />
			<FormLabel
				marginTop='10px'
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
					<NoteInputWrapper 
						label='£50'
						step={5000}
						denomination='note_fifty'
					/>
					<NoteInputWrapper 
						label='£20'
						step={2000}
						denomination='note_twenty'
					/>
					<NoteInputWrapper 
						label='£10'
						step={1000}
						denomination='note_ten'
					/>
					<NoteInputWrapper 
						label='£5'
						step={500}
						denomination='note_five'
					/>
					<NoteInputWrapper 
						label='£1 (Scottish)'
						step={100}
						denomination='note_one'
					/>
				</Flex>
				<SubTotal
					value={total}
					title='total value of notes (£)'
				/>
			</GridItem>
		</>
	)
}

export default BaggedCoin