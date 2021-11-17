import React, { 
	useContext, 
	useState, 
	useEffect, 
	SetStateAction, 
	Dispatch, 
	ChangeEvent,
	KeyboardEvent,
} from 'react'
import {
	useMediaQuery,
	FormLabel,
	GridItem,
	NumberInput,
	NumberInputField,
	Text,
	Grid,
} from '@chakra-ui/react'
import CountContext from '../utils/CountContext'
import { CountActions, sanitiseNumberInputVal  } from '../utils/API'

interface Props {
	label: string
	step: number,
	denomination: string
	display?: 'pound' | 'pence'
}

// type Labels = '£5' | '£2' | '£1' | '50p' | '20p' | '10p' | '5p' | '2p' | '1p'
// type Denominations = 'note_five' | 'pound_two' | 'pound_one' | 'pence_fifty' | 'pence_twenty' | 'pence_ten' | 'pence_five' | 'pence_two' | 'pence_one'
// const denominations = {
// 	'£2': 'pound_two',
// 	'£1': 'pound_one',
// 	'50p': 'pence_fifty',
// 	'20p': 'pence_twenty',
// 	'10p': 'pence_ten',
// 	'5p': 'pence_five',
// 	'2p': 'pence_two',
// 	'1p': 'pence_one',
// }

const Denomination: React.FC<Props> = ({
	label,
	step,
	denomination,
}) => {
	const { state, dispatch } = useContext(CountContext)
	const inVal = state.data.bagged[denomination]
	const [error, setError]: [null | string, Dispatch<SetStateAction<any>>] = useState(null)
	const [value, setValue]: [null | undefined | string | number, Dispatch<SetStateAction<any>>] = useState(null)

	const smallScreen = useMediaQuery('(max-width: 760px)')
	// label = `bagged: ${label}`

	useEffect(() => {
		// console.log('set value to:', inVal)
		setValue(inVal)
	}, [inVal])

	function handleChange (e: ChangeEvent<HTMLInputElement>): void {
		// console.log(v)
		const v = e.target.value
		const valueAsumber = Math.round(Number(v) * step)
		const val = (v === '' || v === undefined || v === null) ? null : valueAsumber
		// setValue(val)

		if (valueAsumber % 1 || isNaN(valueAsumber)) {
			setError('Invalid input, please check')
			return
		}
		setError(null)
		const payload = {
			[denomination]: val
		}
		dispatch({
			type: CountActions.UPDATE_BAG,
			payload,
		})
	}

	function handleKeyDown (e: KeyboardEvent<object>) {
		const { keyCode } = e
		if (keyCode < 38 || keyCode > 40) return
		// console.log(keyCode)
		if (keyCode === 38) {
			const changeVal = Number(value) + step
			if (changeVal < 0) return
			dispatch({
				type: CountActions.UPDATE_BAG,
				payload: {
					[denomination]: changeVal
				}
			})
		}
		if (keyCode === 40) {
			const changeVal = Number(value) - step
			if (changeVal < 0) return
			dispatch({
				type: CountActions.UPDATE_BAG,
				payload: {
					[denomination]: changeVal
				}
			})
		}
		// L 65
		if (keyCode === 68) {
			// FUTURE: could be used to tab with arrow keys
			// dissregarded for now due to clash concerns with select and navigation
			// const els = document.querySelectorAll('.tab_jump')
			// let us: number = 0
			// els.forEach((each, idx) => {
			// 	if (each.className.includes(`bag_${denomination}`)) us = idx
			// })
			// const target = us + 1
			// console.log(target, els.length)
			// if (target >= els.length) return
			// console.log(els, us, els[target])
			// els[target].focus()
		}
	}

	function convertToDisplay (val: number): string {
		return `£${val / 100}`
	}

	const sideColumns = '3fr'
	const inputColumn = smallScreen ? '6fr' : '4fr'

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
					{label} {
					// String(sanitiseNumberInputVal(value, step))
					}
				</FormLabel>
				<NumberInput
					value={sanitiseNumberInputVal(typeof value === 'number' ? value/step : value, step)}
					>
					<NumberInputField 
						value={sanitiseNumberInputVal(typeof value === 'number' ? value/step : value, step)}
						onKeyDown={handleKeyDown}
						onChange={handleChange}
						bgColor='#f8f8f8'
						borderColor='rgba(0,0,0,0)'
						borderRadius='none'
						borderBottom='2px solid'
						borderBottomColor='theme_light.text.lighter'
						boxShadow={error ? '0 0 0 3px #E75858' : 'none'}
						title={`The number of ${label} bags. Each bag is £${(step / 100).toFixed(2)}`}
						className={`tab_jump bag_${denomination}`}
					/>
				</NumberInput>
				<Text
					p='0'
					color='theme_light.text.invisable'
					title={`Value of ${label} bags.`}
				>
					{
						convertToDisplay(typeof value === 'number' ? value : 0)
					}
				</Text>
			</Grid>
		</GridItem>
	)
}

export default Denomination