import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { css } from '@emotion/react'

import { ServerCountType } from '../global'

import initialState from '../constants/initialState'

import {
	XYPlot,
	HorizontalGridLines,
	XAxis,
	YAxis,
	LineSeries,
	MarkSeries,
	Hint,
} from 'react-vis'
import Select from './base/Select'
import DateInput from './base/DateInput'

const styles = css`
	fill: none;
`
const ABS_START_DATE = '2021-03-30'

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

const VisTest1: React.FC = () => {
	const repoList = useSelector((s: typeof initialState) => s.repositories.repositoryList)

	const [repo, setRepo] = useState(1)
	// const baseDate = new Date()
	const baseDate = new Date(ABS_START_DATE)
	const [startTime, setStartTime] = useState(new Date(baseDate.getTime() - 1000 * 60 * 60 * 24 * 7 * 5))
	const [endTime, setEndTime] = useState(baseDate)
	const [data, setData]: [ServerCountType[], any] = useState([])
	const [inspecting, setInspecting]: [any, any] = useState(null)
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
		const parsedC = data.reduce((acc: ParsedCountT, each: ServerCountType, idx: number) => {
			const newAcc: any = { ...acc }
			newAcc.bagNote5.push({ 
				label: 'Bagged £5',
				y: (each.float?.bagNote5 || 0) / (100 * 5), 
				// @ts-ignore
				x: idx
				, timestamp: each.timestamp ? new Date(each.timestamp).toLocaleString('en-GB') : undefined
			})
			newAcc.bagPound2.push({ 
				label: 'Bagged £2',
				y: (each.float?.bagPound2 || 0) / (100 * 20), 
				// @ts-ignore
				x: idx
				, timestamp: each.timestamp ? new Date(each.timestamp).toLocaleString('en-GB') : undefined
			})
			newAcc.bagPound1.push({ 
				label: 'Bagged £1',
				y: (each.float?.bagPound1 || 0) / (100 * 20), 
				// @ts-ignore
				x: idx
				, timestamp: each.timestamp ? new Date(each.timestamp).toLocaleString('en-GB') : undefined
			})
			newAcc.bagPence50.push({ 
				label: 'Bagged 50p',
				y: (each.float?.bagPence50 || 0) / (100 * 10), 
				// @ts-ignore
				x: idx
				, timestamp: each.timestamp ? new Date(each.timestamp).toLocaleString('en-GB') : undefined
			})
			newAcc.bagPence20.push({ 
				label: 'Bagged 20p',
				y: (each.float?.bagPence20 || 0) / (100 * 10), 
				// @ts-ignore
				x: idx
				, timestamp: each.timestamp ? new Date(each.timestamp).toLocaleString('en-GB') : undefined
			})
			newAcc.bagPence10.push({ 
				label: 'Bagged 10p',
				y: (each.float?.bagPence10 || 0) / (100 * 5), 
				// @ts-ignore
				x: idx
				, timestamp: each.timestamp ? new Date(each.timestamp).toLocaleString('en-GB') : undefined
			})
			newAcc.bagPence5.push({ 
				label: 'Bagged 5p',
				y: (each.float?.bagPence5 || 0) / (100 * 5), 
				// @ts-ignore
				x: idx
				, timestamp: each.timestamp ? new Date(each.timestamp).toLocaleString('en-GB') : undefined
			})
			newAcc.bagPence2.push({ 
				label: 'Bagged 2p',
				y: (each.float?.bagPence2 || 0) / 100, 
				// @ts-ignore
				x: idx
				, timestamp: each.timestamp ? new Date(each.timestamp).toLocaleString('en-GB') : undefined
			})
			newAcc.bagPence1.push({ 
				label: 'Bagged 1p',
				y: (each.float?.bagPence1 || 0) / 100,
				// @ts-ignore
				x: idx
				, timestamp: each.timestamp ? new Date(each.timestamp).toLocaleString('en-GB') : undefined
			})
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
		setParsedCount(parsedC)
	}, [data])

	const handleRepoChange = (e: any) => {
		setRepo(e.target.value)
	}

	// const poundTwo = data.map((each: ServerCountType, idx: number) => ({ 
	// 	y: (each.float?.bagPound2 || 0) / 100, 
	// 	// @ts-ignore
	// 	x: idx//new Date(each.timestamp) 
	// 	, timestamp: each.timestamp ? new Date(each.timestamp) : undefined
	// }))

	return (
		<div
			
		>
			<Select
				onChange={handleRepoChange}
				value={repo}
			>
				{
					repoList.map((each: any) => 
						<option
							key={each.id}
							value={each.id}
						>
							{
								each.name
							}
						</option>
					)
				}
			</Select>
			<DateInput 
				flex='1' 
				selected={startTime}
				onChange={(d: any) => setStartTime(d)}
				name='Date Start'
				locale='gb'
				timeFormat='HH:mm'
				timeCaption='time input'
				dateFormat='dd/MM/yyyy'
			/>
			<DateInput 
				flex='1' 
				selected={endTime}
				onChange={(d: any) => setEndTime(d)}
				name='Date Start'
				locale='gb'
				timeFormat='HH:mm'
				timeCaption='time input'
				dateFormat='dd/MM/yyyy'
			/>
			<XYPlot
				width={1000}
				height={400}
				style={{
					position: 'relative'
				}}
			>
				<HorizontalGridLines />
				{/* <LineSeries 
					fill='none'
					// @ts-ignore
					data={poundTwo}
				/> */}
				<LineSeries 
					fill='none'
					// @ts-ignore
					data={parsedCount.bagNote5}
				/>
				<LineSeries 
					fill='none'
					// @ts-ignore
					data={parsedCount.bagPound2}
				/>
				<LineSeries 
					fill='none'
					// @ts-ignore
					data={parsedCount.bagPound1}
				/>
				<LineSeries 
					fill='none'
					// @ts-ignore
					data={parsedCount.bagPence50}
				/>
				<LineSeries 
					fill='none'
					// @ts-ignore
					data={parsedCount.bagPence20}
				/>
				<LineSeries 
					fill='none'
					// @ts-ignore
					data={parsedCount.bagPence10}
				/>
				<LineSeries 
					fill='none'
					// @ts-ignore
					data={parsedCount.bagPence5}
				/>
				<LineSeries 
					fill='none'
					// @ts-ignore
					data={parsedCount.bagPence2}
				/>
				<LineSeries 
					fill='none'
					// @ts-ignore
					data={parsedCount.bagPence1}
				/>
				<MarkSeries 
					className='bagged-note-five'
					// @ts-ignore
					data={parsedCount.bagNote5}
					onValueMouseOver={(v: any) => setInspecting(v)}
				/>
				<MarkSeries 
					className='bagged-pound-two'
					// @ts-ignore
					data={parsedCount.bagPound2}
					onValueMouseOver={(v: any) => setInspecting(v)}
				/>
				<MarkSeries 
					className='bagged-pound-one'
					// @ts-ignore
					data={parsedCount.bagPound1}
					onValueMouseOver={(v: any) => setInspecting(v)}
				/>
				<MarkSeries 
					className='bagged-pence-fifty'
					// @ts-ignore
					data={parsedCount.bagPence50}
					onValueMouseOver={(v: any) => setInspecting(v)}
				/>
				<MarkSeries 
					className='bagged-pence-twenty'
					// @ts-ignore
					data={parsedCount.bagPence20}
					onValueMouseOver={(v: any) => setInspecting(v)}
				/>
				<MarkSeries 
					className='bagged-pence-ten'
					// @ts-ignore
					data={parsedCount.bagPence10}
					onValueMouseOver={(v: any) => setInspecting(v)}
				/>
				<MarkSeries 
					className='bagged-pence-five'
					// @ts-ignore
					data={parsedCount.bagPence5}
					onValueMouseOver={(v: any) => setInspecting(v)}
				/>
				<MarkSeries 
					className='bagged-pence-two'
					// @ts-ignore
					data={parsedCount.bagPence2}
					onValueMouseOver={(v: any) => setInspecting(v)}
				/>
				<MarkSeries 
					className='bagged-pence-one'
					// @ts-ignore
					data={parsedCount.bagPence1}
					onValueMouseOver={(v: any) => setInspecting(v)}
				/>
				<XAxis />
				<YAxis />
				{ (inspecting !== null) && <Hint value={inspecting} /> }
			</XYPlot>
			{
				JSON.stringify(inspecting)
			}
		</div>
	)
}

export default VisTest1