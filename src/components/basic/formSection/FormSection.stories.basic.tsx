/*
 * SPDX-FileCopyrightText: 2025 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import type { FormSectionProps } from './FormSection';
import { FormSection, FormSubSection } from './FormSection';
import { Input } from '../../inputs/input/Input';
import { Container } from '../../layout/container/Container';
import { Button } from '../button/Button';
import { Text } from '../text/Text';

export const Basic = (props: FormSectionProps): React.JSX.Element => (
	<FormSection label={props.label}>
		<FormSubSection>
			<Container gap={'0.5rem'} crossAlignment={'flex-start'}>
				<Text>This FormSubSection has no title</Text>
				<Container orientation={'horizontal'} gap={'0.5rem'}>
					<Input label={'Input 1'} />
					<Input label={'Input 2'} />
				</Container>
			</Container>
		</FormSubSection>
		<FormSubSection label={'This is the FormSubSection title'}>
			<Container gap={'0.5rem'} crossAlignment={'flex-start'}>
				<Input label={'Input 1'} />
				<Input label={'Input 2'} />
				<Container
					mainAlignment={'flex-start'}
					crossAlignment={'flex-start'}
					orientation={'horizontal'}
					gap={'0.5rem'}
				>
					<Button label={'Confirm'} onClick={() => undefined} />
					<Button label={'Cancel'} onClick={() => undefined} color={'error'} />
				</Container>
			</Container>
		</FormSubSection>
		<FormSubSection label={'FormSubSection with custom gap'}>
			<Container gap={'2rem'}>
				<Input label={'Input 1'} />
				<Input label={'Input 2'} />
			</Container>
		</FormSubSection>
	</FormSection>
);
