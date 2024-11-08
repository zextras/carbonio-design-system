import { within } from '@storybook/test'
import { queriesExtended } from '../src/tests/custom-queries';


function customWithin(canvasElement: HTMLElement) {
	return within(canvasElement, queriesExtended)
}
export { customWithin as within };

