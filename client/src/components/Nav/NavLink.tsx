import React from 'react'
import { Link, ListItem } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'

const NavLink: React.FC<any> = (props: any) => {
	const location = useLocation()
	const current = location.pathname === props.to
	const borderWeight = '5px'
	const borderLeft = current ? `${borderWeight} solid #fff` : `${borderWeight} solid rgba(0,0,0,0)`
	const fontWeight = props.primary ? `bold` : `normal`
	return (
		<ListItem
			m='20px 0'
			p='4px 16px'
			borderLeft={borderLeft}
			fontWeight={fontWeight}
		>
			<Link 
				{...props}
				href={`#${props.to}`}
				color='waitrose.bgLight'
				fontSize='1.2em'
			/>
		</ListItem>
	)
}

export default NavLink