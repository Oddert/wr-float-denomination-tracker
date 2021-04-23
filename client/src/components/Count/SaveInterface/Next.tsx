import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

import { 
	Button,
} from '@chakra-ui/react'
import {
	ChevronRightIcon,
} from '@chakra-ui/icons'

import CountContext from '../utils/CountContext'
import { FlashCatts } from '../../../global'
import { saveExisting, saveNew } from './utils'
import { uiFlashWriteOne } from '../../../actions/'

interface Props {
	edit?: boolean
}

const Next: React.FC<Props> = ({
	edit
}) => {
	const { state } = useContext(CountContext)
	const dispatch = useDispatch()
	const history = useHistory()

	const handleClick = () => {
		if (edit) {
			console.log('Send ajax to PUT, redirect to /count/new')
			saveExisting(state, dispatch, () => {
				history.push('/count/new')
			})
		} else {
			console.log('Perform Validation, Show confirmation, send ajax to POST, redirect to /count/new')
			saveNew(state, dispatch, (res: any) => {
				history.push('/count/new')
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