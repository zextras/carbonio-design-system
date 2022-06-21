/* eslint-disable import/no-extraneous-dependencies */

/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';
import { screen } from '@testing-library/dom';
import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../../test-utils';
import { Accordion, AccordionItem, AccordionItemType } from './Accordion';
import { Button } from '../basic/Button';

describe('Accordion', () => {
	test('Render root level Accordion items', () => {
		const { container } = render(
			<Accordion
				items={[
					{ id: 'first', label: 'First', icon: 'Activity' },
					{ id: 'second', label: 'Second', icon: 'Activity' },
					{ id: 'third', label: 'Third', icon: 'Activity' },
					{ id: 'fourth', label: 'Fourth', icon: 'Activity' }
				]}
			/>
		);
		expect(container.textContent).toEqual('FirstSecondThirdFourth');
	});

	test('Render deep level Accordion items', () => {
		const { container } = render(
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
		expect(container.textContent).toEqual('Deep');
	});

	test('Render customized Accordion', () => {
		const clickFn = jest.fn();

		const CC1: AccordionItemType['CustomComponent'] = ({ item }) => (
			<Button label={item.label} onClick={clickFn} />
		);
		const CC2: AccordionItemType['CustomComponent'] = ({ item }) => (
			<div id="custom" style={{ width: '100%', border: '1px solid green' }}>
				<AccordionItem item={item} />
			</div>
		);
		const { container } = render(
			<Accordion
				items={[
					{ id: 'first', label: 'First', icon: 'Activity', CustomComponent: CC1 },
					{ id: 'second', label: 'Second', icon: 'Activity' },
					{ id: 'third', label: 'Third', icon: 'Activity', CustomComponent: CC2 },
					{ id: 'fourth', label: 'Fourth', icon: 'Activity' }
				]}
			/>
		);
		expect(screen.getByRole('button', { name: /first/i })).toBeInTheDocument();
		expect(container.querySelector('#custom')).toBeInTheDocument();
	});

	test('Open and close an Accordion', () => {
		const CC: AccordionItemType['CustomComponent'] = ({ item }) => (
			<div id={item.id} style={{ width: '100%', border: '1px solid green' }}>
				<AccordionItem item={item} />
			</div>
		);
		const onClick = jest.fn();
		const { container } = render(
			<Accordion
				items={[
					{
						id: 'first',
						label: 'First',
						onClick,
						CustomComponent: CC,
						items: [
							{ id: 'second', label: 'Second', CustomComponent: CC },
							{ id: 'third', label: 'Third', CustomComponent: CC },
							{ id: 'fourth', label: 'Fourth', CustomComponent: CC }
						]
					}
				]}
			/>
		);
		expect(container.querySelector('#first')).toBeVisible();
		expect(container.querySelector('#second')).not.toBeVisible();
		act(() => {
			userEvent.click(screen.getByText('First'));
		});
		act(() => {
			userEvent.click(container.getElementsByTagName('svg')[0]);
		});
		expect(container.querySelector('#second')).toBeVisible();
		act(() => {
			userEvent.click(container.getElementsByTagName('svg')[0]);
		});
		setTimeout(() => expect(container.querySelector('#second')).not.toBeVisible(), 500);
	});
});
