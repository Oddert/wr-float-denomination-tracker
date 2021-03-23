import React from 'react'

import {
	Button,
	Flex,
} from '@chakra-ui/react'

import {
	ChevronRightIcon,
} from '@chakra-ui/icons'
import Temp from './Temp'

// import { StateType } from './utils/types'

interface Props {
	edit: boolean | undefined
}

const SaveInterface: React.FC<Props> = ({
	edit
}) => {

	

	return (
		<Flex
			w='100%'
			border='1px dashed'
			borderColor='rgba(0,0,0,0)'
			alignItems='center'
			justifyContent='center'
			py='2em'
			my='3em'
			position='sticky'
			bottom='0px'
		>
			<Temp />
			<Button
				variant='link'
				size='lg'
				my='16px'
			>
				Save
			</Button>
			<Button
				variant='outline'
				bgColor='#fff'
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