import React from 'react'

import {
	Text,
} from '@chakra-ui/react'

interface Props {
	bagged: number
	loose: number
	notes: number
}

const Sub: React.FC<Props> = ({
	bagged,
	loose,
	notes,
}) => {

	return (
		<Text
			gridColumn='2'
			color='theme_light.text.lighter'
			marginTop='10px'
		>
			{
				[bagged, loose, notes]
					.filter((each: number) => each !== undefined)
					.map((each: number) => each/100)
					.map((each: number) => each.toFixed(2))
					.join(' + ')
			}
		</Text>
	)
}

export default Sub