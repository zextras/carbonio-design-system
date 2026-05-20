/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import { Responsive } from './Responsive';
import { Icon } from '../../basic/icon/Icon';
import { Text } from '../../basic/text/Text';

export const ResponsiveExample = (): React.JSX.Element => (
	<>
		<Responsive mode="mobile">
			<Text>Mobile Mode!</Text>
			<div style={{ background: 'lightblue', width: '1.5rem', height: '1.5rem' }} />
			<div style={{ background: 'darkblue', width: '1.5rem', height: '1.5rem' }} />
			<Icon icon="Activity" size="large" />
			<div style={{ background: 'blue', width: '1.5rem', height: '1.5rem' }} />
		</Responsive>

		<Responsive mode="desktop">
			<Text>Desktop Mode!</Text>
			<div style={{ background: 'lightblue', width: '1.5rem', height: '1.5rem' }} />
			<div style={{ background: 'darkblue', width: '1.5rem', height: '1.5rem' }} />
			<Icon icon="Activity" size="large" />
			<div style={{ background: 'blue', width: '1.5rem', height: '1.5rem' }} />
		</Responsive>
	</>
);
