/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useRef, useState } from 'react';

import { Portal } from './Portal';
import { Button } from '../../basic/button/Button';
import { Text } from '../../basic/text/Text';
import { Container } from '../../layout/container/Container';
import { Padding } from '../../layout/padding/Padding';

export const PortalBasic = (): React.JSX.Element => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [show, setShow] = useState(false);
	const handleClick = useCallback(() => {
		setShow((prev) => !prev);
	}, []);

	return (
		<Container mainAlignment="flex-start" crossAlignment="flex-start" width="50%">
			<Button
				type="outlined"
				label={show ? 'Unmount children' : 'Mount children'}
				onClick={handleClick}
				style={{ marginBottom: '0.5rem' }}
			/>
			<Padding
				ref={containerRef}
				value={show ? 'large' : '0'}
				style={{ border: show ? '0.125rem solid red' : 'none', width: '100%' }}
			></Padding>
			<Padding
				value="large large 0"
				style={{ border: '0.0625rem dashed green', marginTop: '0.5rem', width: '100%' }}
			>
				<Padding value="0 0 small" style={{ width: '100%' }}>
					<Text>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sollicitudin nulla at
						bibendum fermentum. Interdum et malesuada fames ac ante ipsum primis in faucibus.
					</Text>
				</Padding>
				<Padding value="0 0 large" style={{ width: '100%' }}>
					<Text>It looks like I will render here.</Text>
					<Portal container={containerRef.current ?? undefined} show={show}>
						<Text>But I actually render here!</Text>
					</Portal>
				</Padding>
			</Padding>
		</Container>
	);
};
