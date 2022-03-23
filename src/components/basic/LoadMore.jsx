/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '../layout/Container';
import { Text } from './Text';
import { Icon } from './Icon';
import { Padding } from '../layout/Padding';

const LoadMore = React.forwardRef(function LoadMoreFn({ label, ...rest }, ref) {
	return (
		<Container ref={ref} orientation="horizontal" width="fill" height="40px" {...rest}>
			<Icon icon="Sync" />
			{label && (
				<Padding left="small">
					<Text style={{ userSelect: 'none' }}>{label}</Text>
				</Padding>
			)}
		</Container>
	);
});

LoadMore.propTypes = {
	label: PropTypes.string
};

LoadMore.defaultProps = {
	label: undefined
};

export { LoadMore };
