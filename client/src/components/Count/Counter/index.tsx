import React, { useState, useContext } from 'react'
import {
	InputGroup,
	FormLabel,
	Box,
} from '@chakra-ui/react'

import Input from '../../base/Input'

import DropMenu from './DropMenu'

import CountContext from '../utils/CountContext'
import { CountActions, formatReadableName } from '../utils/API'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

interface Props {
	label: string
	dispatchType: CountActions
	stateAssignment: 'counter' | 'supervisor'
}

const Counter: React.FC<Props> = ({
	label,
	dispatchType,
	stateAssignment,
}) => {
	const { state, dispatch } = useContext(CountContext)
	const partnerList = useSelector((s: any) => s.auth.partnerList)
	const [showMenu, setShowMenu] = useState(false)
	const [filteredList, setFilteredList] = useState(partnerList)

	const onChange = (e: any) => dispatch({
		type: dispatchType, 
		payload: {
			[stateAssignment]: e.target.value,
		},
	})

	const handleFocus = () => {
		setShowMenu(true)
	}

	const handleBlur = () => {
		setTimeout(() => {
			setShowMenu(false)
		}, 500)
	}

	const handleDropDownSelect = (each: any) => {
		console.log('Clicked ', each.shortUid)
		dispatch({
			type: dispatchType, 
			payload: {
				[stateAssignment]: formatReadableName(each),
				[`${stateAssignment}Id`]: each.id
			},
		})
		setShowMenu(false)
	}

	const handleKeyDown = (e: any) => {
		if (!(e.keyCode === 13)) return
		if (filteredList.length < 1) return
		const selected = filteredList[0]
		dispatch({
			type: dispatchType, 
			payload: {
				[stateAssignment]: formatReadableName(selected),
				[`${stateAssignment}Id`]: selected.id
			},
		})
		setShowMenu(false)
	}

	useEffect(() => {
		const createdList = partnerList
			.filter((each: any) => {
				if (!/\w+/.test(state[stateAssignment])) return true
				const names = [each.firstName, each.middleNames, each.lastName]
				const combinedAttrs = `${each.id}${each.shortUid}${names.join('')}`
				const rawInputReg = new RegExp(state[stateAssignment], 'gi')
				let res = false 
				if (rawInputReg.test(combinedAttrs)) res = true
				if (each.firstName && each.lastName) {
					const firstInitial = each.firstName.substring(0,1)
					const secondInitial = each.lastName.substring(0,1)
					const initialRegexp = new RegExp(`${firstInitial}${secondInitial}`, 'gi')
					if (initialRegexp.test(state[stateAssignment])) res = true
				}
				return res
			})
			setFilteredList(createdList)
		// eslint-disable-next-line react-hooks/exhaustive-deps		
	}, [state[stateAssignment]])

	return (
		<InputGroup
			display='flex'
			flexDirection='column'
			onBlur={handleBlur}
			onFocus={handleFocus}
			onKeyDown={handleKeyDown}
		>
			<FormLabel>
				{ label }
			</FormLabel>
			<Box
				px='1rem'
				position='relative'
			>
				<Input 
					value={state[stateAssignment]} 
					onChange={onChange}
					marginBottom='0px'
				/>
				<DropMenu 
					formatReadableName={formatReadableName}
					handleDropDownSelect={handleDropDownSelect}
					showMenu={showMenu}
					filteredList={filteredList}
				/>
			</Box>
		</InputGroup>
	)
}

export default Counter