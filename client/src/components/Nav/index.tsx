import React from 'react'
import {
  Flex,
  Divider,
	UnorderedList,
} from '@chakra-ui/react'
// import { NavLink } from 'react-router-dom'
import NavLink from './NavLink'

interface Props {
  colStart?: any
  colEnd?: any
  rowStart?: any
  rowEnd?: any
}

const Nav: React.FC<Props> = () => {
  return (
    <Flex
			direction='column'
			bgColor='waitrose.primary'
			h='100%'
			textAlign='left'
		>
      <nav>
        <UnorderedList
					styleType='none'
					m='0px'
				>
          <Divider />
					<NavLink to='/repositories' primary='true' current='true'>
						Repositories
					</NavLink>
					<Divider />
					<NavLink to='/counts' primary='true'>
						Counts
					</NavLink>
					<NavLink to='/count/new'>
						Add Count
					</NavLink>
					<NavLink to='/incomplete-counts'>
						Incomplete Counts
					</NavLink>
          <Divider />
					<NavLink to='/users' primary='true'>
						Users
					</NavLink>
          <Divider />
        </UnorderedList>
      </nav>
    </Flex>
  )
}

export default Nav