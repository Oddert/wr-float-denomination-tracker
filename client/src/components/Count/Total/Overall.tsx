import React from 'react'

import {
	Text,
} from '@chakra-ui/react'

interface Props {
	total: any
}

const Overall: React.FC<Props> = ({
	total
}) => {
	return (
		<Text
			// fontWeight='bold'
			fontSize='32px'
		>
			{
				(total / 100).toFixed(2)
			}
		</Text>
	)
}

export default Overall