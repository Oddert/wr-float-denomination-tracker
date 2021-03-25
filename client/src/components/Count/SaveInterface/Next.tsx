import React from 'react'

import { 
	Button,
} from '@chakra-ui/react'
import {
	ChevronRightIcon,
} from '@chakra-ui/icons'

interface Props {
	edit?: boolean
}

const Next: React.FC<Props> = ({
	edit
}) => {

	const handleClick = () => {
		if (edit) console.log('Send ajax to PUT, redirect to /count/new')
		else console.log('Perform Validation, Show confirmation, send ajax to POST, redirect to /count/new')
	}

	return (
		<Button
			size='lg'
			py='12px'
			onClick={handleClick}
		>
			Next Count <ChevronRightIcon />
		</Button>
	)
}

export default Next