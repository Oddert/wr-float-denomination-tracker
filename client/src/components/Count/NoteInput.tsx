import React, { useState, SetStateAction, Dispatch, useEffect } from 'react'
import {
	Grid,
	GridItem,
	FormLabel,
	NumberInput,
	NumberInputField,
} from '@chakra-ui/react'

interface Props {
	label: string
	step: number
	startValue?: number
}

const NoteInput: React.FC<Props> = ({
	label,
	step,
	startValue,
}) => {
	const [error, setError]: [null | string, Dispatch<SetStateAction<any>>] = useState(null)
	const [value, setValue]: [number, Dispatch<SetStateAction<number>>] = useState(2)

	useEffect(() => {
		if (startValue) setValue(startValue)
	}, [startValue])

	const handleNumberChange = (v: number | string): void => {
		const val = Number(v)
		if (!val) {
			setError(':(')
			return
		}
		setError(null)
		setValue(val)
	}

	const handleValueChange = (v: number | string): void => {
		const val = Number(v) / (step / 100)
		if (!val) {
			setError(':(')
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
				templateColumns='100px 1fr 1fr'
				justifyItems='center'
			>
				<FormLabel
					margin='0'
				>
					{label}
				</FormLabel>
				<NumberInput
					value={value}
					onChange={handleNumberChange}
				>
					<NumberInputField 
						bgColor='#f8f8f8'
						borderColor='rgba(0,0,0,0)'
						borderRadius='none'
						borderBottom='2px solid'
						borderBottomColor='theme_light.text.lighter'
						boxShadow={error ? '0 0 0 2px #E75858' : 'none'}
					/>
				</NumberInput>
				<NumberInput
					value={value * (step / 100)}
					onChange={handleValueChange}
				>
					<NumberInputField 
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

export default NoteInput