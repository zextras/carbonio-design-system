/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';
import styled from 'styled-components';
import { map } from 'lodash';
import PropTypes from 'prop-types';
import Container from '../layout/Container';
import Text from '../basic/Text';
import Padding from '../layout/Padding';
import Dropdown from '../display/Dropdown';
import { useSplitVisibility } from '../../hooks/useSplitVisibility';

const CheckDiv = styled.div`
	width: 100%;
`;

const CrumbContainer = styled.div`
	display: flex;
	width: fit-content;
`;

const CrumbPadding = styled(Padding)`
	cursor: pointer;
`;

const BreadcrumbSeparator = ({ color }) => (
	<Padding all="extrasmall" style={{ cursor: 'default' }}>
		<Text size="large" color={color}>
			/
		</Text>
	</Padding>
);

function Breadcrumbs({ crumbs, collapserProps, dropdownProps, ...rest }) {
	const [visibleCrumbs, hiddenCrumbs, containerRef] = useSplitVisibility(crumbs, 'start');

	return (
		<CheckDiv ref={containerRef} {...rest}>
			<Container orientation="horizontal" mainAlignment="flex-start" width="fit">
				{hiddenCrumbs.length > 0 && (
					<CrumbContainer key="ellipsed-bc">
						<BreadcrumbSeparator color="secondary" />
						<Dropdown items={hiddenCrumbs} {...dropdownProps}>
							<CrumbPadding all="extrasmall" {...collapserProps}>
								<Text size="large" color="secondary">
									&hellip;
								</Text>
							</CrumbPadding>
						</Dropdown>
					</CrumbContainer>
				)}
				{map(visibleCrumbs, ({ label, click, id, ...crumbProps }, index) => (
					<CrumbContainer key={id || `${index}-${label}`}>
						<BreadcrumbSeparator
							color={index === visibleCrumbs.length - 1 ? 'text' : 'secondary'}
						/>
						<CrumbPadding all="extrasmall" onClick={click} {...crumbProps}>
							<Text size="large" color={index === visibleCrumbs.length - 1 ? 'text' : 'secondary'}>
								{label}
							</Text>
						</CrumbPadding>
					</CrumbContainer>
				))}
			</Container>
		</CheckDiv>
	);
}

Breadcrumbs.propTypes = {
	/** Array of items, check Dropdown items prop to see the shape of an item */
	crumbs: Dropdown.propTypes.items,
	/** Props to spread to the collapser element */
	collapserProps: PropTypes.object,
	/** Props to spread to the dropdown element */
	dropdownProps: PropTypes.object
};
Breadcrumbs.defaultProps = {
	crumbs: []
};

export default Breadcrumbs;
