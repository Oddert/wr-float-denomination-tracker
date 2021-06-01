/** @jsxRuntime classic */
/** @jsx jsx */
import React, { 
	useEffect, 
	useState,
} from 'react'
import { useSelector } from 'react-redux'
import { css, jsx } from '@emotion/react'
import {
	XYPlot,
	LineSeries,
	MarkSeries,
	XAxis,
	YAxis,
	Crosshair,
	MarkSeriesPoint,
} from 'react-vis'

import {
	ReduxStateType,
	ServerCountType,
} from '../../global'
import { 
	Flex, 
	Heading, 
} from '@chakra-ui/layout'

interface Props {
	width: number
	height: number
	repository: any
}

interface DataPoint {
	label: string
	y: number
	x: number
	timestamp: number | string | undefined
	id: number
}

interface LinearDataState {
	bagNote5: any[]
	bagPound2: any[]
	bagPound1: any[]
	bagPence50: any[]
	bagPence20: any[]
	bagPence10: any[]
	bagPence5: any[]
	bagPence2: any[]
	bagPence1: any[]
}

const linearDataInitialState: LinearDataState = {
	bagNote5: [],
	bagPound2: [],
	bagPound1: [],
	bagPence50: [],
	bagPence20: [],
	bagPence10: [],
	bagPence5: [],
	bagPence2: [],
	bagPence1: [],
}

type BagTypes = 'bagNote5' | 'bagPound2' | 'bagPound1' | 'bagPence50' | 'bagPence20' | 'bagPence10' | 'bagPence5' | 'bagPence2' | 'bagPence1'
const bags: BagTypes[] = ['bagNote5', 'bagPound2', 'bagPound1', 'bagPence50', 'bagPence20', 'bagPence10', 'bagPence5', 'bagPence2', 'bagPence1']

