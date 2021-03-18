import React, { SetStateAction, useContext, useState, Dispatch, useEffect } from 'react'
import {
	FormLabel,
	GridItem,
	NumberInput,
	NumberInputField,
	Grid,
} from '@chakra-ui/react'
import CountContext from './utils/CountContext'
import { CountActions } from './utils/API'

interface Props {
	label: string
	denomination: string
	step: number
	display?: 'pound' | 'pence'
}

const Denomination: React.FC<Props> = ({
	label,
	denomination,
	step,
}) => {
	const { state, dispatch } = useContext(CountContext)
	const inVal = state.data.loose[denomination]
	const [error, setError]: [null | string, any] = useState(null)
	const [value, setValue]: [string | number | undefined, Dispatch<SetStateAction<any>>] = useState(undefined)

	useEffect(() => {
		setValue(inVal / 100)
	}, [inVal])

	function handleChange (v: any): void {
		const value = Number(v)
		const val = Math.floor(value * 100)

		setValue(v)

		const minimumValueTest = (val * 100) % 1
		const nanTest = isNaN(val)
		const outOfStepTest = val % step

		if (minimumValueTest) {
			setError(`Error [LooseCoinInput] at minimumValueTest: value entered is bellow the value of this denomination: value: ${v}, denomination: ${step / 100}`)
			return
		}
		if (nanTest) {
			setError(`Error [LooseCoinInput] at minimumValueTest: value entered is not a number: value: ${v}`)
			return
		}
		if (outOfStepTest) {
			setError(`Error [LooseCoinInput] at minimumValueTest: value entered is incompatible with the denomination's min value: value: ${v}, denomination: ${step / 100}`)
			return
		}
		const payload = {
			[denomination]: val
		}
		setError(null)
		dispatch({
			type: CountActions.UPDATE_LOOSE,
			payload,
		})
	}

	const handleFocusLeave = (value: any) => {
		const val: number = Number(value)
		if (isNaN(val)) return
		else if (!error) setValue(val.toFixed(2))
	}
	
	const sideColumns = '3fr'
	const inputColumn = '4fr'

	return (
		<GridItem
			p='8px 20px'
		>
			<Grid
				alignItems='center'
				justifyContent='space-around'
				title={error ? error : ''}
				width='100%'
				templateColumns={`${sideColumns} ${inputColumn} ${sideColumns}`}
				justifyItems='center'
			>
				<FormLabel
					margin='0'
				>
					{label}
				</FormLabel>
				<NumberInput
					onChange={handleChange}
					value={value}
					onBlur={handleFocusLeave}
				>
					<NumberInputField 
						bgColor='#f8f8f8'
						borderColor='rgba(0,0,0,0)'
						borderRadius='none'
						borderBottom='2px solid'
						borderBottomColor='theme_light.text.lighter'
						boxShadow={error ? '0 0 0 2px #E75858' : 'none'}
						title={`Amount of ${label.toLowerCase()} in format £0.00${error ? '\n' + error : ''}`}
					/>
				</NumberInput>
			</Grid>
		</GridItem>
	)
}

export default Denomination