import React, { useContext, useState } from 'react'
import {
	FormLabel,
	GridItem,
	NumberInput,
	NumberInputField,
	Grid,
} from '@chakra-ui/react'
import AddCountContext from './AddCountContext'
import { CountActions } from './API'

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
	const { state, dispatch } = useContext(AddCountContext)
	const value = state.data.loose[denomination]
	const [error, setError]: [null | string, any] = useState(null)

	function handleChange (e: any): void {
		const val = Number(e.target.value) * 100
		if (val % 1 || isNaN(val) || val % step) {
			setError('Invalid input, please check')
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
						boxShadow={error ? '0 0 0 2px #E75858' : 'none'}
						title={`Amount of ${label.toLowerCase()} in format £0.00`}
					/>
				</NumberInput>
			</Grid>
		</GridItem>
	)
}

export default Denomination