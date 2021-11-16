import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

import { 
	Button,
} from '@chakra-ui/react'

// import { FlashCatts } from '../../../global'
// import { uiFlashWriteOne } from '../../../actions'
import { saveExisting, saveNew } from './utils'
import CountContext from '../utils/CountContext'

interface Props {
	edit?: boolean
}

const Close: React.FC<Props> = ({
	edit
}) => {
	const { state } = useContext(CountContext)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleClick = () => {
		if (edit) {
			console.log('Send ajax to PUT, show flash')
			saveExisting(state, dispatch, () => {
				navigate(-1)
			})
		} else {
			console.log('Perform Validation, Show confirmation, send ajax to POST, show flash')
			saveNew(state, dispatch, (res: any) => {
				return navigate(-1)
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