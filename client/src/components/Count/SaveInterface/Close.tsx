import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

import { 
	Button,
} from '@chakra-ui/react'

import { FlashCatts } from '../../../global'
import { saveExisting, saveNew } from './utils'
import { uiFlashWriteOne } from '../../../actions'
import CountContext from '../utils/CountContext'

interface Props {
	edit?: boolean
}

const Close: React.FC<Props> = ({
	edit
}) => {
	const { state } = useContext(CountContext)
	const dispatch = useDispatch()
	const history = useHistory()

	const handleClick = () => {
		if (edit) {
			console.log('Send ajax to PUT, show flash')
			saveExisting(state, dispatch, () => {
				history.goBack()
			})
		} else {
			console.log('Perform Validation, Show confirmation, send ajax to POST, show flash')
			saveNew(state, dispatch, (res: any) => {
				return history.goBack()
			})
		}
	}

	return (
		<Button
			variant='outline'
			bgColor='#fff'
			size='lg'
			mx='3em'
			onClick={handleClick}
		>
			Save and Close
		</Button>
	)
}

export default Close