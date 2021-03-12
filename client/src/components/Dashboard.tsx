import React from 'react'
import {
	Grid,
	GridItem,
	Box,
} from '@chakra-ui/react'

const Dashboard: React.FC = () => {
	const repos = ['401', '403', 'lotto']
	return (
		<Grid
			gridTemplateColumns='1fr 1fr'
			gridAutoRows='300px'
		>
			{
				repos.map(each => 
					<GridItem
						p='40px 20px'
						key={each}
					>
						<Box
							w='100%'
							h='100%'
							bgColor='#c4c4c4'
						>
							{each} Graph
						</Box>
					</GridItem>
				)
			}
		</Grid>
	)
}

export default Dashboard