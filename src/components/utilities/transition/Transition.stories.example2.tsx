/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useState } from 'react';

import { Transition } from './Transition';
import { Button } from '../../basic/button/Button';
import { Text } from '../../basic/text/Text';
import { Container } from '../../layout/container/Container';
import { Row } from '../../layout/row/Row';

export const TransitionExample2 = (): React.JSX.Element => {
	const [open, setOpen] = useState(false);

	return (
		<Container crossAlignment="unset">
			<Text size="large">Custom easing and timing</Text>
			<Row padding={{ bottom: 'large' }}>
				<Row width="2.5rem">
					<Button icon="PlayCircle" onClick={() => setOpen(!open)} />
				</Row>
				<Row takeAvailableSpace>
					<Transition type="fade" apply={open} transitionTiming="ease-in" transitionDuration={1000}>
						<div>
							<Button color="error" label="Button" onClick={() => {}} />
						</div>
					</Transition>
				</Row>
			</Row>
		</Container>
	);
};
