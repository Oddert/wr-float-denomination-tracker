import React from 'react'
import {
  Box,
  Divider,
  Button
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

interface Props {
  colStart?: any
  colEnd?: any
  rowStart?: any
  rowEnd?: any
}

const Nav: React.FC<Props> = () => {
  return (
    <Box>
      <nav>
        <ul>
          <li>
            <Button>
              Exit
            </Button>
          </li>
          <Divider />
          <li>
            <Link to='/'>
              Cash Repositories
            </Link>
          </li>
          <li>
            <Link to='/'>
              Counts
            </Link>
          </li>
          <Divider />
          <li>
            <Link to='/'>
              Incomplete Counts
            </Link>
          </li>
          <li>
            <Link to='/'>
              Repository Manager
            </Link>
          </li>
          <Divider />
        </ul>
      </nav>
    </Box>
  )
}

export default Nav