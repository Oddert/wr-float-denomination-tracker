import React from 'react'
import { useSelector } from 'react-redux'

import {
	Flex,
} from '@chakra-ui/react'

import {
	ReduxStateType,
} from '../../global'

import SingleFlash from './SingleFlash'

const Flash: React.FC = () => {
	const { flash } = useSelector((s: ReduxStateType) => s.ui)
	return (
		<Flex
			position='fixed'
			bottom='10px'
			left='10px'
			w='30vw'
			direction='column'
		>
			{
				flash.map((each: Flash, idx: number) => (
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