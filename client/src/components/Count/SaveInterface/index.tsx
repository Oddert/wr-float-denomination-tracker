import React from 'react'

import {
	Flex,
} from '@chakra-ui/react'

// import Temp from './Temp'

import Save from './Save'
import Close from './Close'
import Next from './Next'
// import { StateType } from './utils/types'

interface Props {
	edit: boolean | undefined
}

const SaveInterface: React.FC<Props> = ({
	edit
}) => {  

	return (
		<Flex
			border='1px dashed'
			borderColor='rgba(155,0,0,0)'
			alignItems='center'
			justifyContent='center'
			py='1em'
			my='3em'
			position='sticky'
			bottom='0px'
			flexWrap='wrap'
		>
			{/* <Temp /> */}
			<Save edit={edit} />
			<Close edit={edit} />
			<Next edit={edit} />			
		</Flex>
	)
}

export default SaveInterface