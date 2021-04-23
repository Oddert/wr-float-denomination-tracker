import React, { useContext } from 'react'

import { 
	Button,
} from '@chakra-ui/react'
import CountContext from '../utils/CountContext'

import { useDispatch } from 'react-redux'
import { saveExisting, saveNew } from './utils'
import { uiFlashWriteOne } from '../../../actions'
import { FlashCatts } from '../../../global'
import { useHistory } from 'react-router'

interface Props {
	edit?: boolean
}

const Save: React.FC<Props> = ({
	edit
}) => {
	const history = useHistory()
	const { state } = useContext(CountContext)
	const dispatch = useDispatch()

	const handleClick = () => {
		if (edit) {
			console.log('Send ajax to PUT, show flash')
			// optional perform validation and show popup
			console.log(state)
			// return
			saveExisting(state, dispatch)
		} else {
			console.log('Send ajax POST, show flash')
			saveNew(state, dispatch, (res: any) => {
				console.log(res)
				const catt: FlashCatts = res.validation.code
				if (res.status === 200) {
					dispatch(uiFlashWriteOne('New count created successfully', `Count status: ${catt}`, 'complete', 8000))
					const editUrl = `/count/${res.count.id}`
					console.log('redirecting to: ', editUrl)
					history.push(editUrl)
				} else {
					dispatch(uiFlashWriteOne('There was an issue posting the new count', res.errorMessage || res.responseMessage || '', catt, 8000))
				}
			})
		}
	}

	return (
		<Button
			variant='link'
			size='lg'
			my='16px'
			onClick={handleClick}
		>
			Save
		</Button>
	)
}

export default Save