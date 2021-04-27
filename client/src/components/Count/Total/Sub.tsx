import React from 'react'

import {
	Text,
} from '@chakra-ui/react'

interface Props {
	bagged: any
	loose: any
	notes: any
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
					.filter((each: any) => each !== undefined)
					.map((each: any) => each/100)
					.map((each: any) => each.toFixed(2))
					.join(' + ')
			}
		</Text>
	)
}

export default Sub