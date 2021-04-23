import React, { useState } from 'react'

import {
	Box,
	Heading,
	Text,
	Button,
	Flex,
} from '@chakra-ui/react'
import {
	CloseIcon
} from '@chakra-ui/icons'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { uiFlashRemoveOne } from '../../actions'

const SingleFlash: React.FC<any> = ({
	title,
	description,
	catt,
	duration,
	id,
}) => {
	const dispatch = useDispatch()

	const [timer, setTimer]: [any, any] = useState(null)
	const [translate, setTranslate] = useState('translate(-100%, -50%)')

	useEffect(() => {
		setTranslate('translate(0%, 0%)')
		if (duration) {
			setTimer(setTimeout(removeFlash, duration))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	function suspendTimer () {
		setTimer(clearTimeout(timer))
	}

	function removeFlash () {
		setTranslate('translate(-120%, 0%)')
		setTimeout(() => {
			dispatch(uiFlashRemoveOne(id))
		}, 1000)
	}

	function statusColor () {
		switch (catt) {
			case 'unverified':
			case 'info':
				return 'theme_light.info.unverified'
			case 'complete':
				return 'theme_light.info.complete'
			case 'partial':
				return 'theme_light.info.partial'
			case 'danger':
			case 'incomplete':
				return 'theme_light.info.unfinished'
			default:
				return 'theme_light.text.standard'
		}
	}

	const topPadd = '18px'

	return (
		<Box
			bgColor='waitrose.bgLight'
			p='0px 0px 0px 20px'
			my='5px'
			borderLeft='15px solid'
			display='flex'
			alignItems='stretch'
			justifyContent='space-between'
			borderColor={statusColor()}
			boxShadow='5px 5px 10px rgba(0,0,0,.3)'
			transform={translate}
			transition='transform .2s linear'
			onMouseOver={suspendTimer}
			w='100%'
			_hover={{
				bgColor: '#f2f2f2'
			}}
		>
			<Flex
				alignItems='center'
			>
				<Heading
					fontSize='1.2em'
					py={topPadd}
					>
					{
						title
					}
				</Heading>
				<Text
					fontSize='1.1em'
					px='1em'
					py={topPadd}
				>
					{
						description
					}
				</Text>
			</Flex>
			<Button
				h='1mm00%'
				m='0'
				borderRadius='0'
				bgColor='waitrose.bgLight'
				color='theme_light.text.standard'
				border='none'
				_hover={{
					bgColor: 'theme_light.text.invisable'
				}}
				_active={{
					bgColor: 'theme_light.text.light'
				}}
				onClick={removeFlash}
			>
				<CloseIcon />
			</Button>
		</Box>
	)
}

export default SingleFlash