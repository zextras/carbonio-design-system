/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Container } from './Container';

const ContainerEl = styled(Container)`
	display: ${(props) => props.display};
	flex-basis: ${(props) => props.flexBasis};
	flex-grow: ${(props) => props.flexGrow};
	flex-shrink: ${(props) => props.flexShrink};
	order: ${(props) => props.order};
	${(props) =>
		props.takeAvailableSpace &&
		css`
			min-width: 0;
			flex-basis: 0;
			flex-grow: 1;
		`};
`;

const Row = React.forwardRef(function RowFn({ children, ...rest }, ref) {
	return (
		<ContainerEl ref={ref} {...rest}>
			{children}
		</ContainerEl>
	);
});

Row.propTypes = {
	display: PropTypes.string,
	flexBasis: PropTypes.string,
	flexGrow: PropTypes.oneOfType([PropTypes.oneOf(['unset']), PropTypes.number]),
	flexShrink: PropTypes.oneOfType([PropTypes.oneOf(['unset']), PropTypes.number]),
	order: PropTypes.string,
	takeAvailableSpace: PropTypes.bool,
	orientation: Container.propTypes.orientation,
	borderRadius: Container.propTypes.borderRadius,
	height: Container.propTypes.height,
	width: Container.propTypes.width,
	wrap: Container.propTypes.wrap,
	maxWidth: Container.propTypes.maxWidth
};

Row.defaultProps = {
	display: 'flex',
	orientation: 'horizontal',
	borderRadius: 'none',
	height: 'auto',
	width: 'auto',
	wrap: 'wrap',
	flexBasis: 'unset',
	flexGrow: 'unset',
	flexShrink: 1,
	order: 'unset',
	takeAvailableSpace: false,
	maxWidth: '100%'
};

export { Row };
