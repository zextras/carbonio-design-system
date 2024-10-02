/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import styled, { css } from 'styled-components';

import { Button } from '../../basic/button/Button';
import { Text } from '../../basic/text/Text';
import { Tooltip } from '../../display/Tooltip';
import { Row } from '../../layout/Row';

interface ModalHeaderProps {
	centered?: boolean;
	type?: 'default' | 'error';
	title?: string | React.ReactElement;
	showCloseIcon?: boolean;
	onClose?: (event: React.MouseEvent | KeyboardEvent) => void;
	closeIconTooltip?: string;
}

const ModalTitle = styled(Text)<{ $centered: boolean }>`
	box-sizing: border-box;
	width: 100%;
	flex-grow: 1;
	flex-basis: 0;
	line-height: 1.5;
	padding: ${(props): string =>
		`${props.theme.sizes.padding.small} ${props.theme.sizes.padding.small} ${props.theme.sizes.padding.small} 0`};
	${({ $centered }): ReturnType<typeof css> | false =>
		$centered &&
		css`
			text-align: center;
		`};
`;

const ModalHeader = ({
	centered,
	onClose,
	showCloseIcon,
	title,
	type,
	closeIconTooltip
}: ModalHeaderProps): React.JSX.Element => (
	<Row width="100%" padding={{ bottom: 'small' }}>
		<ModalTitle
			$centered={!!centered}
			color={type === 'error' ? 'error' : undefined}
			size="medium"
			weight="bold"
		>
			{title}
		</ModalTitle>
		{showCloseIcon && onClose && (
			<Tooltip label={closeIconTooltip} disabled={!closeIconTooltip}>
				<Button icon="Close" size="large" type={'ghost'} color={'text'} onClick={onClose} />
			</Tooltip>
		)}
	</Row>
);

export { ModalHeader, ModalHeaderProps };
