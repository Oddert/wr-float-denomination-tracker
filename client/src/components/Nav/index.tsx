import React from 'react'
import {
  Flex,
  Divider,
	UnorderedList,
} from '@chakra-ui/react'
// import { NavLink } from 'react-router-dom'
import NavLink from './NavLink'

const Nav: React.FC = () => {
  return (
    <Flex
			direction='column'
			bgColor='waitrose.primary'
			h='100%'
			textAlign='left'
			// w='100%'
			// border='1px solid'
			// borderColor='red'
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
						New Count
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