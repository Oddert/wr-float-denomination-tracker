/** @jsxRuntime classic */
/** @jsx jsx */
import React, { Dispatch, useContext } from 'react'
import { useSelector } from 'react-redux'
import { css, jsx } from '@emotion/react'

import {
	Box,
	Text,
} from '@chakra-ui/react'

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
	crosshairPositionSet,
	crosshairWrite,
	seriesHoverSet,
	seriesHoverClear,
} from './InspectRepoActions'

import { InspectRepoContext } from './Utils'

import { BagTypeReadableLabels, ReduxStateType } from '../../global'

import { 
	BagTypes,
	// bagTypes, 
	// BagTypes,
	ContextCrosshair,
	InspectRepoInitialStateT, 
	InspectRepoAction,
	// bagTypes as bts
} from './types'

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
	color: '#fff'
})

// const months_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const months_full = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Septmber', 'October', 'November', 'December']

const GraphOnlyBags: React.FC<Props> = () => {
	const COLOURS = useSelector((state: ReduxStateType) => state.ui.colours)
	const { contextState, contextDispatch }: { contextState: InspectRepoInitialStateT, contextDispatch: Dispatch<InspectRepoAction> } = useContext(InspectRepoContext)

	const {
		inspecting,
		data,
		constants: {
			WIDTH,
			HEIGHT,
			Y_PADDING,
		},
		parsedCountBags,
		crosshair,
		crosshairX,
		hoverSeries,
	} = contextState

	const handleMarkMouseOver = (e: MarkSeriesPoint) => {
		contextDispatch(inspectingSet(e))
	}

	const handleMarkMouseOut = () => {
		contextDispatch(inspectingClear())
	}

	const handleFormatTicks = (e: RVTickFormat | undefined) => {
		const idx = Number(e)
		if (data && data[idx]) {
			const rawCount = data[idx].timestamp
			let d = new Date()
			if (typeof rawCount === 'number') {
				d = new Date(rawCount)
			}
			return `${d.getDate()} ${months_full[d.getMonth()]} - \n${d.toLocaleTimeString()}`
		} 
		return ''
	}

	const handleNearestX = (e: MarkSeriesPoint) => {
		const x = Number(e.x)
		const count = data[x]

		contextDispatch(crosshairPositionSet(x))

		if (crosshair && crosshair.countId === count.id) return

		const d = new Date(count.timestamp || '')
		const createCrosshair: ContextCrosshair = {
			countId: Number(count.id),
			title: '',
			time: d.toLocaleTimeString(),
			date: d.toLocaleDateString(),
			...count.float
		}

		contextDispatch(crosshairWrite(createCrosshair))
	}

	const handleSeriesMouseOver = (bagType: BagTypes) => {
		console.log('seriesMouseOver', bagType)
		contextDispatch(seriesHoverSet(bagType))
	}

	const handleSeriesMouseOut = (bagType: BagTypes) => {
		console.log('seriesMouseOut', bagType)
		contextDispatch(seriesHoverClear())
	}

	const handleSeriesClick = (bagType: BagTypes) => {
		console.log('seriesClick', bagType)
	}

	const colourRelation = (bagtype: BagTypes | BagTypeReadableLabels) => {
		switch(bagtype) {
			case 'Bagged £5':
			case 'bagNote5': return COLOURS.red
			case 'Bagged £2':
			case 'bagPound2': return COLOURS.green
			case 'Bagged £1':
			case 'bagPound1': return COLOURS.blue
			case 'Bagged 50p':
			case 'bagPence50': return COLOURS.orange
			case 'Bagged 20p':
			case 'bagPence20': return COLOURS.yellow
			case 'Bagged 10p':
			case 'bagPence10': return COLOURS.teal
			case 'Bagged 5p':
			case 'bagPence5': return COLOURS.black
			case 'Bagged 2p':
			case 'bagPence2': return COLOURS.gold
			case 'Bagged 1p':
			case 'bagPence1': return COLOURS.liveRed
			default: return COLOURS.purple
		}
	}

	const tooltipFontSize = 12
	const crosshairFontSize = 10
	const tooltipTextSyle = {
		fontSize: tooltipFontSize,
		color: '#fff'
	}
	const crosshairStyle = {
		fontSize: crosshairFontSize,	
		color: '#fff'
	}
	const shadowMarkSize = 20

	// https://github.com/uber/react-vis/blob/master/docs/interaction.md

	return (
		<div>
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
				data={poundTwo}
			/> */}
			{/* <LineSeries 
				fill='none'
				data={parsedCountBags.bagNote5}
				color={colourRelation('bagNote5')}
			/> */}
			<LineSeries 
				// fill='none'
				data={parsedCountBags.bagPound2}
				fill={colourRelation('bagPound2')}
				color={colourRelation('bagPound2')}
				onSeriesMouseOver={() => handleSeriesMouseOver('bagPound2')}
				onSeriesMouseOut={() => handleSeriesMouseOut('bagPound2')}
				onSeriesClick={() => handleSeriesClick('bagPound2')}
				style={(hoverSeries && hoverSeries === 'bagPound2') ? {
					strokeWidth: 4
				} : {
					strokeWidth: 2
				}}
			/>
			{/* Might work this time... */}
			{/* {
				bts.map((val: string, n: number, arr: string[]) => <LineSeries 

				/>)
			} */}
			<LineSeries 
				fill='none'
				data={parsedCountBags.bagPound1}
				color={colourRelation('bagPound1')}
				onSeriesMouseOver={() => handleSeriesMouseOver('bagPound1')}
				onSeriesMouseOut={() => handleSeriesMouseOut('bagPound1')}
				onSeriesClick={() => handleSeriesClick('bagPound1')}
			/>
			<LineSeries 
				fill='none'
				data={parsedCountBags.bagPence50}
				color={colourRelation('bagPence50')}
				onSeriesMouseOver={() => handleSeriesMouseOver('bagPence50')}
				onSeriesMouseOut={() => handleSeriesMouseOut('bagPence50')}
				onSeriesClick={() => handleSeriesClick('bagPence50')}
			/>
			<LineSeries 
				fill='none'
				data={parsedCountBags.bagPence20}
				color={colourRelation('bagPence20')}
				onSeriesMouseOver={() => handleSeriesMouseOver('bagPence20')}
				onSeriesMouseOut={() => handleSeriesMouseOut('bagPence20')}
				onSeriesClick={() => handleSeriesClick('bagPence20')}
			/>
			<LineSeries 
				fill='none'
				data={parsedCountBags.bagPence10}
				color={colourRelation('bagPence10')}
				onSeriesMouseOver={() => handleSeriesMouseOver('bagPence10')}
				onSeriesMouseOut={() => handleSeriesMouseOut('bagPence10')}
				onSeriesClick={() => handleSeriesClick('bagPence10')}
			/>
			<LineSeries 
				fill='none'
				data={parsedCountBags.bagPence5}
				color={colourRelation('bagPence5')}
				onSeriesMouseOver={() => handleSeriesMouseOver('bagPence5')}
				onSeriesMouseOut={() => handleSeriesMouseOut('bagPence5')}
				onSeriesClick={() => handleSeriesClick('bagPence5')}
			/>
			<LineSeries 
				fill='none'
				data={parsedCountBags.bagPence2}
				color={colourRelation('bagPence2')}
				onSeriesMouseOver={() => handleSeriesMouseOver('bagPence2')}
				onSeriesMouseOut={() => handleSeriesMouseOut('bagPence2')}
				onSeriesClick={() => handleSeriesClick('bagPence2')}
			/>
			<LineSeries 
				fill='none'
				data={parsedCountBags.bagPence1}
				color={colourRelation('bagPence1')}
				// onSeriesMouseOver={() => console.log(Date.now())}
				onSeriesMouseOver={() => handleSeriesMouseOver('bagPence1')}
				onSeriesMouseOut={() => handleSeriesMouseOut('bagPence1')}
				onSeriesClick={() => handleSeriesClick('bagPence1')}
			/>


			{/* <MarkSeries 
				className='bagged-note-five'
				data={parsedCountBags.bagNote5}
				onValueMouseOver={(v: any) => setInspecting(v)}
				color={COLOURS.red}
			/> */}
			{/* Duplicate mark series, hidden to add larger mouse target area */}
			<MarkSeries 
				data={parsedCountBags.bagPound2}
				onValueMouseOver={handleMarkMouseOver}
				onValueMouseOut={handleMarkMouseOut}
				color='rgba(0,0,0,0)'
				_sizeValue={shadowMarkSize}
			/>
			<MarkSeries 
				className='bagged-pound-two'
				data={parsedCountBags.bagPound2}
				onValueMouseOver={handleMarkMouseOver}
				color={colourRelation('bagPound2')}
				onNearestX={handleNearestX}
				onSeriesMouseOver={() => handleSeriesMouseOver('bagPound2')}
				onSeriesMouseOut={() => handleSeriesMouseOut('bagPound2')}
				onSeriesClick={() => handleSeriesClick('bagPound2')}
			/>
			<MarkSeries 
				data={parsedCountBags.bagPound1}
				onValueMouseOver={handleMarkMouseOver}
				onValueMouseOut={handleMarkMouseOut}
				color='rgba(0,0,0,0)'
				// color={COLOURS.blue}
				_sizeValue={shadowMarkSize}
			/>
			<MarkSeries 
				className='bagged-pound-one'
				data={parsedCountBags.bagPound1}
				onValueMouseOver={handleMarkMouseOver}
				color={colourRelation('bagPound1')}
				onSeriesMouseOver={() => handleSeriesMouseOver('bagPound1')}
				onSeriesMouseOut={() => handleSeriesMouseOut('bagPound1')}
				onSeriesClick={() => handleSeriesClick('bagPound1')}
			/>
			<MarkSeries 
				data={parsedCountBags.bagPence50}
				onValueMouseOver={handleMarkMouseOver}
				onValueMouseOut={handleMarkMouseOut}
				color='rgba(0,0,0,0)'
				_sizeValue={shadowMarkSize}
			/>
			<MarkSeries 
				className='bagged-pence-fifty'
				data={parsedCountBags.bagPence50}
				onValueMouseOver={handleMarkMouseOver}
				color={colourRelation('bagPence50')}
				onSeriesMouseOver={() => handleSeriesMouseOver('bagPence50')}
				onSeriesMouseOut={() => handleSeriesMouseOut('bagPence50')}
				onSeriesClick={() => handleSeriesClick('bagPence50')}
			/>
			<MarkSeries 
				data={parsedCountBags.bagPence20}
				onValueMouseOver={handleMarkMouseOver}
				onValueMouseOut={handleMarkMouseOut}
				color='rgba(0,0,0,0)'
				_sizeValue={shadowMarkSize}
			/>
			<MarkSeries 
				className='bagged-pence-twenty'
				data={parsedCountBags.bagPence20}
				onValueMouseOver={handleMarkMouseOver}
				color={colourRelation('bagPence20')}
				onSeriesMouseOver={() => handleSeriesMouseOver('bagPence20')}
				onSeriesMouseOut={() => handleSeriesMouseOut('bagPence20')}
				onSeriesClick={() => handleSeriesClick('bagPence20')}
			/>
			<MarkSeries 
				data={parsedCountBags.bagPence10}
				onValueMouseOver={handleMarkMouseOver}
				onValueMouseOut={handleMarkMouseOut}
				color='rgba(0,0,0,0)'
				_sizeValue={shadowMarkSize}
			/>
			<MarkSeries 
				className='bagged-pence-ten'
				data={parsedCountBags.bagPence10}
				onValueMouseOver={handleMarkMouseOver}
				color={colourRelation('bagPence10')}
				onSeriesMouseOver={() => handleSeriesMouseOver('bagPence10')}
				onSeriesMouseOut={() => handleSeriesMouseOut('bagPence10')}
				onSeriesClick={() => handleSeriesClick('bagPence10')}
			/>
			<MarkSeries 
				data={parsedCountBags.bagPence5}
				onValueMouseOver={handleMarkMouseOver}
				onValueMouseOut={handleMarkMouseOut}
				color='rgba(0,0,0,0)'
				_sizeValue={shadowMarkSize}
			/>
			<MarkSeries 
				className='bagged-pence-five'
				data={parsedCountBags.bagPence5}
				onValueMouseOver={handleMarkMouseOver}
				color={colourRelation('bagPence5')}
				onSeriesMouseOver={() => handleSeriesMouseOver('bagPence5')}
				onSeriesMouseOut={() => handleSeriesMouseOut('bagPence5')}
				onSeriesClick={() => handleSeriesClick('bagPence5')}
			/>
			<MarkSeries 
				data={parsedCountBags.bagPence2}
				onValueMouseOver={handleMarkMouseOver}
				onValueMouseOut={handleMarkMouseOut}
				color='rgba(0,0,0,0)'
				_sizeValue={shadowMarkSize}
			/>
			<MarkSeries 
				className='bagged-pence-two'
				data={parsedCountBags.bagPence2}
				onValueMouseOver={handleMarkMouseOver}
				color={colourRelation('bagPence2')}
				onSeriesMouseOver={() => handleSeriesMouseOver('bagPence2')}
				onSeriesMouseOut={() => handleSeriesMouseOut('bagPence2')}
				onSeriesClick={() => handleSeriesClick('bagPence2')}
			/>
			<MarkSeries 
				data={parsedCountBags.bagPence1}
				onValueMouseOver={handleMarkMouseOver}
				onValueMouseOut={handleMarkMouseOut}
				color='rgba(0,0,0,0)'
				_sizeValue={shadowMarkSize}
			/>
			<MarkSeries 
				className='bagged-pence-one'
				data={parsedCountBags.bagPence1}
				onValueMouseOver={handleMarkMouseOver}
				color={colourRelation('bagPence1')}
				onSeriesMouseOver={() => handleSeriesMouseOver('bagPence1')}
				onSeriesMouseOut={() => handleSeriesMouseOut('bagPence1')}
				onSeriesClick={() => handleSeriesClick('bagPence1')}
			/>

			{/* <ParallelCoordinates 
				data={parsedCountBags.bagPound2} 
			/> */}
			{ 
				(inspecting !== null && inspecting !== undefined) && 
				<Hint 
					value={inspecting}
				>
					<Box
						css={tooltipStyle}
						borderTop={`5px solid ${colourRelation(inspecting.label)}`}
					>
						{/* <Text 
							{...tooltipTextSyle}
						>
							{inspecting.timestamp}
						</Text> */}
						<Text 
							{...tooltipTextSyle}
						>
							{inspecting.label}
						</Text>
						<Text 
							{...tooltipTextSyle}
						>
							Quantity: {Math.round(Number(inspecting.y))}
						</Text>
					</Box>
				</Hint> 
			}
			{ (crosshair !== null && crosshair !== undefined) && 
				<Crosshair 
					values={[{ x: crosshairX }]}
				>
					<Box
						css={tooltipStyle}
						transform='translateY(-100%)'
					>
						{
							(crosshair.title && crosshair.title.length) &&
							<Text 
								{...crosshairStyle}
							>
								{crosshair.title}
							</Text>
						}
						<Text
							{...crosshairStyle}
							whiteSpace='nowrap'
						>
							{crosshair.date}, {crosshair.time}
						</Text>
					</Box>
				</Crosshair>
			}
		</XYPlot>
		Whyyyyyyyyyyyyyyyyyyyyyy {hoverSeries}
		</div>
	)
}

export default GraphOnlyBags
