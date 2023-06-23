/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Tooltip } from './Tooltip';
import { render } from '../../test-utils';
import { Button } from '../basic/Button';
import { Container } from '../layout/Container';

describe('Tooltip', () => {
	test('Render Tooltip', async () => {
		const messageText = 'Overflowing tooltip text';
		const clickFn = jest.fn();
		render(
			<Container orientation="horizontal" mainAlignment="flex-start">
				<Tooltip placement="right" label={messageText}>
					<Button label="Name Lastname" onClick={clickFn} />
				</Tooltip>
			</Container>
		);
		const button = screen.getByText(/Name Lastname/i);
		// wait so tooltip can register the listeners
		await new Promise((r) => {
			setTimeout(r, 100);
		});
		userEvent.hover(button);
		await screen.findByText(messageText);

		expect(screen.getByText(messageText)).toBeVisible();
	});

	test('Disabled Tooltip is not shown', async () => {
		const messageText = 'Overflowing tooltip text';
		const clickFn = jest.fn();
		render(
			<Container orientation="horizontal" mainAlignment="flex-start">
				<Tooltip placement="right" label={messageText} disabled>
					<Button label="Name Lastname" onClick={clickFn} />
				</Tooltip>
			</Container>
		);
		const button = screen.getByText(/Name Lastname/i);
		// wait so tooltip can register the listeners
		await new Promise((r) => {
			setTimeout(r, 100);
		});
		userEvent.hover(button);
		await new Promise((r) => {
			setTimeout(r, 100);
		});
		expect(screen.queryByText(messageText)).not.toBeInTheDocument();
	});

	test('Ref for children is set through the prop triggerRef', () => {
		const childRef = React.createRef<HTMLElement>();
		const triggerRef = React.createRef<HTMLElement>();
		render(
			<Tooltip label={'tooltip label'} triggerRef={triggerRef}>
				<span ref={childRef}>Trigger tooltip</span>
			</Tooltip>
		);
		expect(childRef.current).toBeNull();
		expect(triggerRef.current).not.toBeNull();
		expect(screen.getByText('Trigger tooltip')).toBe(triggerRef.current);
	});
});
