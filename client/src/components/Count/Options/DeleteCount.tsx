import React, { 
	useState, 
	useRef,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'

import { countsDataWriteAll, uiFlashWriteOne } from '../../../actions'

import {
	MenuItem,
	Button,
	FormControl,
	FormLabel,
	AlertDialog,
	AlertDialogHeader,
	AlertDialogOverlay,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogContent,
	Flex,
	Text,
	AlertDialogCloseButton,
} from '@chakra-ui/react'

import {
	DeleteIcon,
} from '@chakra-ui/icons'

import Select from '../../base/Select'

import initialState from '../../../constants/initialState'
import { Partner } from '../../../global'

const DeleteCount: React.FC = () => {
	const [open, setOpen] = useState(false)
	const [partner, setPartner] = useState(undefined)
	const [busy, setBusy] = useState(false)
	const [modalError, setModalError]: [null | string, any] = useState(null)
	const [selectError, setSelectError]: [null | string, any] = useState(null)
	
	const partners = useSelector((s: typeof initialState) => s.auth.partnerList)
	const dispatch = useDispatch()
	const params: { id: string } = useParams()

	const safetyRef = useRef()
	const history = useHistory()

	const handleChange = (e: any) => {
		setPartner(e.target.value)
		setSelectError(null)
	}

	const handleClick = (e: any) => {
		e.preventDefault()
		setOpen(!open)
	}

	const handleSubmit = (e: any) => {
		if (partner && partner !== '' && partner !== undefined && partner !== 'undefined') {
			setBusy(true)
			const EXT = `/api/v1/count/${params.id}`
			// const EXT = `/test/badly`
			const OPTS = {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' }
			}
			fetch(EXT, OPTS)
				.then(res => res.json())
				.then(res => {
					if (res.status === 200) {
						dispatch(countsDataWriteAll())
						dispatch(uiFlashWriteOne('Count Deleted', '', 'info', 5000))
						history.push('/counts')
					} else {
						setModalError(res.responseMessage || res.errorMessage)
						console.error(res.responseMessage || res.errorMessage)
						setBusy(false)
					}
				})
				.catch(error => {
					setModalError(error.error)
					console.error(error)
					setBusy(false)
				})
		} else {
			setSelectError('Please select yourself from this list.')
		}
	}

	const explicitClose = () => setOpen(false)

	// const explicitOpen = () => setOpen(true)

	return (
		<>
			<AlertDialog
				isOpen={open}
				// @ts-ignore
				leastDestructiveRef={safetyRef}
				size='lg'
				onClose={() => {}}
				closeOnEsc={true}
				closeOnOverlayClick={true}
				blockScrollOnMount={true}

			>
				<AlertDialogOverlay>
					<AlertDialogContent
						w='800px'
					>
						<AlertDialogHeader>
							Are you sure you want to delete this count?
							<AlertDialogCloseButton 
								onClick={explicitClose}
							/>
						</AlertDialogHeader>
						<AlertDialogBody>
							This cannot be undone except by a duty manager.
							<Text
								marginTop='20px'
								color='theme_light.ui.dangerDark'
							>
								{modalError ? modalError : ''}
							</Text>
						</AlertDialogBody>
						<AlertDialogFooter
							flexDirection='row-reverse'
						>
							<FormControl
							>
								<FormLabel
									marginBottom='30px'
								>
									Select your name to confirm the delete:
								</FormLabel>
								<Select
									value={partner}
									onChange={handleChange}
									borderColor={selectError ? 'theme_light.ui.dangerLight' : 'theme_light.text.lighter'}
									title={selectError ? selectError : null}
									_hover={{
										borderColor: selectError ? 'theme_light.ui.dangerDark' : 'theme_light.text.light',
									}}
								>
									<option
										value='undefined'
									>
										-Select Your Partner ID-
									</option>
									{
										partners.map((each: Partner) => 
											<option
												key={each.id}
												value={each.id}
											>
												{
													`${each.firstName}${each.preferredName ? ` (${each.preferredName})` : ''} ${each.lastName} - ${each.tillNumber}`
												}
											</option>
										)
									}
								</Select>
								<Flex
									justifyContent='space-between'
									marginTop='30px'
								>
									<Button
										variant='dangerOutline'
										border='none'
										h='2rem'
										onClick={handleSubmit}
										disabled={busy}
									>
										Delete this count
									</Button>
									<Button
										// @ts-ignore
										ref={safetyRef}
										onClick={explicitClose}
										px='40px'
										disabled={busy}
									>
										Back to Safety
									</Button>
								</Flex>
							</FormControl>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
			<MenuItem
				icon={<DeleteIcon />}
				onClick={handleClick}
			>
				Delete Count
			</MenuItem>
		</>
	)
}

export default DeleteCount