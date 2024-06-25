/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useMemo, useRef, useState } from 'react';

import { Meta, StoryObj } from '@storybook/react';

import { useIsVisible } from './useIsVisible';
import { ListItem } from '../../components/display/ListItem';
import { ListV2 } from '../../components/display/ListV2';
import { Container } from '../../components/layout/Container';

const Hook = (): React.JSX.Element => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isVisible, itemRef] = useIsVisible<HTMLDivElement>(containerRef);
	return (
		<div ref={containerRef}>
			<div ref={itemRef}>{isVisible && 'Item is visible'}</div>
		</div>
	);
};

const meta = {
	component: Hook
} satisfies Meta<typeof Hook>;

export default meta;

type Story = StoryObj<typeof meta>;

const ListExampleComponent = (): React.JSX.Element => {
	const offsetRef = useRef(0);
	const [items, setItems] = useState<{ id: string; name: string }[]>([]);
	const loadItems = useCallback(() => {
		const limit = 3;
		const offset = offsetRef.current;
		setItems((prevState) => [
			...prevState,
			...Array(limit)
				.fill('')
				.map((item, index) => ({
					id: `${index + offset}`,
					name: `Item ${index + offset}`
				}))
		]);
		offsetRef.current += limit;
	}, []);

	const listItems = useMemo(
		() =>
			items.map((item) => (
				<ListItem key={item.id}>
					{(visible) => (
						<Container height={'50px'}>
							{visible ? <div>{item.name}</div> : <div>Not visible</div>}
						</Container>
					)}
				</ListItem>
			)),
		[items]
	);
	return (
		<ListV2 onListBottom={loadItems} height={'600px'} borderColor={'red'}>
			{listItems}
		</ListV2>
	);
};

export const ListExample = {
	render: ListExampleComponent
} satisfies Story;

const SquareExampleComponent = (): React.JSX.Element => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isVisible, itemRef] = useIsVisible<HTMLDivElement>(containerRef, undefined, {
		threshold: 1
	});

	return (
		<Container
			height={'600px'}
			style={{ height: '600px', overflowY: 'auto', border: '1px solid black' }}
			ref={containerRef}
			orientation={'vertical'}
			mainAlignment={'flex-start'}
			crossAlignment={'flex-start'}
		>
			<div style={{ height: '500px', width: '100%', flexShrink: 0 }}></div>
			<div
				style={{
					height: '300px',
					width: '100%',
					flexShrink: 0,
					backgroundColor: isVisible ? 'red' : 'blue'
				}}
				ref={itemRef}
			></div>
			<div style={{ height: '500px', width: '100%', flexShrink: 0 }}></div>
		</Container>
	);
};

export const SquareExample = {
	render: SquareExampleComponent
} satisfies Story;
