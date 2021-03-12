import React from 'react'
import { 
  Flex, 
  Heading, 
  Divider,
	Box,
	Button
 } from '@chakra-ui/react'
 import {
	 ChevronLeftIcon
 } from '@chakra-ui/icons'

interface Props {
  title: string | number
	navWidth?: string | number
}

const Header: React.FC<Props> = ({
  title,
	navWidth
}) => {
  return (
    <Flex
			direction='row'
		>
			<Button
				m='0'
				borderRadius='0'
				width={navWidth ? navWidth : 'auto'}
			>
				<ChevronLeftIcon />
				Exit
			</Button>
			<Flex
				direction='column'
				flex='1'
			>
				<Heading 
					as='h1' 
					size='xl' 
					variant='primary'
					alignSelf='flex-start'
					p='10px 40px'
				>
					{ title }
				</Heading>
				<Box
					padding='0 40px'
				>
					<Divider 
						orientation='horizontal' 
						height='1px' 
						bg='theme_light.text.darker'
					/>
				</Box>
			</Flex>
    </Flex>
  )
}

export default Header