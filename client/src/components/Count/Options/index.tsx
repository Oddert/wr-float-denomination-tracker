import React from 'react'

import { 
	Flex, 
	IconButton, 
	Menu, 
	MenuButton, 
	// MenuItem, 
	MenuList 
} from '@chakra-ui/react'
import { 
	HamburgerIcon 
} from '@chakra-ui/icons'

import DeleteCount from './DeleteCount'
import SaveCount from './SaveCount'

const Options: React.FC = () => {
	const fs = 16
	return (
		<Flex
			justifyContent='flex-end'
			fontSize={fs}
		>
			<Menu>
				<MenuButton
					
					as={IconButton}
					arial-label='Options'
					icon={<HamburgerIcon fontSize='26px' />}
					variant='ui'
				/>
				<MenuList
					boxShadow='0 5px 10px rgba(0,0,0,.3)'
				>
					<DeleteCount />
					<SaveCount />
				</MenuList>
			</Menu>
		</Flex>
	)
}

export default Options