import React, { useContext } from 'react'
import {
	Grid,
	Box,
	Divider,
	FormLabel,
} from '@chakra-ui/react'

import LooseCoinInput from './LooseCoinInput'
import CountContext from '../utils/CountContext'
import SubTotal from '../SubTotal'

const LooseCoin: React.FC = () => {
	const { state: { data: { loose: { total } } } } = useContext(CountContext)
	return (
		<>
			<Divider />
			<FormLabel
				marginTop='10px'
			>
				Loose Coin
			</FormLabel>
			<Grid
				templateColumns='1fr 1fr'
				autoRows='auto'
			>
				<LooseCoinInput 
					label='£2'
					display='pound'
					denomination='pound_two'
					step={200}
					/>
				<LooseCoinInput 
					label='£1'
					display='pound'
					denomination='pound_one'
					step={100}
					/>
				<LooseCoinInput 
					label='50p'
					display='pence'
					denomination='pence_fifty'
					step={50}
					/>
				<LooseCoinInput 
					label='20p'
					display='pence'
					denomination='pence_twenty'
					step={20}
					/>
				<LooseCoinInput 
					label='10p'
					display='pence'
					denomination='pence_ten'
					step={10}
					/>
				<LooseCoinInput 
					label='5p'
					display='pence'
					denomination='pence_five'
					step={5}
					/>
				<LooseCoinInput 
					label='2p'
					display='pence'
					denomination='pence_two'
					step={2}
					/>
				<LooseCoinInput 
					label='1p'
					display='pence'
					denomination='pence_one'
					step={1}
					/>
				<Box></Box>
				<LooseCoinInput 
					label='Any Other Value'
					display='pound'
					denomination='other'
					step={1}
				/>
			</Grid>
			<SubTotal 
				value={total} 
				title={'total loose coin (£)'} 
			/>
		</>
	)
}

export default LooseCoin