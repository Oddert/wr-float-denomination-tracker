import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

import { 
	Button,
} from '@chakra-ui/react'
import {
	ChevronRightIcon,
} from '@chakra-ui/icons'

import CountContext from '../utils/CountContext'
import { saveExisting, saveNew } from './utils'

interface Props {
	edit?: boolean
}

const Next: React.FC<Props> = ({
	edit
}) => {
	const { state } = useContext(CountContext)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleClick = () => {
		if (edit) {
			console.log('Send ajax to PUT, redirect to /count/new')
			saveExisting(state, dispatch, () => {
				navigate('/count/new')
			})
		} else {
			console.log('Perform Validation, Show confirmation, send ajax to POST, redirect to /count/new')
			saveNew(state, dispatch, (res: any) => {
				navigate('/count/new')
			})
		}
	}

	return (
		<Button
			size='lg'
			py='12px'
			onClick={handleClick}
		>
			Save &#38; Next <ChevronRightIcon />
		</Button>
	)
}

export default Next