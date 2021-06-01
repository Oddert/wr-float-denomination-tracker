/** @ jsxRuntime classic */
/** @ jsx jsx */
import React from 'react'
import {
	Grid,
	GridItem,
	Box,
	Heading,
} from '@chakra-ui/react'
import ThumbnailGraph from './ThumbnailGraph'
import { useSelector } from 'react-redux'
import initialState from '../../constants/initialState'
// import { css, jsx } from '@emotion/react'

const Dashboard: React.FC = () => {

	const repositoryList = useSelector((state: typeof initialState) => state.repositories.repositoryList)
		.filter((repo: any) => !repo.deleted && !repo.deactivated)

	const sizes = [
		{
			// vw >= 1920
			w: 600,
			h: 300,
		}
	]
	
	return (
		<Grid
			gridTemplateColumns='1fr 1fr'
			gridAutoRows='auto'
		>
			{
				repositoryList.map((each: any) => 
					<GridItem
						p='40px 20px'
						key={each.id}
					>
						<Box
							w='100%'
							// h='100%'
							// bgColor='#c4c4c4'
							bgColor='#fff'
							position='relative'
							display='flex'
							flexDirection='column'
							alignItems='center'
						>
							<Heading
								as='h2'
							>
								{each.name}
							</Heading>
							<ThumbnailGraph 
								width={sizes[0].w}
								height={sizes[0].h}
								repository={each}
							/>
						</Box>
					</GridItem>
				)
			}
		</Grid>
	)
}

export default Dashboard