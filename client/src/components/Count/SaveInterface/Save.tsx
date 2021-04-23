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
			// console.log(state)
			// return
			saveExisting(state, dispatch)

		} else {
			console.log('Send ajax POST, show flash')
			saveNew(state, dispatch, (res: any) => {
				const editUrl = `/count/${res.count.id}`
				console.log('redirecting to: ', editUrl)
				return history.push(editUrl)
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