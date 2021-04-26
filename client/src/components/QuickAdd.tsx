import React from 'react'

import {
	Box,
	Link,
	Button,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

const QuickAdd: React.FC = () => {
	const h = 50
	return (
		<Box
			position='fixed'
			bottom='0'
			right='0'
		>
			<Button
				as={Link}
				href='/#/count/new'
				h={h}
				borderRadius={h/2}
				fontSize='18px'
				px='30px'
				margin='1rem 2rem'
				
				_hover={{
					textDecoration: 'none',
					borderColor: '#7EC507',
					bgColor: '#7EC507',
				}}
			>
				New Count 
				<AddIcon 
					ml='20px'
				/>
			</Button>
		</Box>
	)
}

export default QuickAdd