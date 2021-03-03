import React from 'react'
import { Flex, Heading } from '@chakra-ui/react'

interface Props {
  title: string | number | undefined | null
}

const Header: React.FC<Props> = ({
  title
}) => {
  return (
    <Flex>
      <Heading as='h1'>
        { title }
      </Heading>
    </Flex>
  )
}

export default Header