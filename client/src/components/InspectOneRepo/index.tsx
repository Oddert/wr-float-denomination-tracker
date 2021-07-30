/** @ jsxRuntime classic */
/** @ jsx jsx */
import React, { useEffect, useState, useReducer } from 'react'
import { useSelector } from 'react-redux'
// import { css, jsx } from '@emotion/react'

import {
	XYPlot,
	HorizontalGridLines,
	XAxis,
	YAxis,
	LineSeries,
	MarkSeries,
	Hint,
	// ParallelCoordinates,
	// Crosshair,
} from 'react-vis'

import { 
	ReduxStateType,
	ServerCountType, 
	// ServerFloatType,
	BagTypeReadableLabels,
} from '../../global'
import { InspectRepoContext } from './Utils'

import TopControlGroup from './TopControlGroup'
import { inspectRepoInitialState } from './Utils'
import InspectRepoReducer from './InspectRepoReducer'
import { repoSet } from './InspectRepoActions'

// const styles = css`
// 	color: red;
// `

const WIDTH: number = 1200
const HEIGHT: number = 500
const Y_PADDING: number = 20

interface ParsedCountT {
	bagNote5: ParsedCountT[],
	bagPound2: ParsedCountT[],
	bagPound1: ParsedCountT[],
	bagPence50: ParsedCountT[],
	bagPence20: ParsedCountT[],
	bagPence10: ParsedCountT[],
	bagPence5: ParsedCountT[],
	bagPence2: ParsedCountT[],
	bagPence1: ParsedCountT[],
}

interface ServerCountTypeWithAdjustment extends ServerCountType {
	adjustment?: number | null
}

