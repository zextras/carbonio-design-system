/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import { faker } from '@faker-js/faker';
import { waitFor } from '@testing-library/react';

import { Accordion, AccordionItem, AccordionItemType, AccordionProps } from './Accordion';
import { setup, screen, within } from '../../test-utils';
import { ICONS, SELECTORS } from '../../testUtils/constants';
import { Button } from '../basic/Button';
import { TIMERS } from '../constants';

describe('Accordion', () => {
	test('Render root level Accordion items', () => {
		setup(
			<Accordion
				items={[
					{ id: 'first', label: 'First', icon: 'Activity' },
					{ id: 'second', label: 'Second', icon: 'Activity' },
					{ id: 'third', label: 'Third', icon: 'Activity' },
					{ id: 'fourth', label: 'Fourth', icon: 'Activity' }
				]}
			/>
		);
		expect(screen.getByText('First')).toBeVisible();
		expect(screen.getByText('Second')).toBeVisible();
		expect(screen.getByText('Third')).toBeVisible();
		expect(screen.getByText('Fourth')).toBeVisible();
	});

	it('should render but not show nested level item if parents are closed', () => {
		const items = [
			{
				id: 'first',
				label: 'first',
				items: [
					{
						id: 'second',
						label: 'second'
					}
				]
			}
		];
		setup(<Accordion items={items} />);
		expect(screen.getByText('second')).toBeInTheDocument();
		expect(screen.getByText('second')).not.toBeVisible();
	});

	it('should show nested level item when parent is expanded', async () => {
		const items = [
			{
				id: 'first',
				label: 'first',
				items: [
					{
						id: 'second',
						label: 'second'
					}
				]
			}
		];
		const { user } = setup(<Accordion items={items} />);
		// click on chevron icon expand the accordion item
		await user.click(screen.getByTestId(ICONS.accordionItemOpenAction));
		await waitFor(() => expect(screen.getByText(/second/i)).toBeVisible());
	});

	it('should show nested level item when parent is set as open', () => {
		const items = [
			{
				id: 'first',
				label: 'first',
				items: [
					{
						id: 'second',
						label: 'second'
					}
				]
			}
		];
		setup(<Accordion items={items} openIds={['first']} />);
		expect(screen.getByText(/second/i)).toBeVisible();
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

	describe('Expand label', () => {
		it('should show tooltip on the expand action if expandLabel is set', async () => {
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
			const expandLabel = faker.string.alpha(10);
			const { user } = setup(<Accordion items={items} expandLabel={expandLabel} />);
			// wait so tooltip can register the listeners
			jest.advanceTimersByTime(TIMERS.TOOLTIP.REGISTER_LISTENER);
			await user.hover(screen.getByRoleWithIcon('button', { icon: ICONS.accordionItemOpenAction }));
			const tooltip = await screen.findByTestId(SELECTORS.tooltip);
			expect(within(tooltip).getByText(expandLabel)).toBeVisible();
		});

		it.each([undefined, ''])(
			'should not show tooltip on the expand action if expandLabel is %s',
			async (expandLabel) => {
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
				const { user } = setup(<Accordion items={items} expandLabel={expandLabel} />);
				// wait so tooltip can register the listeners
				jest.advanceTimersByTime(TIMERS.TOOLTIP.REGISTER_LISTENER);
				await user.hover(
					screen.getByRoleWithIcon('button', { icon: ICONS.accordionItemOpenAction })
				);
				jest.advanceTimersByTime(TIMERS.TOOLTIP.DELAY_SHOW);
				expect(screen.queryByTestId(SELECTORS.tooltip)).not.toBeInTheDocument();
			}
		);
	});

	describe('Collapse label', () => {
		it('should show tooltip on the collapse action if collapseLabel is set', async () => {
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
			const collapseLabel = faker.string.alpha(10);
			const { user } = setup(<Accordion items={items} collapseLabel={collapseLabel} />);
			await user.click(screen.getByRoleWithIcon('button', { icon: ICONS.accordionItemOpenAction }));
			await user.unhover(
				screen.getByRoleWithIcon('button', { icon: ICONS.accordionItemCloseAction })
			);
			jest.advanceTimersByTime(TIMERS.TOOLTIP.REGISTER_LISTENER);
			await user.hover(
				screen.getByRoleWithIcon('button', { icon: ICONS.accordionItemCloseAction })
			);
			const tooltip = await screen.findByTestId(SELECTORS.tooltip);
			expect(within(tooltip).getByText(collapseLabel)).toBeVisible();
		});

		it.each([undefined, ''])(
			'should not show tooltip on the collapse action if collapseLabel is %s',
			async (collapseLabel) => {
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
				const { user } = setup(<Accordion items={items} collapseLabel={collapseLabel} />);
				await user.click(
					screen.getByRoleWithIcon('button', { icon: ICONS.accordionItemOpenAction })
				);
				// wait so tooltip can register the listeners
				jest.advanceTimersByTime(TIMERS.TOOLTIP.REGISTER_LISTENER);
				await user.hover(
					screen.getByRoleWithIcon('button', { icon: ICONS.accordionItemCloseAction })
				);
				jest.advanceTimersByTime(TIMERS.TOOLTIP.DELAY_SHOW);
				expect(screen.queryByTestId(SELECTORS.tooltip)).not.toBeInTheDocument();
			}
		);
	});

	it('should render a divider item', () => {
		const items: AccordionProps['items'] = [{ divider: true }];
		setup(<Accordion items={items} />);
		expect(screen.getByTestId(SELECTORS.divider)).toBeVisible();
	});
});
