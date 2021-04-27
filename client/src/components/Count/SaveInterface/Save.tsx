import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'

import { 
	Button,
} from '@chakra-ui/react'

import CountContext from '../utils/CountContext'

import { saveExisting, saveNew } from './utils'
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
			py='16px'
			onClick={handleClick}
		>
			Save
		</Button>
	)
}

export default Save