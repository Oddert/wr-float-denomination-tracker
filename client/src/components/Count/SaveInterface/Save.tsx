import React from 'react'

import { 
	Button,
} from '@chakra-ui/react'

interface Props {
	edit?: boolean
}

const Save: React.FC<Props> = ({
	edit
}) => {

	const handleClick = () => {
		if (edit) {
			console.log('Send ajax to PUT, show flash')
		} else {
			console.log('Send ajax POST, show flash')
			const EXT = `/api/v1/count/1`
			const OPTS = {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					count: {
						// repositoryId: 1,
						// counterId: 1,
						data: {
							bagged: {
								pence_one: 5,
								pence_two: 2,
								// pence_five: null,
								// pence_ten: null,
								// pence_twenty: null,
								// pence_fifty: null,
								// pound_one: null,
								// pound_two: null,
								// note_five: null,
								// total: null,
							},
							loose: {
								// pence_one: null,
								// pence_two: null,
								// pence_five: null,
								// pence_ten: null,
								pence_twenty: 8,
								// pence_fifty: null,
								// pound_one: null,
								// pound_two: null,
								// other: null,
								// total: null,
							},
							notes: {
								// note_one: null,
								// note_five: null,
								// note_ten: null,
								// note_twenty: null,
								note_fifty: 40,
							// 	total: null,
							},
							// total: null,
						}
					}
				})
			}
			fetch(EXT, OPTS)
				.then(res => res.json())
				.then(res => console.log(res))
				.catch(err => console.error(err))
		}
	}

	return (
		<Button
			variant='link'
			size='lg'
			my='16px'
			onClick={handleClick}
		>
			Save
		</Button>
	)
}

export default Save