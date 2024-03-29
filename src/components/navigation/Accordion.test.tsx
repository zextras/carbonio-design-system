/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import { waitFor } from '@testing-library/react';

import { Accordion, AccordionItem, AccordionItemType } from './Accordion';
import { setup, screen, within } from '../../test-utils';
import { ICONS } from '../../testUtils/constants';
import { Button } from '../basic/Button';

describe('Accordion', () => {
	test('Render root level Accordion items', () => {
		const { container } = setup(
			<Accordion
				items={[
					{ id: 'first', label: 'First', icon: 'Activity' },
					{ id: 'second', label: 'Second', icon: 'Activity' },
					{ id: 'third', label: 'Third', icon: 'Activity' },
					{ id: 'fourth', label: 'Fourth', icon: 'Activity' }
				]}
			/>
		);
		expect(container).toHaveTextContent('FirstSecondThirdFourth');
	});

	test('Render deep level Accordion items', () => {
		const { container } = setup(
			<Accordion
				items={[
					{
						id: 'first',
						icon: 'Activity',
						items: [
							{
								id: 'second',
								icon: 'Activity',
								items: [
									{
										id: 'third',
										icon: 'Activity',
										items: [
											{
												id: 'fourth',
												icon: 'Activity',
												items: [
													{
														id: 'fifth',
														icon: 'Activity',
														items: [
															{
																id: 'sixth',
																icon: 'Activity',
																items: [{ id: 'seventh', icon: 'Activity', label: 'Deep' }]
															}
														]
													}
												]
											}
										]
									}
								]
							}
						]
					}
				]}
			/>
		);
		expect(container).toHaveTextContent('Deep');
	});

	test('Render customized Accordion', () => {
		const clickFn = jest.fn();

		const CC1: AccordionItemType['CustomComponent'] = ({ item }) => (
			<Button label={item.label} onClick={clickFn} />
		);
		const CC2: AccordionItemType['CustomComponent'] = ({ item }) => (
			<div
				id="custom"
				data-testid="custom"
				style={{ width: '100%', border: '0.0625rem solid green' }}
			>
				<AccordionItem item={item} />
			</div>
		);
		setup(
			<Accordion
				items={[
					{ id: 'first', label: 'First', icon: 'Activity', CustomComponent: CC1 },
					{ id: 'second', label: 'Second', icon: 'Activity' },
					{ id: 'third', label: 'Third', icon: 'Activity', CustomComponent: CC2 },
					{ id: 'fourth', label: 'Fourth', icon: 'Activity' }
				]}
			/>
		);
		expect(screen.getByRole('button', { name: /first/i })).toBeVisible();
		expect(screen.getByTestId('custom')).toBeVisible();
	});

	test('Open and close an Accordion', async () => {
		const onClick = jest.fn();
		const { user } = setup(
			<Accordion
				items={[
					{
						id: 'first',
						label: 'First',
						onClick,
						items: [
							{ id: 'second', label: 'Second' },
							{ id: 'third', label: 'Third' },
							{ id: 'fourth', label: 'Fourth' }
						]
					}
				]}
			/>
		);

		expect(screen.getByText(/first/i)).toBeVisible();
		expect(screen.getByText(/second/i)).not.toBeVisible();
		// click on label does not expand the accordion
		await user.click(screen.getByText('First'));
		expect(onClick).toHaveBeenCalledTimes(1);
		expect(screen.getByText(/second/i)).not.toBeVisible();
		// click on chevron icon expand the accordion item
		await user.click(screen.getByTestId(ICONS.accordionItemOpenAction));
		await waitFor(() => expect(screen.getByText(/second/i)).toBeVisible());
		// click on chevron icon does not call onClick callback
		expect(onClick).toHaveBeenCalledTimes(1);
		expect(screen.getByText(/second/i)).toBeVisible();
		expect(screen.getByTestId(ICONS.accordionItemCloseAction)).toBeVisible();
		expect(screen.queryByTestId(ICONS.accordionItemOpenAction)).not.toBeInTheDocument();
		// click on chevron icon of opened accordion close the accordion and does not call onClick callback
		await user.click(screen.getByTestId(ICONS.accordionItemCloseAction));
		await waitFor(() => expect(screen.getByText(/second/i)).not.toBeVisible());
		expect(onClick).toHaveBeenCalledTimes(1);
		expect(screen.getByTestId(ICONS.accordionItemOpenAction)).toBeVisible();
		expect(screen.queryByTestId(ICONS.accordionItemCloseAction)).not.toBeInTheDocument();
	});

	it('should contain a data-testid accordion for each group of items', async () => {
		const items: AccordionItemType[] = [
			{ id: 'first', label: 'First', icon: 'Activity' },
			{
				id: 'second',
				label: 'Second',
				icon: 'Activity',
				items: [
					{ id: 'third', label: 'Third', icon: 'Activity' },
					{ id: 'fourth', label: 'Fourth', icon: 'Activity' }
				]
			}
		];

		const { user } = setup(<Accordion items={items} />);
		await user.click(screen.getByRoleWithIcon('button', { icon: ICONS.accordionItemOpenAction }));
		const accordions = screen.getAllByTestId('accordion');
		expect(accordions).toHaveLength(2);
		expect(within(accordions[0]).getByText('First')).toBeVisible();
		expect(within(accordions[0]).getByText('Second')).toBeVisible();
		expect(within(accordions[0]).getByText('Third')).toBeVisible();
		expect(within(accordions[0]).getByText('Fourth')).toBeVisible();
		expect(within(accordions[1]).queryByText('First')).not.toBeInTheDocument();
		expect(within(accordions[1]).queryByText('Second')).not.toBeInTheDocument();
		expect(within(accordions[1]).getByText('Third')).toBeVisible();
		expect(within(accordions[1]).getByText('Fourth')).toBeVisible();
	});

	it('should set a data-testid accordion-item for each item', async () => {
		const items: AccordionItemType[] = [
			{ id: 'first', label: 'First' },
			{
				id: 'second',
				label: 'Second',
				items: [
					{ id: 'third', label: 'Third' },
					{ id: 'fourth', label: 'Fourth' }
				]
			}
		];

		const { user } = setup(<Accordion items={items} />);
		await user.click(screen.getByRoleWithIcon('button', { icon: ICONS.accordionItemOpenAction }));
		const accordionItems = screen.getAllByTestId('accordion-item');
		expect(accordionItems).toHaveLength(4);
		expect(within(accordionItems[0]).getByText('First')).toBeVisible();
		expect(
			within(accordionItems[0]).queryByRoleWithIcon('button', {
				icon: ICONS.accordionItemCloseAction
			})
		).not.toBeInTheDocument();
		expect(within(accordionItems[1]).getByText('Second')).toBeVisible();
		expect(within(accordionItems[1]).getByTestId('accordion')).toBeVisible();
		expect(within(accordionItems[2]).getByText('Third')).toBeVisible();
		expect(within(accordionItems[3]).getByText('Fourth')).toBeVisible();
	});
});
