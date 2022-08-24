/* eslint-disable no-promise-executor-return */
/* eslint-disable import/no-extraneous-dependencies */

/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { waitFor, within } from '@testing-library/react';
import React from 'react';
import { screen } from '@testing-library/dom';
import { faker } from '@faker-js/faker';
import userEvent from '@testing-library/user-event';
import { render } from '../../test-utils';
import { Chip } from './Chip';
import { Text } from '../../index';

describe('Chip', () => {
	test('Render Chip with capitals', () => {
		const firstName = faker.name.firstName();
		const lastName = faker.name.lastName();
		const label = `${firstName} ${lastName}`;
		render(<Chip keyLabel="name:" label={label} />);
		expect(screen.getByText('name:')).toBeVisible();
		expect(screen.getByText(label)).toBeInTheDocument();
		expect(screen.getByText(label)).toBeVisible();
		expect(screen.getByText(`${firstName[0]}${lastName[0]}`.toUpperCase())).toBeInTheDocument();
		expect(screen.getByText(`${firstName[0]}${lastName[0]}`.toUpperCase())).toBeVisible();
	});

	test('Render Chip with icon', () => {
		const firstName = faker.name.firstName();
		const lastName = faker.name.lastName();
		const label = `${firstName} ${lastName}`;
		render(<Chip label={label} avatarIcon="People" />);
		expect(
			screen.queryByText(`${firstName[0]}${lastName[0]}`.toUpperCase())
		).not.toBeInTheDocument();
		expect(screen.getByTestId('icon: People')).toBeVisible();
	});

	test('Render chip without avatar', () => {
		const firstName = faker.name.firstName();
		const lastName = faker.name.lastName();
		const label = `${firstName} ${lastName}`;
		render(<Chip label={label} hasAvatar={false} />);
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
		render(<Chip keyLabel="custom:" label={label} avatarLabel="Aaa Bbb" />);
		expect(screen.getByText('Custom text')).toBeInTheDocument();
		expect(screen.getByText('Custom text')).toBeVisible();
		expect(screen.getByText('with components')).toBeVisible();
		expect(screen.getByText('custom:')).toBeVisible();
		expect(screen.getByText('AB')).toBeVisible();
	});

	test('Render chip with close action', () => {
		const label = 'chip label';
		const closeFn = jest.fn();
		render(<Chip label={label} onClose={closeFn} />);
		expect(screen.getByTestId('icon: Close')).toBeVisible();
		userEvent.click(screen.getByTestId('icon: Close'));
		expect(closeFn).toHaveBeenCalled();
	});

	test('Render chip with close action disabled', () => {
		const label = 'chip label';
		const closeFn = jest.fn();
		render(<Chip label={label} onClose={closeFn} closable={false} />);
		expect(screen.getByTestId('icon: Close')).toBeVisible();
		userEvent.click(screen.getByTestId('icon: Close'));
		expect(closeFn).not.toHaveBeenCalled();
	});

	test('Render chip without close action', () => {
		const label = 'chip label';
		render(<Chip label={label} closable />);
		expect(screen.queryByTestId('icon: Close')).not.toBeInTheDocument();
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

		render(
			<Chip
				label={label}
				// force cast to allow onClick field even on icon action
				actions={actions as React.ComponentPropsWithRef<typeof Chip>['actions']}
			/>
		);
		// wait so tooltips can register the listeners
		await new Promise((r) => {
			setTimeout(r, 100);
		});
		expect(screen.getByTestId('icon: Star')).toBeVisible();
		expect(screen.getByTestId('icon: People')).toBeVisible();
		expect(screen.getByTestId('icon: Eye')).toBeVisible();
		expect(screen.getByTestId('icon: Share')).toBeVisible();
		userEvent.hover(screen.getByTestId('icon: Star'));
		await waitFor(() => {
			expect(screen.getByText('tooltip action0')).toBeVisible();
		});
		userEvent.unhover(screen.getByTestId('icon: Star'));
		expect(screen.queryByText('tooltip action0')).not.toBeInTheDocument();
		userEvent.hover(screen.getByTestId('icon: People'));
		await waitFor(() => {
			expect(screen.getByText('tooltip action1')).toBeVisible();
		});
		userEvent.unhover(screen.getByTestId('icon: People'));
		expect(screen.queryByText('tooltip action1')).not.toBeInTheDocument();
		userEvent.click(screen.getByTestId('icon: People'));
		expect(actions[1].onClick).toHaveBeenCalled();
		userEvent.click(screen.getByTestId('icon: Eye'));
		expect(actions[2].onClick).not.toHaveBeenCalled();
		expect(
			screen.getAllByRole('button').find((element) => within(element).queryByTestId('icon: Share'))
		).toBeDisabled();
		userEvent.click(screen.getByTestId('icon: Share'));
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
		render(
			<Chip
				label={label}
				// force cast to allow onClick even on icon action
				actions={actions as React.ComponentPropsWithRef<typeof Chip>['actions']}
				disabled="Message to explain disabled status"
				onClose={closeFn}
			/>
		);
		// wait so tooltips can register the listeners
		await new Promise((r) => {
			setTimeout(r, 100);
		});
		expect(screen.getByTestId('icon: Star')).toBeVisible();
		expect(screen.getByTestId('icon: People')).toBeVisible();
		expect(screen.getByTestId('icon: Eye')).toBeVisible();
		expect(screen.getByTestId('icon: Share')).toBeVisible();
		expect(screen.getByTestId('icon: Close')).toBeVisible();
		userEvent.hover(screen.getByTestId('icon: Star'));
		await screen.findByText(/Message to explain disabled status/i);
		expect(screen.queryByText('tooltip action0')).not.toBeInTheDocument();
		userEvent.unhover(screen.getByTestId('icon: Star'));
		userEvent.hover(screen.getByTestId('icon: People'));
		await screen.findByText(/Message to explain disabled status/i);
		expect(screen.queryByText('tooltip action1')).not.toBeInTheDocument();
		userEvent.unhover(screen.getByTestId('icon: People'));
		expect(
			screen.getAllByRole('button').find((element) => within(element).queryByTestId('icon: People'))
		).toBeDisabled();
		userEvent.click(screen.getByTestId('icon: People'));
		await screen.findByText(/Message to explain disabled status/i);
		expect(actions[1].onClick).not.toHaveBeenCalled();
		userEvent.click(screen.getByTestId('icon: Eye'));
		expect(actions[2].onClick).not.toHaveBeenCalled();
		expect(
			screen.getAllByRole('button').find((element) => within(element).queryByTestId('icon: Share'))
		).toBeDisabled();
		userEvent.click(screen.getByTestId('icon: Share'));
		await screen.findByText(/Message to explain disabled status/i);
		expect(actions[3].onClick).not.toHaveBeenCalled();
		expect(
			screen.getAllByRole('button').find((element) => within(element).queryByTestId('icon: Close'))
		).toBeDisabled();
		userEvent.click(screen.getByTestId('icon: Close'));
		await screen.findByText(/Message to explain disabled status/i);
		expect(closeFn).not.toHaveBeenCalled();
		expect(screen.getByText(label)).toHaveAttribute('disabled');
		userEvent.hover(screen.getByText(label));
		await waitFor(() => {
			expect(screen.getByText('Message to explain disabled status')).toBeVisible();
		});
		userEvent.unhover(screen.getByText(label));
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
		render(
			<Chip
				label={label}
				error="Message for error"
				// force cast to allow onClick even on icon action
				actions={actions as React.ComponentPropsWithRef<typeof Chip>['actions']}
			/>
		);
		// wait so tooltips can register the listeners
		await new Promise((r) => {
			setTimeout(r, 100);
		});
		userEvent.hover(screen.getByText(label));
		await screen.findByText(/message for error/i);
		expect(screen.getByText('Message for error')).toBeVisible();
		userEvent.unhover(screen.getByText(label));
		expect(screen.queryByText('Message for error')).not.toBeInTheDocument();
		userEvent.hover(screen.getByTestId('icon: Star'));
		await screen.findByText(/tooltip action0/i);
		expect(screen.getByText('tooltip action0')).toBeVisible();
		expect(screen.queryByText('Message for error')).not.toBeInTheDocument();
		userEvent.unhover(screen.getByTestId('icon: Star'));
		userEvent.hover(screen.getByTestId('icon: People'));
		await screen.findByText(/tooltip action1/i);
		expect(screen.getByText('tooltip action1')).toBeVisible();
		expect(screen.queryByText('Message for error')).not.toBeInTheDocument();
		userEvent.unhover(screen.getByTestId('icon: People'));
	});

	test('Render chip with click and double click', async () => {
		const label = 'chip label';
		const clickFn = jest.fn();
		const doubleClickFn = jest.fn();
		render(<Chip label={label} onClick={clickFn} onDoubleClick={doubleClickFn} />);
		userEvent.click(screen.getByText(label));
		expect(clickFn).toHaveBeenCalled();
		userEvent.dblClick(screen.getByText(label));
		expect(doubleClickFn).toHaveBeenCalled();
	});
});
