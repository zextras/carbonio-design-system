/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useState } from 'react';

import { Transition } from './Transition';
import { Button } from '../../basic/button/Button';
import { Text } from '../../basic/text/Text';
import { Tooltip } from '../../display/tooltip/Tooltip';
import { Container } from '../../layout/container/Container';
import { Row } from '../../layout/row/Row';

export const TransitionExample1 = (): React.JSX.Element => {
	const effects = [...(Transition.types ?? [])];
	const [buttons, setButtons] = useState<Record<string, boolean>>(
		effects.reduce<Record<string, boolean>>(
			(acc, currentValue) => ({
				...acc,
				[currentValue]: false
			}),
			{}
		)
	);

	return (
		<Container crossAlignment="unset">
			{effects.map((effect, index) => (
				<React.Fragment key={index}>
					<Text size="large" style={{ textTransform: 'capitalize', paddingBottom: '0.5rem' }}>
						{effect}
					</Text>
					<Row padding={{ bottom: 'large' }}>
						<Row width="2.5rem">
							<Tooltip label={effect} placement="left">
								<Button
									icon="PlayCircle"
									onClick={(): void => {
										setButtons({ ...buttons, [effect]: !buttons[effect] });
									}}
								/>
							</Tooltip>
						</Row>
						<Row takeAvailableSpace>
							<Transition type={effect} apply={buttons[effect]}>
								<div>
									<Button color="error" label={effect} onClick={(): void => {}} />
								</div>
							</Transition>
						</Row>
					</Row>
				</React.Fragment>
			))}
		</Container>
	);
};
