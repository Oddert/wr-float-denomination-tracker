import React from 'react'
import { useSelector } from 'react-redux'

import {
	MdSubdirectoryArrowLeft
} from 'react-icons/md'

import {
	Flex,
	UnorderedList,
	ListItem,
	Button,
} from '@chakra-ui/react'

import { Partner, ReduxStateType } from '../../../global'

interface Props {
	formatReadableName: (partner: Partner) => string
	handleDropDownSelect: (partner: Partner) => void
	showMenu: boolean
	filteredList: Partner[]
}

const DropMenu: React.FC<Props> = ({
	formatReadableName,
	handleDropDownSelect,
	showMenu,
	filteredList
}) => {
	const { userListUpdated } = useSelector((s: ReduxStateType) => s.auth)
	return (
		<Flex
			flexDirection='column'
			position='relative'
			zIndex='1'
		>
			{
				(userListUpdated && showMenu && filteredList.length !== 0) && (
					<UnorderedList
						position='absolute'
						m='0px'
						top='0px'
						background='#fff'
						w='100%'
						boxShadow='0px 5px 10px rgba(0,0,0,.1)'
						borderRadius='5px'
						py='4px'
					>
						{
							filteredList
							.map((partner: Partner, idx: number) => 
								<ListItem
									listStyleType='none'
									key={partner.id}
								>
									<Button 
										key={partner.id}
										p='4px'
										variant='ui'
										mx='0px'
										my='0px'
										borderRadius='0px'
										width='100%'
										justifyContent='flex-start'
										bgColor={idx === 0 ? '#cde6fe' : '#fff'}
										border='none'
										onClick={() => handleDropDownSelect(partner)}
										display='flex'
										justifyItems='space-between'
									>
										<span>
											{
												formatReadableName(partner)
											}
										</span>
										<span>
											{
												(idx === 0) ? <MdSubdirectoryArrowLeft /> : ''
											}
										</span>
									</Button>
								</ListItem>
							)
						}
					</UnorderedList>
				)
			}
		</Flex>
	)
}

export default DropMenu