const ThumbnailGraph: React.FC<Props> = ({
	width,
	height,
	repository,
}) => {
	const [counts, setCounts]: [ServerCountType[], any] = useState([])
	const [parsedData, setParsedData]: [LinearDataState, any] = useState(linearDataInitialState)
	const [focused, setFocused]: [MarkSeriesPoint | null, any] = useState(null)
	const COLOURS = useSelector((state: ReduxStateType) => state.ui.colours)

	const colourMap = {
		bagNote5: COLOURS.red,
		bagPound2: COLOURS.green,
		bagPound1: COLOURS.blue,
		bagPence50: COLOURS.orange,
		bagPence20: COLOURS.yellow,
		bagPence10: COLOURS.teal,
		bagPence5: COLOURS.black,
		bagPence2: COLOURS.gold,
		bagPence1: COLOURS.liveRed,
	}

	useEffect(() => {
		const EXT = `/api/v1/count?repository=${repository.id}&float=1&limit=4`
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
				if (res.status === 200) {
					setCounts(res.counts)
				} else {
					console.error(res.errorMessage)
				}
			})
			.catch(error => console.error(error))
	}, [repository])

	useEffect(() => {
		const adjustedC = counts.map((each: ServerCountType) => {

			const float = { ...each.float }

			interface Record {
				label: BagTypes
				value: number
			}

			const record: Record[] = bags.map((bag: BagTypes) => {
				const value: number = (each.float && each.float[bag]) ? each.float[bag] as number : 0
				return {
					label: bag,
					value
				}
			})
			.sort((a, b) => a.value - b.value)

			const stack: Record[] = []

			record.forEach((oneRecord: Record) => {
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

			function emptyStack (oneRecord: Record) {
				const len: number = stack.length
				const middle: number = Math.ceil(len / 2)
				for (let i = 1 - middle, j = 0; i <= len - middle; i++, j++) {
					const label = stack[j].label
					const value = stack[j].value
					// const multiplier: number = useAdjustments 
					// 	? i * 	adjustmentStepSize * adjustments[label] 
					// 	: i
					const multiplier: number = i
					float[label] = value + multiplier
					
				}
				stack.length = 0
				stack.push(oneRecord)
			}

			return { ...each, float }
		})

		const addOnePoint = (label: string, y: number, x: number, timestamp: number | string | undefined, id: number): DataPoint => ({
			label,
			y, 
			// @ts-ignore
			x, 
			timestamp,
			id,
		})

		const parsedC = adjustedC.reduce((acc: LinearDataState, each: any, idx: number) => {
			const newAcc: any = { ...acc }
			newAcc.bagNote5.push(addOnePoint(new Date(each.timestamp).toLocaleString('en-GB'), (each.float?.bagNote5 || 0) / (100 * 5), idx, each.timestamp ? new Date(each.timestamp).toLocaleString('en-GB') : undefined, each.id))
			newAcc.bagPound2.push(addOnePoint(new Date(each.timestamp).toLocaleString('en-GB'), (each.float?.bagPound2 || 0) / (100 * 20), idx, each.timestamp ? new Date(each.timestamp).toLocaleString('en-GB') : undefined, each.id))
			newAcc.bagPound1.push(addOnePoint(new Date(each.timestamp).toLocaleString('en-GB'), (each.float?.bagPound1 || 0) / (100 * 20), idx, each.timestamp ? new Date(each.timestamp).toLocaleString('en-GB') : undefined, each.id))
			newAcc.bagPence50.push(addOnePoint(new Date(each.timestamp).toLocaleString('en-GB'), (each.float?.bagPence50 || 0) / (100 * 10), idx, each.timestamp ? new Date(each.timestamp).toLocaleString('en-GB') : undefined, each.id))
			newAcc.bagPence20.push(addOnePoint(new Date(each.timestamp).toLocaleString('en-GB'), (each.float?.bagPence20 || 0) / (100 * 10), idx, each.timestamp ? new Date(each.timestamp).toLocaleString('en-GB') : undefined, each.id))
			newAcc.bagPence10.push(addOnePoint(new Date(each.timestamp).toLocaleString('en-GB'), (each.float?.bagPence10 || 0) / (100 * 5), idx, each.timestamp ? new Date(each.timestamp).toLocaleString('en-GB') : undefined, each.id))
			newAcc.bagPence5.push(addOnePoint(new Date(each.timestamp).toLocaleString('en-GB'), (each.float?.bagPence5 || 0) / (100 * 5), idx, each.timestamp ? new Date(each.timestamp).toLocaleString('en-GB') : undefined, each.id))
			newAcc.bagPence2.push(addOnePoint(new Date(each.timestamp).toLocaleString('en-GB'), (each.float?.bagPence2 || 0) / 100, idx, each.timestamp ? new Date(each.timestamp).toLocaleString('en-GB') : undefined, each.id))
			newAcc.bagPence1.push(addOnePoint(new Date(each.timestamp).toLocaleString('en-GB'), (each.float?.bagPence1 || 0) / 100,idx, each.timestamp ? new Date(each.timestamp).toLocaleString('en-GB') : undefined, each.id))
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

		setParsedData(parsedC)
	}, [
		counts
	])

	const handleMarkMouseOver = (point: MarkSeriesPoint) => {
		setFocused(point)
	}

	const handleGraphMouseLeave = () => {
		setFocused(null)
	}

	if (!counts.length) {
		return (
			<div
				style={{
					position: 'relative'
				}}
			>
				<Flex
					height={height}
					alignItems='center'
					justifyContent='center'
				>
					<Heading
						as='h4'
					>
						No Data
					</Heading>
				</Flex>
			</div>
		)
	}

	return (
		<div
			style={{
				position: 'relative'
			}}
		>
			<XYPlot
				width={width}
				height={height}
				background='#183625'
				onMouseLeave={handleGraphMouseLeave}
			>
				<XAxis />
				<YAxis />
				{
					bags.map((bag: BagTypes) => 
						<LineSeries 
							key={bag}
							data={parsedData[bag]}
							color={colourMap[bag]}
						/>
					)
				}
				{
					bags.map((bag: BagTypes) => 
						<MarkSeries 
							key={bag}
							data={parsedData[bag]}
							onNearestX={handleMarkMouseOver}
							color={colourMap[bag]}
						/>
					)
				}
				{
					focused !== undefined && focused !== null 
						? <Crosshair 
								values={[focused]}
							>
								<div
									style={{
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
									}}
								>
									{/* @ts-ignore */}
									<p>{focused.label}</p>
								</div>
							</Crosshair> 
						: undefined
				}
			</XYPlot>
		</div>
	)
}

export default ThumbnailGraph