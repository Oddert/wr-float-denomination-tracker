import React from 'react'

import { 
	Button,
} from '@chakra-ui/react'

interface Props {
	edit?: boolean
}

const Close: React.FC<Props> = ({
	edit
}) => {

	const handleClick = () => {
		if (edit) console.log('Send ajax to PUT, show flash')
		else console.log('Perform Validation, Show confirmation, send ajax to POST, show flash')
	}

	return (
		<Button
			variant='outline'
			bgColor='#fff'
			size='lg'
			mx='3em'
			onClick={handleClick}
		>
			Save and Close
		</Button>
	)
}

export default Close