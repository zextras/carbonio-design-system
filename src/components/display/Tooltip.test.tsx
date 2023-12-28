/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import { screen } from '@testing-library/react';

import { Tooltip } from './Tooltip';
import { setup } from '../../test-utils';
import { Button } from '../basic/Button';
import { TIMERS } from '../constants';
import { Container } from '../layout/Container';

describe('Tooltip', () => {
	test('Render Tooltip', async () => {
		const messageText = 'Overflowing tooltip text';
		const clickFn = jest.fn();
		const { user } = setup(
			<Container orientation="horizontal" mainAlignment="flex-start">
				<Tooltip placement="right" label={messageText}>
					<Button label="Name Lastname" onClick={clickFn} />
				</Tooltip>
			</Container>
		);
		const button = screen.getByText(/Name Lastname/i);
		// wait so tooltip can register the listeners
		jest.advanceTimersByTime(TIMERS.TOOLTIP.REGISTER_LISTENER);
		await user.hover(button);
		await screen.findByText(messageText);

		expect(screen.getByText(messageText)).toBeVisible();
	});

	test('Disabled Tooltip is not shown', async () => {
		const messageText = 'Overflowing tooltip text';
		const clickFn = jest.fn();
		const { user } = setup(
			<Container orientation="horizontal" mainAlignment="flex-start">
				<Tooltip placement="right" label={messageText} disabled>
					<Button label="Name Lastname" onClick={clickFn} />
				</Tooltip>
			</Container>
		);
		const button = screen.getByText(/Name Lastname/i);
		// wait so tooltip can register the listeners
		jest.advanceTimersByTime(TIMERS.TOOLTIP.REGISTER_LISTENER);
		await user.hover(button);
		jest.advanceTimersByTime(TIMERS.TOOLTIP.DELAY_SHOW);
		expect(screen.queryByText(messageText)).not.toBeInTheDocument();
	});

	test('Ref for children is set through the prop triggerRef', () => {
		const childRef = React.createRef<HTMLElement>();
		const triggerRef = React.createRef<HTMLElement>();
		setup(
			<Tooltip label={'tooltip label'} triggerRef={triggerRef}>
				<span ref={childRef}>Trigger tooltip</span>
			</Tooltip>
		);
		expect(childRef.current).toBeNull();
		expect(triggerRef.current).not.toBeNull();
		expect(screen.getByText('Trigger tooltip')).toBe(triggerRef.current);
	});
});
