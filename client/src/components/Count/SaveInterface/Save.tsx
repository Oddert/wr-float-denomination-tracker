import React from 'react'

import { 
	Button,
} from '@chakra-ui/react'

interface Props {
	edit?: boolean
}

const Save: React.FC<Props> = ({
	edit
}) => {

	const handleClick = () => {
		if (edit) console.log('Send ajax, show flash')
		else console.log('Send ajax, show flash')
		// else console.log('Perform Validation, Show confirmation, send ajax, show flash')
	}

	return (
		<Button
			variant='link'
			size='lg'
			my='16px'
			onClick={handleClick}
		>
			Save
		</Button>
	)
}

export default Save