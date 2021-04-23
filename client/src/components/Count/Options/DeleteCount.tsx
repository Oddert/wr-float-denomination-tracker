import React from 'react'

import {
	MenuItem,
} from '@chakra-ui/react'
import {
	DeleteIcon,
} from '@chakra-ui/icons'

const DeleteCount: React.FC = () => {
	return (
		<MenuItem
			icon={<DeleteIcon />}
		>
			Delete Count
		</MenuItem>
	)
}

export default DeleteCount