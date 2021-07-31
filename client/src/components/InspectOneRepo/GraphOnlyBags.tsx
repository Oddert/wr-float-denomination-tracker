import React, { useContext } from 'react'
import { useSelector } from 'react-redux'

import { ReduxStateType } from '../../global'

import {
	XYPlot,
	HorizontalGridLines,
	XAxis,
	YAxis,
	Hint,
	// TODO: investigate...
	// LineMarkSeries,
	LineSeries,
	MarkSeries,
} from 'react-vis'

import {  
	inspectingSet,
	inspectingClear,
} from './InspectRepoActions'
import { InspectRepoContext } from './Utils'

interface Props {

}

const GraphOnlyBags: React.FC<Props> = () => {
	const COLOURS = useSelector((state: ReduxStateType) => state.ui.colours)
	const { contextState, contextDispatch } = useContext(InspectRepoContext)

	const {
		inspecting,
		constants: {
			WIDTH,
			HEIGHT,
			Y_PADDING,
		},
		parsedCountBags,
	} = contextState

	const handleMarkMouseOver = (e: any) => {
		contextDispatch(inspectingSet(e))
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
			<XAxis />
			<YAxis />
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
				// @ts-ignore
				data={parsedCountBags.bagPound2} 
			/> */}
			{ (inspecting !== null) && <Hint value={inspecting} /> }
			{/* { (inspecting !== null) && <Crosshair value={[inspecting]} /> } */}
		</XYPlot>
	)
}

export default GraphOnlyBags
