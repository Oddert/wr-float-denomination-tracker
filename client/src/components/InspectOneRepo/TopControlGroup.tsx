import React, { useContext } from 'react'

import {
	Flex,
	Button,
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb,
} from '@chakra-ui/react'

import DateInput from '../base/DateInput'
import RepoSelect from './RepoSelect'
import { 
	startDateSet, 
	endDateSet, 
	adjustmentUseSet,
} from './InspectRepoActions'
import { InspectRepoContext } from './Utils'

interface Props {
	adjustmentStepSize: number
	setAdjustmentStepSize: (v: any) => void
}

const TopControlGroup: React.FC<Props> = ({
	adjustmentStepSize,
	setAdjustmentStepSize,
}) => {
	const { contextState, contextDispatch } = useContext(InspectRepoContext)

	const { 
		startTime, 
		endTime, 
		useAdjustments,
	} = contextState

	return (
		<Flex
			alignItems='center'
		>
			<p>Top Control Group</p>
			<RepoSelect />
			<DateInput 
				flex='1' 
				selected={startTime}
				onChange={(d: any) => contextDispatch(startDateSet(d))}
				name='Date Start'
				locale='gb'
				timeFormat='HH:mm'
				timeCaption='time input'
				dateFormat='dd/MM/yyyy'
			/>
			<DateInput 
				flex='1' 
				selected={endTime}
				onChange={(d: any) => contextDispatch(endDateSet(d))}
				name='Date Start'
				locale='gb'
				timeFormat='HH:mm'
				timeCaption='time input'
				dateFormat='dd/MM/yyyy'
			/>
			<Button
				onClick={() => contextDispatch(adjustmentUseSet(!useAdjustments))}
				variant='ui'
			>
				Adjustments: {useAdjustments ? 'ON' : 'OFF'}
			</Button>
			<Slider
				min={0.05}
				max={.8}
				step={0.01}
				value={adjustmentStepSize}
				onChange={(v: any) => setAdjustmentStepSize(v)}
				// onChangeEnd={(v: any) => setAdjustmentStepSize(v)}
				width={'200px'}
			>
				<SliderTrack>
					<SliderFilledTrack />
				</SliderTrack>
				<SliderThumb />
			</Slider>
		</Flex>
	)
}

export default TopControlGroup