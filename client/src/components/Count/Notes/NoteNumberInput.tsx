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
import { CountActions } from '../utils/API'
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
	const { state, dispatch } = useContext(CountContext)
	const inVal = state.data.notes[denomination]
	const [error, setError]: [null | string, Dispatch<SetStateAction<any>>] = useState(null)
	const [value, setValue]: [null | undefined | string | number, Dispatch<SetStateAction<any>>] = useState(null)

	useEffect(() => {
		setValue(inVal / step)
	}, [inVal, step])

	const handleNumberChange = (v: any): void => {
		const noteNumber = Number(v)
		if (v === '' || v === undefined || v === null) setValue('')
		else setValue(noteNumber)
		const val = noteNumber * step
		const nanCheck = isNaN(val)
		const zeroCheck = val < 0
		const stepCheck = (val > 0 && val % step)
		if (nanCheck) {
			setError(`Error in [handleNumberChange] at nanCheck: value is not a number: ${val}`)
			return
		}
		if (zeroCheck) {
			setError(`Error in [handleNumberChange] at zeroCheck: value is bellow zero: ${val}`)
			return
		}
		if (stepCheck) {
			setError(`Error in [handleNumberChange] at stepCheck: value is an incompatible ammount: ${val}`)
			return
		}
		setError(null)
		const payload = {
			[denomination]: val
		}
		dispatch({
			type: CountActions.UPDATE_NOTES,
			payload,
		})
	}

	return (
		<NumberInput
			px='2em'
			onChange={handleNumberChange}
			value={value || undefined}
		>
			<NumberInputField 
				bgColor='#f8f8f8'
				borderColor='rgba(0,0,0,0)'
				borderRadius='none'
				borderBottom='2px solid'
				borderBottomColor='theme_light.text.lighter'
				boxShadow={error ? '0 0 0 2px #E75858' : ''}
				title={`Number of individual ${label} notes`}
			/>
		</NumberInput>
	)
}

export default NoteNumberInput