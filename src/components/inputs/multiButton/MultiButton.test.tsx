/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { MultiButton, MultiButtonProps } from './MultiButton';
import { screen, setup, within } from '../../../test-utils';
import { ICONS, SELECTORS } from '../../../testUtils/constants';

describe('MultiButton', () => {
	it('should not open dropdown when click on primary button', async () => {
		const items: MultiButtonProps['items'] = [
			{ id: 'item1', label: 'item1' },
			{ id: 'item2', label: 'item2' }
		];
		const clickFn = jest.fn();
		const { user } = setup(<MultiButton items={items} onClick={clickFn} label="primary" />);

		expect(screen.getByText(/primary/i)).toBeVisible();
		expect(
			screen.getByRoleWithIcon('button', { icon: ICONS.multiButtonSecondaryOpenAction })
		).toBeVisible();
		await user.click(screen.getByText(/primary/i));
		expect(clickFn).toHaveBeenCalled();
		expect(screen.queryByText(/item1/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/item2/i)).not.toBeInTheDocument();
	});

	it('should render the secondary icon if icon prop is provided', () => {
		const onClickFn = jest.fn();
		setup(<MultiButton items={[]} onClick={onClickFn} icon={'Close'} />);
		expect(screen.getByRoleWithIcon('button', { icon: ICONS.close })).toBeVisible();
	});

	it('should render the ChevronDownOutline icon when dropdown is closed and ChevronUpOutline icon when dropdown is opened (if icon prop is not provided)', async () => {
		const items: MultiButtonProps['items'] = [
			{ id: 'item1', label: 'item1' },
			{ id: 'item2', label: 'item2' }
		];
		const onClickFn = jest.fn();
		const { user } = setup(<MultiButton items={items} onClick={onClickFn} />);
		const secondaryClosedBtn = screen.getByRoleWithIcon('button', {
			icon: ICONS.multiButtonSecondaryOpenAction
		});
		expect(secondaryClosedBtn).toBeVisible();
		await user.click(secondaryClosedBtn);
		const dropdown = screen.getByTestId(SELECTORS.dropdown);
		expect(within(dropdown).getByText(/item1/i)).toBeVisible();
		expect(within(dropdown).getByText(/item2/i)).toBeVisible();
		const secondaryOpenedBtn = screen.getByRoleWithIcon('button', {
			icon: ICONS.multiButtonSecondaryCloseAction
		});
		expect(secondaryOpenedBtn).toBeVisible();
		await user.click(secondaryOpenedBtn);
		expect(secondaryClosedBtn).toBeVisible();
		expect(screen.queryByText(/item1/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/item2/i)).not.toBeInTheDocument();
	});

	it('should close the opened dropdown when click on primary button', async () => {
		const items: MultiButtonProps['items'] = [
			{ id: 'item1', label: 'item1' },
			{ id: 'item2', label: 'item2' }
		];
		const clickFn = jest.fn();
		const { user } = setup(<MultiButton items={items} onClick={clickFn} label="primary" />);

		await user.click(
			screen.getByRoleWithIcon('button', { icon: ICONS.multiButtonSecondaryOpenAction })
		);
		expect(clickFn).not.toHaveBeenCalled();
		const dropdown = screen.getByTestId(SELECTORS.dropdown);
		expect(within(dropdown).getByText(/item1/i)).toBeVisible();
		expect(within(dropdown).getByText(/item2/i)).toBeVisible();
		await user.click(screen.getByText(/primary/i));
		expect(clickFn).toHaveBeenCalled();
		expect(screen.queryByText(/item1/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/item2/i)).not.toBeInTheDocument();
	});

	describe('dropdownProps', () => {
		it('should not interfere with the dropdown if "items" prop in dropdownProps is set', async () => {
			const items: MultiButtonProps['items'] = [
				{ id: 'item1', label: 'item1' },
				{ id: 'item2', label: 'item2' }
			];
			const dropdownProps = {
				items: [{ id: 'dropdown-item1', label: 'dropdownItem1' }]
			} as MultiButtonProps['dropdownProps'];
			const clickFn = jest.fn();
			const { user } = setup(
				<MultiButton
					items={items}
					onClick={clickFn}
					label="primary"
					dropdownProps={dropdownProps}
				/>
			);

			await user.click(
				screen.getByRoleWithIcon('button', { icon: ICONS.multiButtonSecondaryOpenAction })
			);
			const dropdown = screen.getByTestId(SELECTORS.dropdown);
			expect(within(dropdown).getByText(/item1/i)).toBeVisible();
			expect(within(dropdown).getByText(/item2/i)).toBeVisible();
			expect(screen.queryByText(/dropdownItem1/i)).not.toBeInTheDocument();
		});

		it('should not interfere with the dropdown if "onClose" prop in dropdownProps is set', async () => {
			const items: MultiButtonProps['items'] = [{ id: 'item1', label: 'item1' }];
			const clickFn = jest.fn();
			const onCloseFn = jest.fn();
			const label = 'primary';
			const dropdownProps = { onClose: onCloseFn } as MultiButtonProps['dropdownProps'];

			const { user } = setup(
				<MultiButton items={items} onClick={clickFn} label={label} dropdownProps={dropdownProps} />
			);

			await user.click(
				screen.getByRoleWithIcon('button', { icon: ICONS.multiButtonSecondaryOpenAction })
			);
			const dropdown = screen.getByTestId(SELECTORS.dropdown);
			expect(within(dropdown).getByText(/item1/i)).toBeVisible();
			await user.click(screen.getByText(label));
			expect(screen.queryByText(/item1/i)).not.toBeInTheDocument();
			expect(onCloseFn).not.toHaveBeenCalled();
		});

		it('should not interfere with the dropdown if "forceOpen" prop in dropdownProps is set', () => {
			const items: MultiButtonProps['items'] = [{ id: 'item1', label: 'item1' }];
			const clickFn = jest.fn();
			const label = 'primary';
			const dropdownProps = { forceOpen: true } as MultiButtonProps['dropdownProps'];

			setup(
				<MultiButton items={items} onClick={clickFn} label={label} dropdownProps={dropdownProps} />
			);

			expect(screen.queryByText(/item1/i)).not.toBeInTheDocument();
		});

		it('should not interfere with the dropdown if "disabled" prop in dropdownProps is set', async () => {
			const items: MultiButtonProps['items'] = [{ id: 'item1', label: 'item1' }];
			const clickFn = jest.fn();
			const label = 'primary';
			const dropdownProps = { disabled: false } as MultiButtonProps['dropdownProps'];

			const { user } = setup(
				<MultiButton items={items} onClick={clickFn} label={label} dropdownProps={dropdownProps} />
			);

			await user.click(screen.getByRole('button', { name: label }));
			expect(screen.queryByText(/item1/i)).not.toBeInTheDocument();
		});
	});
});
