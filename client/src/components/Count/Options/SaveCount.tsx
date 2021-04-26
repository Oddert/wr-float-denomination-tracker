import React, { useContext } from 'react'

import {
	MenuItem,
	Icon
} from '@chakra-ui/react'

import {
	MdSave
} from 'react-icons/md'
import { saveExisting } from '../SaveInterface/utils'
import CountContext from '../utils/CountContext'
import { useDispatch } from 'react-redux'

const SaveCount: React.FC = () => {
	const { state } = useContext(CountContext)
	const dispatch = useDispatch()

	const handleClick = () => {
		saveExisting(state, dispatch)
	}

	return (
		<>
			<MenuItem
				onClick={handleClick}
				icon={<Icon as={MdSave} />}
			>
				Save
			</MenuItem>
		</>
	)
}

export default SaveCount