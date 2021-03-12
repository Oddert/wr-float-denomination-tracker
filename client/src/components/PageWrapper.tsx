import React from 'react'
import {
	Grid,
	GridItem,
} from '@chakra-ui/react'

import Header from './Header/'
import Nav from './Nav/'

interface Props {
	title: string
	children: React.ReactChild[]
}

const Dashboard: React.FC<any> = ({
	children,
	title,
}: Props) => {
	const navWidth = '15vw'
	return (
		<Grid 
      className="Page-Dashboard"
      templateColumns={`${navWidth} 1fr`}
      templateRows='auto 1fr'
      h='100vh'
    >
			<GridItem
				colStart={1}
				colEnd={-1}
			>
	      <Header 
					title={title} 
					navWidth={navWidth}
				/>
			</GridItem>
      <GridItem
        rowStart={2}
        rowEnd={-1}
      >
        <Nav />
      </GridItem>
			<GridItem 
        w='100%' 
        p='20px 50px'
        textAlign='left'
        bg='waitrose.bgLight'
        colStart={2}
        colEnd={2}
        rowStart={2}
        rowEnd={2}
				bgColor='theme_light.background.primary'
      >
				{ children }
			</GridItem>
		</Grid>
	)
}

export default Dashboard