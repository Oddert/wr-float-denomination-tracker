import React, {
	useState,
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
} from 'react'
import { 
	NumberInput, 
	NumberInputField, 
} from '@chakra-ui/number-input'

import CountContext from '../utils/CountContext'
import { sanitiseNumberInputVal } from '../utils/API'
import { CountActions } from '../utils/API'

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
		// console.log('### updating from inVal', inVal, (inVal * step) / 100)
		if (typeof inVal === 'number') setValue(inVal / 100)
		else setValue('')
	}, [inVal, step])

	const handleValueChange = (v: string): void => {
		// console.log(v)
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
			[denomination]: (v === '' || v === null || v === undefined) ? null : penceValue
		}
		dispatch({
			type: CountActions.UPDATE_NOTES,
			payload,
		})
	}

	return (
		<NumberInput
			px='2em'
			title={`Number of individual ${label} notes ${error ? '\n' + error : ''}`}
			value={sanitiseNumberInputVal(value, step)}
		>
			<NumberInputField 
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange(e.target.value)}
				value={sanitiseNumberInputVal(value, step)}
				bgColor='#f8f8f8'
				borderColor='rgba(0,0,0,0)'
				borderRadius='none'
				borderBottom='2px solid'
				borderBottomColor='theme_light.text.lighter'
				boxShadow={error ? '0 0 0 2px #E75858' : ''}
				className='tab_jump'
			/>
		</NumberInput>
	)
}

export default NoteNumberInput