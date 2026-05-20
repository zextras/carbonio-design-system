/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import styled from '@emotion/styled';

import { Drop } from './Drop';
import { Button } from '../../basic/button/Button';
import { Container } from '../../layout/container/Container';
import { Drag } from '../drag/Drag';

const BackDropLayout = styled(Container)`
	width: 70%;
	position: absolute;
	height: 70%;
	z-index: 2;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

const overlayAcceptComponent = (
	<BackDropLayout background={'primary'}>Drop is accepted and fired</BackDropLayout>
);
const overlayDenyComponent = (
	<BackDropLayout background={'gray2'}>Drop is not fired here</BackDropLayout>
);

export const DropDefault = (): React.JSX.Element => (
	<Container gap={'1rem'}>
		<Container gap={'1rem'} orientation={'horizontal'}>
			<Drag type="message" data={{ id: 15 }}>
				<Button label="Drag Me - Reject example" onClick={(): void => undefined} />
			</Drag>
			<Drag type="message" data={{ id: 5 }}>
				<Button label="Drag Me - Accept example" onClick={(): void => undefined} />
			</Drag>
		</Container>
		<Drop
			acceptType={['message']}
			onDrop={(data): void => console.log(data)}
			overlayAcceptComponent={overlayAcceptComponent}
			overlayDenyComponent={overlayDenyComponent}
			onDragEnter={(data): { success: boolean } | undefined => {
				if (data.data?.id !== 5) {
					return { success: false };
				}
				return undefined;
			}}
		>
			<Container background="gray5" height="18.75rem" width="100%">
				<Button
					onClick={(): void => console.log('clicked nested button')}
					label={'Nested button'}
				/>
			</Container>
		</Drop>
	</Container>
);
