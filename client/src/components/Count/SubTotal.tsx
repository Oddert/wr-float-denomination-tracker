import React from 'react'

import {
	Box,
	Text,
} from '@chakra-ui/react'

interface Props {
	value: any
	title?: string
}

const SubTotal: React.FC<Props> = ({
	value,
	title,
}) => {
	return (
		<Box
			p='20px'
		>
			<Text
				fontSize='18px'
				color='theme_light.text.darker'
				textAlign='right'
				title={title || ''}
			>
				Total: { (value / 100).toFixed(2) }
			</Text>
		</Box>
	)
}

export default SubTotal