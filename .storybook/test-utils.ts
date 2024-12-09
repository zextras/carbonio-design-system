/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { within } from '@storybook/test';

import { queriesExtended } from '../src/tests/custom-queries';

function customWithin(canvasElement: HTMLElement): ReturnType<typeof within> {
	return within(canvasElement, queriesExtended);
}
export { customWithin as within };
