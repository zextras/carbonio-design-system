/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import { screen } from '@testing-library/react';

import { Tooltip } from './Tooltip';
import { setup } from '../../../tests/utils';
import { Button } from '../../basic/button/Button';
import { TIMERS } from '../../constants';
import { Container } from '../../layout/container/Container';

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

	test('If two or more tooltips wrap the same component only the closest will render', async () => {
		const messageText = 'tooltip 1 text';
		const message2Text = 'tooltip 2 text';
		const clickFn = jest.fn();
		const { user } = setup(
			<Tooltip placement="right" label={messageText}>
				<Tooltip placement="right" label={message2Text}>
					<Button label="Name Lastname" onClick={clickFn} />
				</Tooltip>
			</Tooltip>
		);
		const button = screen.getByText(/Name Lastname/i);
		// wait so tooltip can register the listeners
		jest.advanceTimersByTime(TIMERS.TOOLTIP.REGISTER_LISTENER);
		await user.hover(button);
		await screen.findByText(message2Text);

		expect(screen.getByText(message2Text)).toBeVisible();
		expect(screen.queryByText(messageText)).not.toBeInTheDocument();
	});

	test('If tooltips are nested only the closest will render', async () => {
		const messageText = 'tooltip 1 text';
		const message2Text = 'tooltip 2 text';
		const clickFn = jest.fn();
		const { user } = setup(
			<Tooltip placement="right" label={messageText}>
				<Container orientation="horizontal" mainAlignment="flex-start">
					<Tooltip placement="right" label={message2Text}>
						<Button label="Name Lastname" onClick={clickFn} />
					</Tooltip>
				</Container>
			</Tooltip>
		);
		const button = screen.getByText(/Name Lastname/i);
		// wait so tooltip can register the listeners
		jest.advanceTimersByTime(TIMERS.TOOLTIP.REGISTER_LISTENER);
		await user.hover(button);
		await screen.findByText(message2Text);

		expect(screen.getByText(message2Text)).toBeVisible();
		expect(screen.queryByText(messageText)).not.toBeInTheDocument();
	});

	test('If tooltips are nested and the closest is disabled only the next one will render', async () => {
		const messageText = 'tooltip 1 text';
		const message2Text = 'tooltip 2 text';
		const clickFn = jest.fn();
		const { user } = setup(
			<Tooltip placement="right" label={messageText}>
				<Container orientation="horizontal" mainAlignment="flex-start">
					<Tooltip placement="right" label={message2Text} disabled>
						<Button label="Name Lastname" onClick={clickFn} />
					</Tooltip>
				</Container>
			</Tooltip>
		);
		const button = screen.getByText(/Name Lastname/i);
		// wait so tooltip can register the listeners
		jest.advanceTimersByTime(TIMERS.TOOLTIP.REGISTER_LISTENER);
		await user.hover(button);
		await screen.findByText(messageText);

		expect(screen.queryByText(message2Text)).not.toBeInTheDocument();
		expect(screen.getByText(messageText)).toBeVisible();
	});
});
