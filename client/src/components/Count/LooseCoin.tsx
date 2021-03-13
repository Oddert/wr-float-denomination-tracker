import React from 'react'
import {
	Grid,
	Box,
	Divider,
} from '@chakra-ui/react'

import LooseCoinInput from './LooseCoinInput'

const LooseCoin: React.FC = () => {
	return (
		<>
			<Grid
				templateColumns='1fr 1fr'
				autoRows='1fr'
			>
				<LooseCoinInput 
					label='£2'
					display='pound'
				/>
				<LooseCoinInput 
					label='£1'
					display='pound'
				/>
				<LooseCoinInput 
					label='50p'
					display='pence'
				/>
				<LooseCoinInput 
					label='20p'
					display='pence'
				/>
				<LooseCoinInput 
					label='10p'
					display='pence'
				/>
				<LooseCoinInput 
					label='5p'
					display='pence'
				/>
				<LooseCoinInput 
					label='2p'
					display='pence'
				/>
				<LooseCoinInput 
					label='1p'
					display='pence'
				/>
				<Box></Box>
				<LooseCoinInput 
					label='Any Other Value'
					display='pound'
				/>
			</Grid>
			<Divider />
		</>
	)
}

export default LooseCoin