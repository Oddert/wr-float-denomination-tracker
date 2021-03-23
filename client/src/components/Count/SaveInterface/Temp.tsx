import React, { useContext, useState } from 'react'

import {
	Button,
	Popover,
	PopoverTrigger,
	PopoverContent,
	// PopoverArrow,
	PopoverCloseButton,
	PopoverHeader,
	PopoverBody,
} from '@chakra-ui/react'

import CountContext from '../utils/CountContext'
import { validateCount } from '../utils/API'

const Temp: React.FC = () => {
	const [response, setResponse] = useState({
		code: 'pending...',
		message: '',
		verified: true
	})
	const { state } = useContext(CountContext)

	const handleClick = () => {
		const res = validateCount(state)
		console.log(res)
		setResponse(res)
	}

	return (
		<Popover>
			<PopoverTrigger>
				<Button
					variant='ui'
					onClick={handleClick}
				>
					Rate my count
				</Button>
			</PopoverTrigger>
			<PopoverContent>
				<PopoverCloseButton />
				<PopoverHeader>({response.verified ? 'Verified' : 'Un-verified'}) {response.code}</PopoverHeader>
				<PopoverBody>{response.message}</PopoverBody>
			</PopoverContent>
		</Popover>
	)
}

export default Temp