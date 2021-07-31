/** @ jsxRuntime classic */
/** @ jsx jsx */
import React, { useEffect, useReducer } from 'react'
// import { css, jsx } from '@emotion/react'

import { 
	ServerCountType, 
	BagTypeReadableLabels,
} from '../../global'

import { 
	InspectRepoContext, 
} from './Utils'

import {
	ParsedCountBagsT,
} from './types'

import TopControlGroup from './TopControlGroup'
import { inspectRepoInitialState } from './Utils'
import InspectRepoReducer from './InspectRepoReducer'
import GraphOnlyBags from './GraphOnlyBags'
import { dataSet, parsedCountBagsSet } from './InspectRepoActions'

// const styles = css`
// 	color: red;
// `

interface ServerCountTypeWithAdjustment extends ServerCountType {
	adjustment?: number | null
}

const InspectOneRepo: React.FC = () => {
	const [contextState, contextDispatch] = useReducer(InspectRepoReducer, inspectRepoInitialState)

	const { 
		startTime, 
		endTime, 
		useAdjustments, 
		repo, 
		adjustmentStepSize,
		inspecting,
		data,
	} = contextState
	
	// ===============================
	// # Use Effect 1/2
	// 		- For the specified date range, pull count data for the select repository
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
				contextDispatch(dataSet(res.counts.reverse()))
			})
	}, [repo, endTime, startTime])

	// ===============================
	// # Use Effect 2/2
	// 		- Uses the data object to create the parsedData oject
	// 		- pasrsedData "rotates" the data to use series based on denomination, instead of per count record
	useEffect(() => {
		// is actually ServerCountType
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
				value: each.float[bag] || 0
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
				const len: number = stack.length
				const middle: number = Math.ceil(len / 2)
				
				for (let i = 1 - middle, j = 0; i <= len - middle; i++, j++) {
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

			return { ...each, float }
		})
		// console.log({ adjustedC, data })

		// const newxAxisLabels: {
		// 	[x: number]: string
		// } = {}

		const parsedC = adjustedC.reduce((acc: ParsedCountBagsT, each: ServerCountTypeWithAdjustment, idx: number) => {
			const newAcc: any = { ...acc }

			// newxAxisLabels[idx] = `${idx}`

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

				// console.log({ newxAxisLabels })
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
		console.log('parsedCountBagsSet', parsedC)
		contextDispatch(parsedCountBagsSet(parsedC))
	}, [
		data, 
		useAdjustments, 
		adjustmentStepSize
	])

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
				<TopControlGroup />
				<GraphOnlyBags />
				{
					JSON.stringify(inspecting)
				}
				<ul
				// @ts-ignore
					// className={css}
				>
					<li>Toggle individual series</li>
					<li>How to emphasis on hover</li>
					<li>Add Crosshair</li>
					<li>Add series labels</li>
						<p>Crosshair Will require own data store + change handlers</p>
						<p>also this font size isnt 12px its lieing</p>
				</ul>
			</div>
		</InspectRepoContext.Provider>
	)
}

export default InspectOneRepo