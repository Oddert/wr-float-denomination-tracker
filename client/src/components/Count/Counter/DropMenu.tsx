import React from 'react'
import { useSelector } from 'react-redux'

import {
	Flex,
	UnorderedList,
	ListItem,
	Button,
} from '@chakra-ui/react'

import {
	MdSubdirectoryArrowLeft
} from 'react-icons/md'

interface Props {
	formatReadableName: (each: any) => string
	handleDropDownSelect: (each: any) => void 
	showMenu: boolean
	filteredList: {}[]
}

const DropMenu: React.FC<Props> = ({
	formatReadableName,
	handleDropDownSelect,
	showMenu,
	filteredList
}) => {
	const { userListUpdated } = useSelector((s: any) => s.auth)
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
							.map((each: any, idx: number) => 
								<ListItem
									listStyleType='none'
									key={each.id}
								>
									<Button 
										key={each.id}
										p='4px'
										variant='ui'
										mx='0px'
										my='0px'
										borderRadius='0px'
										width='100%'
										justifyContent='flex-start'
										bgColor='#fff'
										border='none'
										onClick={() => handleDropDownSelect(each)}
										display='flex'
										justifyItems='space-between'
									>
										<span>
											{
												formatReadableName(each)
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