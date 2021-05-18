import React, { SetStateAction, useContext, useState, Dispatch, useEffect } from 'react'
import {
	useMediaQuery,
	FormLabel,
	GridItem,
	NumberInput,
	NumberInputField,
	Grid,
} from '@chakra-ui/react'
import CountContext from '../utils/CountContext'
import { CountActions } from '../utils/API'

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

	const smallScreen = useMediaQuery('(max-width: 760px)')
	// label = `loose ${label}`
	
	useEffect(() => {
		// console.log(inVal)
		if (typeof inVal === 'number') setValue((inVal / 100).toFixed(2))
		else setValue(undefined)
	}, [inVal])

	function handleChange (v: any): void {
		console.log(typeof v, v)
		setValue(v)
	}

	const handleFocusLeave = (e: any) => {
		const v = e.target.value
		// console.log('focusLeve', new Date().toLocaleTimeString())
		
		const valueAsNumber = Math.floor(Number(v) * 100)
		// console.log({ valueAsNumber, inVal })
		if (valueAsNumber === inVal) return
		const val = (v === '' || v === null || v === undefined) ? null : valueAsNumber

		const minimumValueTest = valueAsNumber % 1
		const nanTest = isNaN(valueAsNumber)
		const outOfStepTest = valueAsNumber % step
		const isPartialInput = /\.$/gi.test(v)
		
		if (isPartialInput) {
			setError(`Error [LooseCountInput] at isPartialInput test: value contains a trailling full stop.`)
			return
		}
		if (minimumValueTest) {
			setError(`Error [LooseCoinInput] at minimumValueTest: value entered is bellow the value of this denomination: value: ${v}, denomination: ${step / 100}`)
			return
		}
		if (nanTest) {
			setError(`Error [LooseCoinInput] at nanTest: value entered is not a number: value: ${v}`)
			return
		}
		if (outOfStepTest) {
			setError(`Error [LooseCoinInput] at outOfStepTest: value entered is incompatible with the denomination's min value: value: ${v}, denomination: ${step / 100}`)
			return
		}
		const payload = {
			[denomination]: val
		}
		console.log('dispatching', payload)
		setError(null)
		dispatch({
			type: CountActions.UPDATE_LOOSE,
			payload,
		})
		// if (isNaN(val)) {
		// 	return
		// } else if (!error) {
		// 	const fixedVal = val.toFixed(2)
		// 	setValue(fixedVal)
		// 	// console.log(typeof fixedVal, fixedVal)
		// 	// const payload = {
		// 	// 	[denomination]: fixedVal
		// 	// }
		// 	// dispatch({
		// 	// 	type: CountActions.UPDATE_LOOSE,
		// 	// 	payload,
		// 	// })
		// }
	}
	
	const sideColumns = '3fr'
	const inputColumn = smallScreen ? '6fr' : '4fr'
	// if (label === "loose 50p") console.log(label, value)

	return (
		<GridItem
			p={smallScreen ? '8px 10px' : '8px 20px'}
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
					value={value === null ? undefined : value}
					onBlur={handleFocusLeave}
				>
					<NumberInputField 
						onChange={(e: any) => handleChange(e.target.value)}
						value={value === null ? undefined : value}
						bgColor='#f8f8f8'
						borderColor='rgba(0,0,0,0)'
						borderRadius='none'
						borderBottom='2px solid'
						borderBottomColor='theme_light.text.lighter'
						boxShadow={error ? '0 0 0 2px #E75858' : 'none'}
						title={`Amount of ${label.toLowerCase()} in format £0.00${error ? '\n' + error : ''}`}
						className='tab_jump'
					/>
				</NumberInput>
			</Grid>
		</GridItem>
	)
}

export default Denomination