const InspectOneRepo: React.FC = () => {
	const [contextState, contextDispatch] = useReducer(InspectRepoReducer, inspectRepoInitialState)

	const { startTime, endTime, useAdjustments, repo, } = contextState
	
	const [data, setData]: [ServerCountType[], any] = useState([])
	const [adjustmentStepSize, setAdjustmentStepSize] = useState(.2)
	const [inspecting, setInspecting]: [any, any] = useState(null)
	const COLOURS = useSelector((state: ReduxStateType) => state.ui.colours)
	const [parsedCount, setParsedCount]: [ParsedCountT, any] = useState({
		bagNote5: [],
		bagPound2: [],
		bagPound1: [],
		bagPence50: [],
		bagPence20: [],
		bagPence10: [],
		bagPence5: [],
		bagPence2: [],
		bagPence1: [],
	})

	useEffect(() => {
		const EXT = `/api/v1/count?fromdate=${startTime.getTime()}&todate=${endTime.getTime()}&float=true&repository=${repo}`
		console.log(EXT)
		const OPTS = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}
		fetch(EXT, OPTS)
			.then(res => res.json())
			.then(res => {
				console.log(res)
				setData(res.counts.reverse())
			})
	}, [repo, endTime, startTime])

	useEffect(() => {
		const adjustedC = data.map((each: any) => {
			type BagTypes = 'bagNote5' | 'bagPound2' | 'bagPound1' | 'bagPence50' | 'bagPence20' | 'bagPence10' | 'bagPence5' | 'bagPence2' | 'bagPence1'
			const bags: BagTypes[] = ['bagNote5', 'bagPound2', 'bagPound1', 'bagPence50', 'bagPence20', 'bagPence10', 'bagPence5', 'bagPence2', 'bagPence1']
			const adjustments: any = {
				bagNote5: (100 * 5),
				bagPound2: (100 * 20),
				bagPound1: (100 * 20),
				bagPence50: (100 * 10),
				bagPence20: (100 * 10),
				bagPence10: (100 * 5),
				bagPence5: (100 * 5),
				bagPence2: (100 * 1),
				bagPence1: (100 * 1),
			}
			const float = { ...each.float }
			const record = bags.map((bag: BagTypes) => ({
				label: bag,
				value: each.float[bag]
			}))
			.sort((a, b) => a.value - b.value)

			const stack: any[] = []
			
			record.forEach((oneRecord: any) => {
				if (stack.length === 0) {
					stack.push(oneRecord)
				} else {
					if (oneRecord.value === stack[0].value) {
						stack.push(oneRecord)
					} else {
						emptyStack(oneRecord)
					}
				}
			})

			function emptyStack (oneRecord: any) {
				// const stepSize: number = .2
				// const stepSize: number = 100
				const len: number = stack.length
				const middle: number = Math.ceil(len / 2)
				// const temp: BagTypes[] = []
				// const temp: any = []
				for (let i = 1 - middle, j = 0; i <= len - middle; i++, j++) {
					// temp.push(i)
					const label = stack[j].label
					const value = stack[j].value
					const multiplier: number = useAdjustments 
						? i * 	adjustmentStepSize * adjustments[label] 
						: i
					float[label] = value + multiplier
					
				}
				stack.length = 0
				stack.push(oneRecord)
			}

			// if (each.id === 4) console.log(each.float, float)
			return { ...each, float }
		})
		// console.log({ adjustedC, data })

		const parsedC = adjustedC.reduce((acc: ParsedCountT, each: ServerCountTypeWithAdjustment, idx: number) => {
			const newAcc: any = { ...acc }

			function pushToNewAcc (bagType: BagTypeReadableLabels) {
				let y = 0
				const timestamp = each.timestamp ? new Date(each.timestamp).toLocaleString('en-GB') : undefined
				
				switch (bagType) {
					case 'Bagged £5': y = (each.float?.bagNote5 || 0) / (100 * 5); break;
					case 'Bagged £2': y = (each.float?.bagPound2 || 0) / (100 * 20); break;
					case 'Bagged £1': y = (each.float?.bagPound1 || 0) / (100 * 20); break;
					case 'Bagged 50p': y = (each.float?.bagPence50 || 0) / (100 * 10); break;
					case 'Bagged 20p': y = (each.float?.bagPence20 || 0) / (100 * 10); break;
					case 'Bagged 10p': y = (each.float?.bagPence10 || 0) / (100 * 5); break;
					case 'Bagged 5p': y = (each.float?.bagPence5 || 0) / (100 * 5); break;
					case 'Bagged 2p': y = (each.float?.bagPence2 || 0) / 100; break;
					case 'Bagged 1p': y = (each.float?.bagPence1 || 0) / 100; break;
				}

				return { 
					// @ts-ignore
					label: bagType, y, x: idx, timestamp, id: each.id			
				}
			}
			
			newAcc.bagNote5.push(pushToNewAcc('Bagged £5'))
			newAcc.bagPound2.push(pushToNewAcc('Bagged £2'))
			newAcc.bagPound1.push(pushToNewAcc('Bagged £1'))
			newAcc.bagPence50.push(pushToNewAcc('Bagged 50p'))
			newAcc.bagPence20.push(pushToNewAcc('Bagged 20p'))
			newAcc.bagPence10.push(pushToNewAcc('Bagged 10p'))
			newAcc.bagPence5.push(pushToNewAcc('Bagged 5p'))
			newAcc.bagPence2.push(pushToNewAcc('Bagged 2p'))
			newAcc.bagPence1.push(pushToNewAcc('Bagged 1p'))
			return newAcc
		}, {
			bagNote5: [],
			bagPound2: [],
			bagPound1: [],
			bagPence50: [],
			bagPence20: [],
			bagPence10: [],
			bagPence5: [],
			bagPence2: [],
			bagPence1: [],
		})
		// console.log('setParsedCount')
		setParsedCount(parsedC)
	}, [
		data, 
		useAdjustments, 
		adjustmentStepSize
	])

	const handleMarkMouseOver = (e: any) => {
		setInspecting(e)
	}

	return (
		<InspectRepoContext.Provider
			value={{
				contextState, 
				contextDispatch,
			}}
		>
			<div
				style={{
					background: '#fff'
				}}
			>
				<TopControlGroup 
					adjustmentStepSize={adjustmentStepSize}
					setAdjustmentStepSize={setAdjustmentStepSize}
				/>
				<XYPlot
					width={WIDTH}
					height={HEIGHT}
					yPadding={Y_PADDING}
					onMouseLeave={() => setInspecting(null)}
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
						data={parsedCount.bagNote5}
						color={COLOURS.red}
					/> */}
					<LineSeries 
						fill='none'
						// @ts-ignore
						data={parsedCount.bagPound2}
						color={COLOURS.green}
					/>
					<LineSeries 
						fill='none'
						// @ts-ignore
						data={parsedCount.bagPound1}
						color={COLOURS.blue}
					/>
					<LineSeries 
						fill='none'
						// @ts-ignore
						data={parsedCount.bagPence50}
						color={COLOURS.orange}
					/>
					<LineSeries 
						fill='none'
						// @ts-ignore
						data={parsedCount.bagPence20}
						color={COLOURS.yellow}
					/>
					<LineSeries 
						fill='none'
						// @ts-ignore
						data={parsedCount.bagPence10}
						color={COLOURS.teal}
					/>
					<LineSeries 
						fill='none'
						// @ts-ignore
						data={parsedCount.bagPence5}
						color={COLOURS.black}
					/>
					<LineSeries 
						fill='none'
						// @ts-ignore
						data={parsedCount.bagPence2}
						color={COLOURS.gold}
					/>
					<LineSeries 
						fill='none'
						// @ts-ignore
						data={parsedCount.bagPence1}
						color={COLOURS.liveRed}
						onSeriesMouseOver={() => console.log(Date.now())}
					/>


					{/* <MarkSeries 
						className='bagged-note-five'
						// @ts-ignore
						data={parsedCount.bagNote5}
						onValueMouseOver={(v: any) => setInspecting(v)}
						color={COLOURS.red}
					/> */}
					<MarkSeries 
						className='bagged-pound-two'
						// @ts-ignore
						data={parsedCount.bagPound2}
						onValueMouseOver={handleMarkMouseOver}
						color={COLOURS.green}
					/>
					<MarkSeries 
						className='bagged-pound-one'
						// @ts-ignore
						data={parsedCount.bagPound1}
						onValueMouseOver={handleMarkMouseOver}
						color={COLOURS.blue}
					/>
					<MarkSeries 
						className='bagged-pence-fifty'
						// @ts-ignore
						data={parsedCount.bagPence50}
						onValueMouseOver={handleMarkMouseOver}
						color={COLOURS.orange}
					/>
					<MarkSeries 
						className='bagged-pence-twenty'
						// @ts-ignore
						data={parsedCount.bagPence20}
						onValueMouseOver={handleMarkMouseOver}
						color={COLOURS.yellow}
					/>
					<MarkSeries 
						className='bagged-pence-ten'
						// @ts-ignore
						data={parsedCount.bagPence10}
						onValueMouseOver={handleMarkMouseOver}
						color={COLOURS.teal}
					/>
					<MarkSeries 
						className='bagged-pence-five'
						// @ts-ignore
						data={parsedCount.bagPence5}
						onValueMouseOver={handleMarkMouseOver}
						color={COLOURS.black}

					/>
					<MarkSeries 
						className='bagged-pence-two'
						// @ts-ignore
						data={parsedCount.bagPence2}
						onValueMouseOver={handleMarkMouseOver}
						color={COLOURS.gold}
					/>
					<MarkSeries 
						className='bagged-pence-one'
						// @ts-ignore
						data={parsedCount.bagPence1}
						onValueMouseOver={handleMarkMouseOver}
						color={COLOURS.liveRed}
					/>
					{/* <ParallelCoordinates 
						// @ts-ignore
						data={parsedCount.bagPound2} 
					/> */}
					{ (inspecting !== null) && <Hint value={inspecting} /> }
					{/* { (inspecting !== null) && <Crosshair value={[inspecting]} /> } */}
				</XYPlot>
				{
					JSON.stringify(inspecting)
				}
				<ul
				// @ts-ignore
					// className={css}
				>
					<li>Toggle individual series</li>
					<li>How to emphasis on hover</li>
					<li>Why Emotion.js not working?</li>
					<li>Cancel Hint on mouseout</li>
					<li>Add Crosshair</li>
					<li>Add series labels</li>
				</ul>
			</div>
		</InspectRepoContext.Provider>
	)
}

export default InspectOneRepo