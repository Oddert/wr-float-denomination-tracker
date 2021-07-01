/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import {
	Crosshair,
	MarkSeriesPoint,
} from 'react-vis'
import { css, jsx } from '@emotion/react'

interface Props {
	focused: MarkSeriesPoint | null
}

// WARNING: component not to be used
// it seems there is some issue with react-vis wrapping their components
const DashCrosshair: React.FC<Props> = ({
	focused
}) => {

	if (focused !== null && focused !== undefined) {
		return (
			<Crosshair 
				values={[focused]}
			>
				<div
					css={css({
						textAlign: 'left',
						fontSize: '12px',
						padding: '6px',
						borderRadius: '5px',
						pointerEvents: 'none',
						boxShadow: '5px 5px 5px rgba(0,0,0,.3)',
						background: '#3A3A48',
						margin: '5px',
						boxSizing: 'border-box',
						transform: 'translateY(-100%)',
						display: 'flex',
						flexDirection: 'column',
					})}
				>
					<p>{focused.label}</p>
				</div>
			</Crosshair> 
		)
	}

	return (<div />)
}

export default DashCrosshair