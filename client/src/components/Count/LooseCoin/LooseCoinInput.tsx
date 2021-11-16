/** @jsxRuntime classic */
/** @jsx jsx */
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
import { css, jsx } from '@emotion/react'

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
		console.log(inVal)
		if (typeof inVal === 'number') setValue((inVal / 100).toFixed(2))
		else setValue(undefined)
	}, [inVal])

	function handleChange (v: any): void {
		// console.log(typeof v, v)
		setValue(v)
	}

	const handleFocusLeave = (e: any) => {
		// console.log('focusLeve', new Date().toLocaleTimeString())
		const v = e.target.value
		
		const valueAsNumber = Math.floor(Number(v) * 100)
		// console.log({ valueAsNumber, inVal })
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
				{/* <input 
					type='number' 
					value={value} 
					onChange={() => {}} 
					css={css({
						color: '#a0aec0',
						backgroundColor: '#F8F8F8',
						borderBottom: '2px solid',
						borderBottomColor: '#c4c4c4',
						padding: '0 16px 0 32px',
						fontSize: '1rem',
						paddingInlineStart: '16px',
						paddingInlineEnd: '32px',
						lineHeight: '24px',
						outlineOffset: '2px',
						outlineWidth: '2px',
						height: '40px',
						fontWeight: '400',
						transitionProperty: 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
						transitionDuration: '0.2s',
						_hover: {
							borderColor: '#cbd5e0',
						}
					})}
				/> */}
			</Grid>
		</GridItem>
	)
}

export default Denomination