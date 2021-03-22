import React, {
	useState,
	Dispatch,
	SetStateAction,
	useContext,
} from 'react'
import { 
	NumberInput, 
	NumberInputField, 
} from '@chakra-ui/number-input'

import CountContext from '../utils/CountContext'
import { CountActions, sanitiseNumberInputVal } from '../utils/API'
import { useEffect } from 'react'

interface Props {
	denomination: string
	step: number
	label: string
}

const NoteNumberInput: React.FC<Props> = ({
	denomination,
	step,
	label,
}) => {
	const [error, setError]: [null | string, Dispatch<SetStateAction<any>>] = useState(null)
	const { state, dispatch } = useContext(CountContext)
	const inVal = state.data.notes[denomination]
	const [value, setValue]: [null | undefined | string | number, Dispatch<SetStateAction<any>>] = useState(null)

	useEffect(() => {
		setValue((inVal * step) / 100)
	}, [inVal, step])

	const handleValueChange = (v: any): void => {
		const poundValue = Number(v)
		const penceValue = poundValue * 100
		
		if (v === '' || v === undefined || v === null) setValue('')
		else setValue(v)
		
		const stepAsPound = (step / 100)
		const val = poundValue / stepAsPound

		const nanCheck = isNaN(val)
		const zeroCheck = val < 0

		const stepCheck = (val > 0 && poundValue % stepAsPound)
		if (nanCheck) {
			setError(`Error in [handleValueChange] at "Nan Check": value is not a number: ${val}`)
			return
		}
		if (zeroCheck) {
			setError(`Error in [handleValueChange] at "Zero Check": value is bellow zero: ${val}`)
			return
		}
		if (stepCheck) {
			// console.log(poundValue, stepAsPound, poundValue % stepAsPound)
			setError(`Error in [handleValueChange] at "Step Check": value is an incompatible ammount: ${val}`)
			return
		}
		setError(null)
		const payload = {
			[denomination]: penceValue
		}
		dispatch({
			type: CountActions.UPDATE_NOTES,
			payload,
		})
	}

	return (
		<NumberInput
			px='2em'
			onChange={handleValueChange}
			value={sanitiseNumberInputVal(value, step)}
			title={`Number of individual ${label} notes ${error ? '\n' + error : ''}`}
		>
			<NumberInputField 
				bgColor='#f8f8f8'
				borderColor='rgba(0,0,0,0)'
				borderRadius='none'
				borderBottom='2px solid'
				borderBottomColor='theme_light.text.lighter'
				boxShadow={error ? '0 0 0 2px #E75858' : ''}
			/>
		</NumberInput>
	)
}

export default NoteNumberInput