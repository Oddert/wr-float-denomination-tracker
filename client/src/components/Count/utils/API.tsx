export const repositories: ['401', '403', 'lotto'] = ['401', '403', 'lotto']

export enum CountActions {
	WRITE_ALL = 'WRITE_ALL',
	SET_READY = 'SET_READY',
	UPDATE_REPO = 'UPDATE_REPO',
	UPDATE_COUTNER = 'UPDATE_COUTNER',
	UPDATE_SUPERVISOR = 'UPDATE_SUPERVISOR',
	UPDATE_TIME = 'UPDATE_TIME',
	UPDATE_BAG = 'UPDATE_BAG',
	UPDATE_LOOSE = 'UPDATE_LOOSE',
	UPDATE_NOTES = 'UPDATE_NOTES',
}

export const sanitiseNumberInputVal = (
	n: number | string | undefined | null, 
	step: number
): number | undefined => {
	if (typeof n === 'number') return n / step
	else return undefined
}