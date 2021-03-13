import React, { useState } from 'react'
import {
	FormLabel,
	GridItem,
	NumberInput,
	NumberInputField,
	Text,
	Grid,
} from '@chakra-ui/react'

interface Props {
	label: string
	step: number
	display?: 'pound' | 'pence'
}

const Denomination: React.FC<Props> = ({
	label,
	step,
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

	function convertToDisplay (val: number): string {
		return `£${val / 100}`
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
				<Text
					p='0'
					color='theme_light.text.invisable'
				>
					{
						convertToDisplay(value * step)
					}
				</Text>
			</Grid>
		</GridItem>
	)
}

export default Denomination