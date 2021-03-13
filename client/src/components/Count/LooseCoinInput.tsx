import React, { useState } from 'react'
import {
	FormLabel,
	GridItem,
	NumberInput,
	NumberInputField,
	Grid,
} from '@chakra-ui/react'

interface Props {
	label: string
	display?: 'pound' | 'pence'
}

const Denomination: React.FC<Props> = ({
	label,
}) => {
	const [value, setValue]: [number, any] = useState(0)
	const [error, setError]: [null | string, any] = useState(null)

	function handleChange (e: any): void {
		const val = e.target.value
		if (val % 1 || val === String) {
			setError('Bagged coins cannot be decimal')
			return
		} 
		setError(null)
		setValue(val)
	}

	return (
		<GridItem
			p='8px 20px'
		>
			<Grid
				alignItems='center'
				justifyContent='space-around'
				title={error ? error : ''}
				width='100%'
				templateColumns='100px 1fr 100px'
				justifyItems='center'
			>
				<FormLabel
					margin='0'
				>
					{label}
				</FormLabel>
				<NumberInput>
					<NumberInputField 
						value={value}
						onChange={handleChange}
						bgColor='#f8f8f8'
						borderColor='rgba(0,0,0,0)'
						borderRadius='none'
						borderBottom='2px solid'
						borderBottomColor='theme_light.text.lighter'
						boxShadow={error ? '0 0 0 2px #E75858' : 'none'}
					/>
				</NumberInput>
			</Grid>
		</GridItem>
	)
}

export default Denomination