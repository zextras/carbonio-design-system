/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import { screen } from '@testing-library/react';

import { Snackbar, SnackbarProps } from './Snackbar';
import { setup, within } from '../../test-utils';
import { ICONS, SELECTORS } from '../../testUtils/constants';

describe('Snackbar', () => {
	it('should be hidden by default', () => {
		setup(<Snackbar label={'test'} />);
		expect(screen.queryByText('test')).not.toBeInTheDocument();
	});

	it('should be visible if open is true', async () => {
		setup(<Snackbar label={'test'} open />);
		expect(screen.getByText('test')).toBeVisible();
	});

	it('should show action by default', () => {
		setup(<Snackbar label={'test'} open />);
		expect(screen.getByRole('button', { name: /ok/i })).toBeVisible();
	});

	it('should show action with custom label', () => {
		setup(<Snackbar label={'test'} open actionLabel={'a custom label'} />);
		expect(screen.getByRole('button', { name: /a custom label/i })).toBeVisible();
	});

	it('should not show action if hideButton is true', () => {
		setup(<Snackbar label={'test'} open actionLabel={'a custom label'} hideButton />);
		expect(screen.queryByRole('button', { name: /ok/i })).not.toBeInTheDocument();
	});

	it('should call onActionClick if defined', async () => {
		const onActionClick = jest.fn();
		const { user } = setup(
			<Snackbar label={'test'} open actionLabel={'action'} onActionClick={onActionClick} />
		);
		await user.click(screen.getByRole('button', { name: /action/i }));
		expect(onActionClick).toHaveBeenCalled();
	});

	it('should call onClose if defined and onActionClick is not defined', async () => {
		const onClose = jest.fn();
		const { user } = setup(
			<Snackbar label={'test'} open actionLabel={'action'} onClose={onClose} />
		);
		await user.click(screen.getByRole('button', { name: /action/i }));
		expect(onClose).toHaveBeenCalled();
	});

	it('should call onActionClick if both onActionClick and onClose are defined', async () => {
		const onActionClick = jest.fn();
		const onClose = jest.fn();
		const { user } = setup(
			<Snackbar
				label={'test'}
				open
				actionLabel={'action'}
				onActionClick={onActionClick}
				onClose={onClose}
			/>
		);
		await user.click(screen.getByRole('button', { name: /action/i }));
		expect(onActionClick).toHaveBeenCalled();
		expect(onClose).not.toHaveBeenCalled();
	});

	it('should call onClose after 4 seconds by default', () => {
		const onClose = jest.fn();
		setup(<Snackbar label={'test'} open onClose={onClose} />);
		jest.advanceTimersByTime(4000);
		expect(onClose).toHaveBeenCalled();
	});

	it('should call onClose after autoHideTimeout if defined', () => {
		const onClose = jest.fn();
		setup(<Snackbar label={'test'} open onClose={onClose} autoHideTimeout={2000} />);
		jest.advanceTimersByTime(2000);
		expect(onClose).toHaveBeenCalled();
	});

	it('should not call onClose after autoHideTimeout if disableAutoHide is true', () => {
		const onClose = jest.fn();
		setup(
			<Snackbar label={'test'} open onClose={onClose} autoHideTimeout={2000} disableAutoHide />
		);
		jest.advanceTimersByTime(2000);
		expect(onClose).not.toHaveBeenCalled();
	});

	it.each<[string, SnackbarProps['severity']]>([
		[ICONS.snackbarSuccess, 'success'],
		[ICONS.snackbarInfo, 'info'],
		[ICONS.snackbarWarning, 'warning'],
		[ICONS.snackbarError, 'error']
	])('should show %s when severity is %s', (icon, severity) => {
		setup(<Snackbar label={'test'} open severity={severity} />);
		expect(screen.getByTestId(icon)).toBeVisible();
	});

	it('should be rendered at window level', () => {
		setup(
			<div data-testid={'container'}>
				<Snackbar label={'test'} open />
			</div>
		);
		expect(within(screen.getByTestId('container')).queryByText('test')).not.toBeInTheDocument();
	});

	it('should be rendered as a child if disablePortal is true', () => {
		setup(
			<div data-testid={'container'}>
				<Snackbar label={'test'} open disablePortal />
			</div>
		);
		expect(within(screen.getByTestId('container')).getByText('test')).toBeVisible();
	});

	it.each([
		[false, true],
		[undefined, true],
		[false, undefined],
		[undefined, undefined]
	])(
		'should show the progress bar if disableAutoHide is %s and progressBar is %s and onclose is defined',
		(disableAutoHide, progressBar) => {
			setup(
				<Snackbar
					open
					label={'test'}
					disableAutoHide={disableAutoHide}
					progressBar={progressBar}
					onClose={jest.fn()}
				/>
			);
			expect(screen.getByTestId(SELECTORS.progressBar)).toBeVisible();
		}
	);

	it('should not show progress bar if disableAutoHide is true', () => {
		setup(<Snackbar open label={'test'} disableAutoHide progressBar />);
		expect(screen.queryByTestId(SELECTORS.progressBar)).not.toBeInTheDocument();
	});

	it('should not show progress bar if progressBar is false', () => {
		setup(<Snackbar open label={'test'} disableAutoHide={false} progressBar={false} />);
		expect(screen.queryByTestId(SELECTORS.progressBar)).not.toBeInTheDocument();
	});

	it('should not show progress bar if onClose is not defined', () => {
		setup(<Snackbar open label={'test'} disableAutoHide={false} progressBar onClose={undefined} />);
		expect(screen.queryByTestId(SELECTORS.progressBar)).not.toBeInTheDocument();
	});
});
