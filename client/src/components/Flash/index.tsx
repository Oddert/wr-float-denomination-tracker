import React from 'react'
import { useSelector } from 'react-redux'

import {
	Flex,
} from '@chakra-ui/react'

import SingleFlash from './SingleFlash'

const Flash: React.FC = () => {
	const { flash } = useSelector((s: any) => s.ui)
	return (
		<Flex
			position='fixed'
			bottom='10px'
			left='10px'
			w='40vw'
			direction='column'
		>
			{
				flash.map((each: any, idx: any) => (
					<SingleFlash 
						key={idx}
						{...each}
					/>
				))
			}
		</Flex>
	)
}

export default Flash