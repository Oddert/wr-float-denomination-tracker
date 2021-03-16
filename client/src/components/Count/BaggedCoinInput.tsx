import React, { useContext, useState } from 'react'
import {
	FormLabel,
	GridItem,
	NumberInput,
	NumberInputField,
	Text,
	Grid,
} from '@chakra-ui/react'
import AddCountContext from './AddCountContext'
import { CountActions } from './API'

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
	const { state, dispatch } = useContext(AddCountContext)
	const value = state.data.bagged[denomination]
	const [error, setError]: [null | string, any] = useState(null)

	function handleChange (e: any): void {
		console.log(Number(e.target.value))
		const val = Number(e.target.value) * step
		console.log(Number(e.target.value) * step)
		if (val % 1 || isNaN(val)) {
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

	function convertToDisplay (val: number): string {
		return `£${val / 100}`
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
				<NumberInput>
					<NumberInputField 
						value={value}
						onChange={handleChange}
						bgColor='#f8f8f8'
						borderColor='rgba(0,0,0,0)'
						borderRadius='none'
						borderBottom='2px solid'
						borderBottomColor='theme_light.text.lighter'
						boxShadow={error ? '0 0 0 3px #E75858' : 'none'}
						title={`The number of ${label} bags. Each bag is £${(step / 100).toFixed(2)}`}
					/>
				</NumberInput>
				<Text
					p='0'
					color='theme_light.text.invisable'
				>
					{
						convertToDisplay(value)
					}
				</Text>
			</Grid>
		</GridItem>
	)
}

export default Denomination