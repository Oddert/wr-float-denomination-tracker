import React, { 
	useState, 
	SetStateAction, 
	Dispatch, 
	useContext 
} from 'react'
import { 
	Grid,
	GridItem,
	FormLabel,
	NumberInput,
	NumberInputField,
} from '@chakra-ui/react'
import { CountActions } from '../utils/API'
import CountContext from '../utils/CountContext'

interface Props {
	label: string
	step: number
	denomination: string
}

const NoteInput: React.FC<Props> = ({
	label,
	step,
	denomination,
}) => {
	const [error, setError]: [null | string, Dispatch<SetStateAction<any>>] = useState(null)
	// const [value, setValue]: [number, Dispatch<SetStateAction<number>>] = useState(2)
	const { state, dispatch } = useContext(CountContext)
	const value = state.data.notes[denomination]

	const handleNumberChange = (v: string): void => {
		const val = Math.round(Number(v) * step)
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

	const handleValueChange = (v: string): void => {
		const poundValue = Number(v)
		const penceValue = Math.round(poundValue * 100)
		const stepAsPound = (step / 100)
		const val = poundValue / stepAsPound

		const nanCheck = isNaN(val)
		const zeroCheck = val < 0
		const stepCheck = (val > 0 && poundValue % stepAsPound)
		if (nanCheck) {
			setError(`Error in [handleValueChange] at nanCheck: value is not a number: ${val}`)
			return
		}
		if (zeroCheck) {
			setError(`Error in [handleValueChange] at zeroCheck: value is bellow zero: ${val}`)
			return
		}
		if (stepCheck) {
			setError(`Error in [handleValueChange] at stepCheck: value is an incompatible ammount: ${val}`)
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

	const numPad='2em'

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
					px={numPad}
					value={value === 0 ? undefined : value / step}
					onChange={handleNumberChange}
				>
					<NumberInputField 
						bgColor='#f8f8f8'
						borderColor='rgba(0,0,0,0)'
						borderRadius='none'
						borderBottom='2px solid'
						borderBottomColor='theme_light.text.lighter'
						boxShadow={error ? '0 0 0 2px #E75858' : 'none'}
						title={`Number of individual ${label} notes`}
					/>
				</NumberInput>
				<NumberInput
					px={numPad}
					value={value === 0 ? '' : value / 100}
					onChange={handleValueChange}
				>
					<NumberInputField 
						bgColor='#f8f8f8'
						borderColor='rgba(0,0,0,0)'
						borderRadius='none'
						borderBottom='2px solid'
						borderBottomColor='theme_light.text.lighter'
						boxShadow={error ? '0 0 0 2px #E75858' : 'none'}
						title={`£ value of all ${label} notes`}
					/>
				</NumberInput>
			</Grid>
		</GridItem>
	)
}

export default NoteInput