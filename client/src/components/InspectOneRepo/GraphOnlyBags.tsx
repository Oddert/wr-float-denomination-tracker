/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { css, jsx } from '@emotion/react'

import { ReduxStateType } from '../../global'

import {
	XYPlot,
	HorizontalGridLines,
	XAxis,
	YAxis,
	Hint,
	Crosshair,
	// TODO: investigate...
	// LineMarkSeries,
	LineSeries,
	MarkSeries,
	RVTickFormat,
	MarkSeriesPoint,
} from 'react-vis'

import {  
	inspectingSet,
	inspectingClear,
} from './InspectRepoActions'
import { InspectRepoContext } from './Utils'

interface Props {

}

const tooltipStyle = css({
	textAlign: 'left',
	// fontSize: '12px',
	fontSize: '8px',
	padding: '6px',
	borderRadius: '5px',
	pointerEvents: 'none',
	boxShadow: '5px 5px 5px rgba(0,0,0,.3)',
	background: '#3A3A48',
	margin: '5px',
	boxSizing: 'border-box',
})

// const months_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const months_full = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Septmber', 'October', 'November', 'December']

const GraphOnlyBags: React.FC<Props> = () => {
	const COLOURS = useSelector((state: ReduxStateType) => state.ui.colours)
	const { contextState, contextDispatch } = useContext(InspectRepoContext)

	const {
		inspecting,
		data,
		constants: {
			WIDTH,
			HEIGHT,
			Y_PADDING,
		},
		parsedCountBags,
	} = contextState

	const handleMarkMouseOver = (e: MarkSeriesPoint) => {
		contextDispatch(inspectingSet(e))
		console.log('inspecting: ', e)
	}

	const handleFormatTicks = (e: RVTickFormat | undefined) => {
		const idx = Number(e)
		if (data && data[idx]) {
			const d = new Date(data[idx].timestamp)
			return `${d.getDate()} ${months_full[d.getMonth()]} - \n${d.toLocaleTimeString()}`
		} 
		return ''
	}

	return (
		<XYPlot
			width={WIDTH}
			height={HEIGHT}
			yPadding={Y_PADDING}
			onMouseLeave={() => contextDispatch(inspectingClear())}
			// animation={true}
			style={{
				position: 'relative'
			}}
		>
			{/* <ParallelCoordinates 
				data={d} 
				style={{
					axes: {
						line: {},
						ticks: {},
						text: {}
					},
					labels: {
						fontSize: 10
					},
					line: {
						strokeOpacity: 1
					},
					deselectedLineStyle: {
						strokeOpacity: 0.1
					}
				}}
			/> */}
			<HorizontalGridLines />
			<XAxis 
				title='Days'
				orientation='bottom'
				tickFormat={handleFormatTicks}
			/>
			<YAxis 
				title='Baggs'
				orientation='left'
			/>
			{/* <LineSeries 
				fill='none'
				// @ts-ignore
				data={poundTwo}
			/> */}
			{/* <LineSeries 
				fill='none'
				// @ts-ignore
				data={parsedCountBags.bagNote5}
				color={COLOURS.red}
			/> */}
			<LineSeries 
				fill='none'
				// @ts-ignore
				data={parsedCountBags.bagPound2}
				color={COLOURS.green}
			/>
			<LineSeries 
				fill='none'
				// @ts-ignore
				data={parsedCountBags.bagPound1}
				color={COLOURS.blue}
			/>
			<LineSeries 
				fill='none'
				// @ts-ignore
				data={parsedCountBags.bagPence50}
				color={COLOURS.orange}
			/>
			<LineSeries 
				fill='none'
				// @ts-ignore
				data={parsedCountBags.bagPence20}
				color={COLOURS.yellow}
			/>
			<LineSeries 
				fill='none'
				// @ts-ignore
				data={parsedCountBags.bagPence10}
				color={COLOURS.teal}
			/>
			<LineSeries 
				fill='none'
				// @ts-ignore
				data={parsedCountBags.bagPence5}
				color={COLOURS.black}
			/>
			<LineSeries 
				fill='none'
				// @ts-ignore
				data={parsedCountBags.bagPence2}
				color={COLOURS.gold}
			/>
			<LineSeries 
				fill='none'
				// @ts-ignore
				data={parsedCountBags.bagPence1}
				color={COLOURS.liveRed}
				onSeriesMouseOver={() => console.log(Date.now())}
			/>


			{/* <MarkSeries 
				className='bagged-note-five'
				// @ts-ignore
				data={parsedCountBags.bagNote5}
				onValueMouseOver={(v: any) => setInspecting(v)}
				color={COLOURS.red}
			/> */}
			<MarkSeries 
				className='bagged-pound-two'
				// @ts-ignore
				data={parsedCountBags.bagPound2}
				onValueMouseOver={handleMarkMouseOver}
				color={COLOURS.green}
			/>
			<MarkSeries 
				className='bagged-pound-one'
				// @ts-ignore
				data={parsedCountBags.bagPound1}
				onValueMouseOver={handleMarkMouseOver}
				color={COLOURS.blue}
			/>
			<MarkSeries 
				className='bagged-pence-fifty'
				// @ts-ignore
				data={parsedCountBags.bagPence50}
				onValueMouseOver={handleMarkMouseOver}
				color={COLOURS.orange}
			/>
			<MarkSeries 
				className='bagged-pence-twenty'
				// @ts-ignore
				data={parsedCountBags.bagPence20}
				onValueMouseOver={handleMarkMouseOver}
				color={COLOURS.yellow}
			/>
			<MarkSeries 
				className='bagged-pence-ten'
				// @ts-ignore
				data={parsedCountBags.bagPence10}
				onValueMouseOver={handleMarkMouseOver}
				color={COLOURS.teal}
			/>
			<MarkSeries 
				className='bagged-pence-five'
				// @ts-ignore
				data={parsedCountBags.bagPence5}
				onValueMouseOver={handleMarkMouseOver}
				color={COLOURS.black}

			/>
			<MarkSeries 
				className='bagged-pence-two'
				// @ts-ignore
				data={parsedCountBags.bagPence2}
				onValueMouseOver={handleMarkMouseOver}
				color={COLOURS.gold}
			/>
			<MarkSeries 
				className='bagged-pence-one'
				// @ts-ignore
				data={parsedCountBags.bagPence1}
				onValueMouseOver={handleMarkMouseOver}
				color={COLOURS.liveRed}
			/>
			{/* <ParallelCoordinates 
				// @ts-ignoreX
				data={parsedCountBags.bagPound2} 
			/> */}
			{ 
				(inspecting !== null && inspecting !== undefined) && 
				<Hint 
					value={inspecting}
				>
					<div
						css={tooltipStyle}	
					>
						<p>{inspecting.timestamp}</p>
						<p>{inspecting.label}</p>
						<p>Quantity: {Math.round(inspecting.y)}</p>
					</div>
				</Hint> 
			}
			{ (inspecting !== null && inspecting !== undefined) && 
				<Crosshair 
					values={[{ x: inspecting.x }]}

				>
					<div
						css={{
							...tooltipStyle,
							transform: 'translateY(-100%)',
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<p>Crosshair Goes Here</p>
					</div>
				</Crosshair>
			}
		</XYPlot>
	)
}

export default GraphOnlyBags
