import React from 'react'
import { 
  Flex, 
  Heading, 
  Divider,
 } from '@chakra-ui/react'

interface Props {
  title: string | number | undefined | null
}

const Header: React.FC<Props> = ({
  title
}) => {
  return (
    <Flex>
      <div>
        <Heading as='h1'>
          { title }
        </Heading>
      </div>
      <div>
        <Divider orientation='horizontal' />
      </div>
    </Flex>
  )
}

export default Header