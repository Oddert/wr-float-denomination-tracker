import { render } from '@testing-library/react'
import App from '../../App'

describe('TopControlGroup', () => {
	test('it renders without crashing', () => {
		const { container } = render(<App />)
		expect(container.getElementsByClassName('App').length).toBe(1)
	})
})