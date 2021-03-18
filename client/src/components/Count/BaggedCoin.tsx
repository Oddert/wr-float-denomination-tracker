import React, { useContext } from 'react'
import {
	Grid,
	Box,
	Divider,
	Text,
} from '@chakra-ui/react'

import BaggedCoinInput from './BaggedCoinInput'
import CountContext from './utils/CountContext'

const BaggedCoin: React.FC = () => {
	const { state: { data: { bagged: { total } } }} = useContext(CountContext)
	return (
		<>
			<Grid
				templateColumns='1fr 1fr'
				autoRows='1fr'
			>
				<BaggedCoinInput 
					label='£2'
					denomination='pound_two'
					step={2000}
					display='pound'
					/>
				<BaggedCoinInput 
					label='£1'
					denomination='pound_one'
					step={2000}
					display='pound'
					/>
				<BaggedCoinInput 
					label='50p'
					denomination='pence_fifty'
					step={1000}
					display='pence'
					/>
				<BaggedCoinInput 
					label='20p'
					denomination='pence_twenty'
					step={1000}
					display='pence'
					/>
				<BaggedCoinInput 
					label='10p'
					denomination='pence_ten'
					step={500}
					display='pence'
					/>
				<BaggedCoinInput 
					label='5p'
					denomination='pence_five'
					step={500}
					display='pence'
					/>
				<BaggedCoinInput 
					label='2p'
					denomination='pence_two'
					step={100}
					display='pence'
					/>
				<BaggedCoinInput 
					label='1p'
					denomination='pence_one'
					step={100}
					display='pence'
					/>
				<Box></Box>
				<BaggedCoinInput 
					label='£5 Note'
					denomination='note_five'
					step={500}
					display='pound'
				/>
			</Grid>
			<Text
				textAlign='right'
				title='total bagged value (£)'
			>
				Total: { (total / 100).toFixed(2) }
			</Text>
			<Divider />
		</>
	)
}

export default BaggedCoin