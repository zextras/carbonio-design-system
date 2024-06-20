/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import { faker } from '@faker-js/faker';
import { act, screen, waitFor, within } from '@testing-library/react';

import { Chip } from './Chip';
import { Text } from '../../index';
import { setup } from '../../test-utils';
import { ICONS } from '../../testUtils/constants';
import { TIMERS } from '../constants';

describe('Chip', () => {
	test('Render Chip with capitals', () => {
		const firstName = faker.person.firstName();
		const lastName = faker.person.lastName();
		const label = `${firstName} ${lastName}`;
		setup(<Chip keyLabel="name:" label={label} />);
		expect(screen.getByText('name:')).toBeVisible();
		expect(screen.getByText(label)).toBeVisible();
		expect(screen.getByText(`${firstName[0]}${lastName[0]}`.toUpperCase())).toBeVisible();
	});

	test('Render Chip with icon', () => {
		const firstName = faker.person.firstName();
		const lastName = faker.person.lastName();
		const label = `${firstName} ${lastName}`;
		setup(<Chip label={label} avatarIcon="People" />);
		expect(
			screen.queryByText(`${firstName[0]}${lastName[0]}`.toUpperCase())
		).not.toBeInTheDocument();
		expect(screen.getByTestId('icon: People')).toBeVisible();
	});

	test('Render chip without avatar', () => {
		const firstName = faker.person.firstName();
		const lastName = faker.person.lastName();
		const label = `${firstName} ${lastName}`;
		setup(<Chip label={label} hasAvatar={false} />);
		expect(
			screen.queryByText(`${firstName[0]}${lastName[0]}`.toUpperCase())
		).not.toBeInTheDocument();
	});

	test('Render chip with custom label', () => {
		const label = (
			<>
				<Text>Custom text</Text>
				<Text>with components</Text>
			</>
		);
		setup(<Chip keyLabel="custom:" label={label} avatarLabel="Aaa Bbb" />);
		expect(screen.getByText('Custom text')).toBeVisible();
		expect(screen.getByText('with components')).toBeVisible();
		expect(screen.getByText('custom:')).toBeVisible();
		expect(screen.getByText('AB')).toBeVisible();
	});

	test('Render chip with close action', async () => {
		const label = 'chip label';
		const closeFn = jest.fn();
		const { user } = setup(<Chip label={label} onClose={closeFn} />);
		expect(screen.getByTestId(ICONS.close)).toBeVisible();
		await user.click(screen.getByTestId(ICONS.close));
		expect(closeFn).toHaveBeenCalled();
	});

	test('Render chip with close action disabled', async () => {
		const label = 'chip label';
		const closeFn = jest.fn();
		const { user } = setup(<Chip label={label} onClose={closeFn} closable={false} />);
		expect(screen.getByTestId(ICONS.close)).toBeVisible();
		await user.click(screen.getByTestId(ICONS.close));
		expect(closeFn).not.toHaveBeenCalled();
	});

	test('Render chip without close action', () => {
		const label = 'chip label';
		setup(<Chip label={label} closable />);
		expect(screen.queryByTestId(ICONS.close)).not.toBeInTheDocument();
	});

	test('Render chip with actions', async () => {
		const label = 'chip label';
		const actions = [
			{
				id: 'action0',
				icon: 'Star',
				type: 'icon',
				label: 'tooltip action0'
			},
			{
				id: 'action1',
				icon: 'People',
				type: 'button',
				label: 'tooltip action1',
				onClick: jest.fn()
			},
			{
				id: 'action2',
				icon: 'Eye',
				type: 'icon',
				// add onClick callback even if it is not allowed by ts to check it is not called
				onClick: jest.fn()
			},
			{
				id: 'action3',
				icon: 'Share',
				type: 'button',
				onClick: jest.fn(),
				disabled: true
			}
		];

		const { user } = setup(
			<Chip
				label={label}
				// force cast to allow onClick field even on icon action
				actions={actions as React.ComponentPropsWithRef<typeof Chip>['actions']}
			/>
		);

		// wait so tooltips can register the listeners
		jest.advanceTimersByTime(TIMERS.TOOLTIP.REGISTER_LISTENER);
		expect(screen.getByTestId('icon: Star')).toBeVisible();
		expect(screen.getByTestId('icon: People')).toBeVisible();
		expect(screen.getByTestId('icon: Eye')).toBeVisible();
		expect(screen.getByTestId('icon: Share')).toBeVisible();
		await user.hover(screen.getByTestId('icon: Star'));
		await waitFor(() => {
			expect(screen.getByText('tooltip action0')).toBeVisible();
		});
		await act(async () => {
			await user.unhover(screen.getByTestId('icon: Star'));
		});
		expect(screen.queryByText('tooltip action0')).not.toBeInTheDocument();
		await user.hover(screen.getByTestId('icon: People'));
		await waitFor(() => {
			expect(screen.getByText('tooltip action1')).toBeVisible();
		});
		await act(async () => {
			await user.unhover(screen.getByTestId('icon: People'));
		});
		expect(screen.queryByText('tooltip action1')).not.toBeInTheDocument();
		await user.click(screen.getByTestId('icon: People'));
		expect(actions[1].onClick).toHaveBeenCalled();
		const iconEye = await screen.findByTestId('icon: Eye');
		await user.click(iconEye);
		expect(actions[2].onClick).not.toHaveBeenCalled();
		expect(
			screen.getAllByRole('button').find((element) => within(element).queryByTestId('icon: Share'))
		).toBeDisabled();
		await user.click(screen.getByTestId('icon: Share'));
		expect(actions[3].onClick).not.toHaveBeenCalled();
	});

	test('Render chip with disable makes everything disabled. Actions tooltip is not shown', async () => {
		const label = 'chip label';
		const actions = [
			{
				id: 'action0',
				icon: 'Star',
				type: 'icon',
				label: 'tooltip action0'
			},
			{
				id: 'action1',
				icon: 'People',
				type: 'button',
				label: 'tooltip action1',
				onClick: jest.fn()
			},
			{
				id: 'action2',
				icon: 'Eye',
				type: 'icon',
				onClick: jest.fn()
			},
			{
				id: 'action3',
				icon: 'Share',
				type: 'button',
				onClick: jest.fn(),
				disabled: true
			}
		];
		const closeFn = jest.fn();
		const { user } = setup(
			<Chip
				label={label}
				// force cast to allow onClick even on icon action
				actions={actions as React.ComponentPropsWithRef<typeof Chip>['actions']}
				disabled="Message to explain disabled status"
				onClose={closeFn}
			/>
		);
		// wait so tooltips can register the listeners
		jest.advanceTimersByTime(TIMERS.TOOLTIP.REGISTER_LISTENER);
		expect(screen.getByTestId('icon: Star')).toBeVisible();
		expect(screen.getByTestId('icon: People')).toBeVisible();
		expect(screen.getByTestId('icon: Eye')).toBeVisible();
		expect(screen.getByTestId('icon: Share')).toBeVisible();
		expect(screen.getByTestId(ICONS.close)).toBeVisible();
		await user.hover(screen.getByTestId('icon: Star'));
		await screen.findByText(/Message to explain disabled status/i);
		expect(screen.queryByText('tooltip action0')).not.toBeInTheDocument();
		await act(async () => {
			await user.unhover(screen.getByTestId('icon: Star'));
		});
		await user.hover(screen.getByTestId('icon: People'));
		await screen.findByText(/Message to explain disabled status/i);
		expect(screen.queryByText('tooltip action1')).not.toBeInTheDocument();
		await act(async () => {
			await user.unhover(screen.getByTestId('icon: People'));
		});
		expect(
			screen.getAllByRole('button').find((element) => within(element).queryByTestId('icon: People'))
		).toBeDisabled();
		await user.click(screen.getByTestId('icon: People'));
		await screen.findByText(/Message to explain disabled status/i);
		expect(actions[1].onClick).not.toHaveBeenCalled();
		await user.click(screen.getByTestId('icon: Eye'));
		expect(actions[2].onClick).not.toHaveBeenCalled();
		expect(
			screen.getAllByRole('button').find((element) => within(element).queryByTestId('icon: Share'))
		).toBeDisabled();
		await user.click(screen.getByTestId('icon: Share'));
		await screen.findByText(/Message to explain disabled status/i);
		expect(actions[3].onClick).not.toHaveBeenCalled();
		expect(
			screen.getAllByRole('button').find((element) => within(element).queryByTestId(ICONS.close))
		).toBeDisabled();
		await user.click(screen.getByTestId(ICONS.close));
		await screen.findByText(/Message to explain disabled status/i);
		expect(closeFn).not.toHaveBeenCalled();
		await user.hover(screen.getByText(label));
		await waitFor(() => {
			expect(screen.getByText('Message to explain disabled status')).toBeVisible();
		});
		await act(async () => {
			await user.unhover(screen.getByText(label));
		});
		expect(screen.queryByText('Message to explain disabled status')).not.toBeInTheDocument();
	});

	test('Render chip with error. Actions tooltips are visible and make error tooltip disappear', async () => {
		const label = 'chip label';
		const actions = [
			{
				id: 'action0',
				icon: 'Star',
				type: 'icon',
				label: 'tooltip action0'
			},
			{
				id: 'action1',
				icon: 'People',
				type: 'button',
				label: 'tooltip action1',
				onClick: jest.fn()
			},
			{
				id: 'action2',
				icon: 'Eye',
				type: 'icon',
				onClick: jest.fn()
			},
			{
				id: 'action3',
				icon: 'Share',
				type: 'button',
				onClick: jest.fn(),
				disabled: true
			}
		];
		const { user } = setup(
			<Chip
				label={label}
				error="Message for error"
				// force cast to allow onClick even on icon action
				actions={actions as React.ComponentPropsWithRef<typeof Chip>['actions']}
			/>
		);
		// wait so tooltips can register the listeners
		jest.advanceTimersByTime(TIMERS.TOOLTIP.REGISTER_LISTENER);
		await user.hover(screen.getByText(label));
		await screen.findByText(/message for error/i);
		expect(screen.getByText('Message for error')).toBeVisible();
		await act(async () => {
			await user.unhover(screen.getByText(label));
		});
		expect(screen.queryByText('Message for error')).not.toBeInTheDocument();
		await user.hover(screen.getByTestId('icon: Star'));
		await screen.findByText(/tooltip action0/i);
		expect(screen.getByText('tooltip action0')).toBeVisible();
		expect(screen.queryByText('Message for error')).not.toBeInTheDocument();
		await act(async () => {
			await user.unhover(screen.getByTestId('icon: Star'));
		});
		await user.hover(screen.getByTestId('icon: People'));
		await screen.findByText(/tooltip action1/i);
		expect(screen.getByText('tooltip action1')).toBeVisible();
		expect(screen.queryByText('Message for error')).not.toBeInTheDocument();
	});

	test('Render chip with click and double click', async () => {
		const label = 'chip label';
		const clickFn = jest.fn();
		const doubleClickFn = jest.fn();
		const { user } = setup(<Chip label={label} onClick={clickFn} onDoubleClick={doubleClickFn} />);
		await user.click(screen.getByText(label));
		expect(clickFn).toHaveBeenCalled();
		await user.dblClick(screen.getByText(label));
		expect(doubleClickFn).toHaveBeenCalled();
	});
});
