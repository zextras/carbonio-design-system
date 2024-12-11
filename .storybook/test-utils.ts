/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type { UserEvent } from '@storybook/test';
import { userEvent, within, screen } from '@storybook/test';
import type { Screen } from '@testing-library/react';

import { queriesExtended } from '../src/tests/custom-queries';

function customWithin(
	canvasElement: HTMLElement
): ReturnType<typeof within<typeof queriesExtended>> {
	return within(canvasElement, queriesExtended);
}

const customScreen: Screen<typeof queriesExtended> = {
	...screen,
	...customWithin(document.body)
};

interface ExtendedUserEvent extends UserEvent {
	readonly rightClick: (target: Element) => ReturnType<typeof userEvent.pointer>;
}

const customUserEvent: ExtendedUserEvent = {
	...userEvent,
	rightClick: (target: Element): ReturnType<typeof userEvent.pointer> =>
		userEvent.pointer({ target, keys: '[MouseRight]' })
};

export { customWithin as within, customScreen as screen, customUserEvent as userEvent };
