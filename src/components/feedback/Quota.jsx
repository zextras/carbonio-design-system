/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Container } from '../layout/Container';

const QuotaBar = styled(Container)`
	min-width: 64px;
`;

const Quota = React.forwardRef(function QuotaFn(
	{ background, fill, fillBackground, height, ...rest },
	ref
) {
	return (
		<QuotaBar
			ref={ref}
			background={background}
			crossAlignment="flex-start"
			height={height}
			{...rest}
		>
			<Container background={fillBackground} width={`${fill}%`} height="100%" />
		</QuotaBar>
	);
});

Quota.propTypes = {
	/** Quota background color */
	background: Container.propTypes.background,
	/** Quota percentage */
	fill: PropTypes.number.isRequired,
	/** Quota fill background color */
	fillBackground: Container.propTypes.background,
	/** Quota height */
	height: Container.propTypes.height
};

Quota.defaultProps = {
	background: 'gray6',
	fillBackground: 'primary',
	height: '8px'
};

export { Quota };
