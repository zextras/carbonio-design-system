/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';
import styled from 'styled-components';
import { map } from 'lodash';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';
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

interface BreadcrumbSeparatorProps {
	color: React.ComponentPropsWithRef<typeof Text>['color'];
}

const BreadcrumbSeparator = ({ color }: BreadcrumbSeparatorProps): JSX.Element => (
	<Padding all="extrasmall" style={{ cursor: 'default' }}>
		<Text size="large" color={color}>
			/
		</Text>
	</Padding>
);

type DropdownItems = React.ComponentPropsWithRef<typeof Dropdown>['items'];

interface BreadcrumbsProps {
	/** Array of items, check Dropdown items prop to see the shape of an item */
	crumbs: DropdownItems;
	/** Props to spread to the collapser element */
	collapserProps: React.ComponentPropsWithRef<typeof Padding>;
	/** Props to spread to the dropdown element */
	dropdownProps: Omit<React.ComponentPropsWithRef<typeof Dropdown>, 'items'>;
}

const Breadcrumbs = React.forwardRef<HTMLDivElement, BreadcrumbsProps>(function BreadcrumbsFn(
	{ crumbs, collapserProps, dropdownProps, ...rest },
	ref
) {
	const [visibleCrumbs, hiddenCrumbs, innerRef] = useSplitVisibility<
		DropdownItems[number],
		HTMLDivElement
	>(crumbs, 'start');
	const containerRef = useCombinedRefs<HTMLDivElement>(innerRef, ref);

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
});

export default Breadcrumbs;
