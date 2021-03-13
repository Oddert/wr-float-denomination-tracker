import React from 'react'
import {
	Grid,
	Box,
	Divider,
} from '@chakra-ui/react'

import BaggedCoinInput from './BaggedCoinInput'

const BaggedCoin: React.FC = () => {
	return (
		<>
			<Grid
				templateColumns='1fr 1fr'
				autoRows='1fr'
			>
				<BaggedCoinInput 
					label='£2'
					step={2000}
					display='pound'
				/>
				<BaggedCoinInput 
					label='£1'
					step={2000}
					display='pound'
				/>
				<BaggedCoinInput 
					label='50p'
					step={1000}
					display='pence'
				/>
				<BaggedCoinInput 
					label='20p'
					step={1000}
					display='pence'
				/>
				<BaggedCoinInput 
					label='10p'
					step={500}
					display='pence'
				/>
				<BaggedCoinInput 
					label='5p'
					step={500}
					display='pence'
				/>
				<BaggedCoinInput 
					label='2p'
					step={100}
					display='pence'
				/>
				<BaggedCoinInput 
					label='1p'
					step={100}
					display='pence'
				/>
				<Box></Box>
				<BaggedCoinInput 
					label='£5 Note'
					step={500}
					display='pound'
				/>
			</Grid>
			<Divider />
		</>
	)
}

export default BaggedCoin