import React from 'react'
import { 
	Grid,
	GridItem,
	FormLabel,
} from '@chakra-ui/react'
import NoteNumberInput from './NoteNumberInput'
import NoteValueInput from './NoteValueInput'

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
	// const [value, setValue]: [number, Dispatch<SetStateAction<number>>] = useState(2)

	return (
		<GridItem
			p='8px 20px'
		>
			<Grid
				alignItems='center'
				justifyContent='space-around'
				width='100%'
				templateColumns='100px 1fr 1fr'
				justifyItems='center'
			>
				<FormLabel
					margin='0'
				>
					{label}
				</FormLabel>
				<NoteNumberInput 
					step={step}
					denomination={denomination}
					label={label}
				/>
				<NoteValueInput
					step={step}
					denomination={denomination}
					label={label} 
				/>
			</Grid>
		</GridItem>
	)
}

export default NoteInput