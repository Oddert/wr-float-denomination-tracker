import React from 'react'

import {
	Button,
	Flex,
} from '@chakra-ui/react'
import {
	ChevronRightIcon,
} from '@chakra-ui/icons'

const SaveInterface: React.FC = () => {
	return (
		<Flex
			w='100%'
			border='1px soid red'
			alignItems='center'
			justifyContent='center'
			py='3em'
		>
			<Button
				variant='link'
				size='lg'
				my='16px'
			>
				Save
			</Button>
			<Button
				variant='outline'
				size='lg'
				mx='3em'
			>
				Save and Close
			</Button>
			<Button
				size='lg'
				py='12px'
			>
				Next Count <ChevronRightIcon />
			</Button>
		</Flex>
	)
}

export default SaveInterface