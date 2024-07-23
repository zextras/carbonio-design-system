/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useRef } from 'react';

import { Meta, StoryObj } from '@storybook/react';

import { useIsVisible } from './useIsVisible';
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
