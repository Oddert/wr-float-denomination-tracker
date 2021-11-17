/** @ jsxRuntime classic */
/** @ jsx jsx */
import React, { useEffect, useReducer, Dispatch } from 'react'
// import { css, jsx } from '@emotion/react'

import { 
	ServerCountType, 
	ServerCountTypeFloatConfirmed,
	BagTypeReadableLabels,
} from '../../global'

import { 
	InspectRepoContext, 
} from './Utils'

import {
	ParsedCountBagsT,
	SingleParsedCountBagT,
	BagTypes,
	InspectRepoInitialStateT,
	InspectRepoAction,
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
	const [contextState, contextDispatch]: [InspectRepoInitialStateT, Dispatch<InspectRepoAction>] = useReducer(InspectRepoReducer, inspectRepoInitialState)

	// TODO: change name of adjustYAxisRenderPosition. use* syntax is React special syntax
	const { 
		startTime, 
		endTime, 
		adjustYAxisRenderPosition, 
		repo, 
		adjustmentStepSize,
		inspecting,
		data,
	} = contextState
	
	/**
	 * # Use Effect 1/2
	 * - For the specified date range, pull count data for the select repository
	 * 
	 * @listens {repo, endTime, StartTime}
	 * @dispatch {ServerCountType[]}
	 */
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
				contextDispatch(dataSet(
					res.counts.sort((a: ServerCountType, b: ServerCountType) => {
						const timestampA = Number(a.timestamp)
						const timestampB = Number(b.timestamp)
						return timestampA - timestampB
					})
				))
			})
	}, [repo, endTime, startTime])

	/**
	 * # Use Effect 2/2
	 * - Uses the data object to create the parsedData object
	 * - pasrsedData "rotates" the data to use series based on denomination, instead of per count record
	 * 
	 * @listens {data, adjustYAxisRenderPosition, adjustmentStepSize}
	 * @dispatch {ServerCountType[]}
	 */
	useEffect(() => {
		/**
		 * 
		 */
		const adjustedCount = data.map((each: ServerCountTypeFloatConfirmed) => {
			// Local types and lookup objects
			const bags: BagTypes[] = ['bagNote5', 'bagPound2', 'bagPound1', 'bagPence50', 'bagPence20', 'bagPence10', 'bagPence5', 'bagPence2', 'bagPence1']
			// Used with the 'adjustments' option. Scales diffirent denominations to be uniform.
			const adjustments: {
				bagNote5: number
				bagPound2: number
				bagPound1: number
				bagPence50: number
				bagPence20: number
				bagPence10: number
				bagPence5: number
				bagPence2: number
				bagPence1: number
			} = {
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

			// Copy the float data. 
			// Bag values will be overwritten later and used to render the graph series points.
			const float = { ...each.float }

			interface RecordType {
				label: BagTypes
				value: number
			}

			// for each bag type (BagTypes[]) lookup the value and label
			// create a new array of objects each containing this key. Sort into size order.
			// [{label: 'bagNote5', value: 2}, {label: 'bagPound2', value: 6} ...{label: 'bagPence1', value: 3}]
			const records: RecordType[] = bags.map((bag: BagTypes) => ({
				label: bag,
				value: Number(each.float[bag]) || 0
			}))
			.sort((a, b) => a.value - b.value)

			// A queue method is used to examine each value, grouping same values together
			const stack: RecordType[] = []
			
			// Each Record is compared to the existing stack value (for any items)
			// If the stack is empty, it is the first loop
			// If the current value is the same, add it, otherwise empty the stack.
			records.forEach((oneRecord: RecordType) => {
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

			function emptyStack (oneRecord: RecordType) {
				// The stack size will be    0 < stack.length <= bagTypes.length 
				const len: number = stack.length
				const middle: number = Math.ceil(len / 2)
				
				/**
				 * Looping over the stack, two indexes are used.
				 * i is calculated such that the middle is 0. 
				 * This ensures any sdjustments move items (almost) equally up the graph as down.
				 * j counts loops, used for index access to the stack.
				 */
				for (let i = 1 - middle, j = 0; i <= len - middle; i++, j++) {
					// Labels and values are extracted
					const label = stack[j].label
					const value = stack[j].value
					// if adjustments are in use, offset each point by its relative diffirence
					// NOTE: the fail claus of the tenary used to be i. Check why later
					// TODO: Check functionality given 3 overlapping values. Seems to preference raising all 3 above the line
					const multiplier: number = adjustYAxisRenderPosition 
						? i * adjustmentStepSize * adjustments[label] 
						: 0
					// Lastly, the two values from Record are used to re-write the float values
					float[label] = value + multiplier
				}
				// clear the float, ready for the next BagType
				stack.length = 0
				stack.push(oneRecord)
			}

			return { ...each, float }
		})

		/**
		 * SingleParsedCountBagT is the objects that will be passed to the series and render each point.
		 * Reduce over the adjusted counts previously created, push each of the bags to their own array
		 * 
		 * @return {ParsedCountBagsT}
		 */
		const parsedC: ParsedCountBagsT = adjustedCount.reduce((acc: ParsedCountBagsT, each: ServerCountTypeWithAdjustment, idx: number) => {
			const newAcc: ParsedCountBagsT = { ...acc }

			// create a SingleParsedCountBagT from a given readable label
			function pushToNewAcc (bagType: BagTypeReadableLabels): SingleParsedCountBagT {
				let y = 0
				const timestamp = each.timestamp ? new Date(each.timestamp).toLocaleString('en-GB') : ''
				
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
					label: bagType, y, x: idx, timestamp, id: each.id || 0	
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
		// console.log('parsedCountBagsSet', parsedC)
		// ParsedCountBagsT is now ready to render, dispatch a write action
		contextDispatch(parsedCountBagsSet(parsedC))
	}, [
		data, 
		adjustYAxisRenderPosition, 
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
				<ul>
					<li>Toggle individual series</li>
					<li>How to emphasis on hover</li>
					<li>Add series labels</li>
				</ul>
			</div>
		</InspectRepoContext.Provider>
	)
}

export default InspectOneRepo