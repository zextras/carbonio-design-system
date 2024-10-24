/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { HTMLAttributes } from 'react';

import { map } from 'lodash';
import styled from 'styled-components';

import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { useSplitVisibility } from '../../hooks/useSplitVisibility';
import { Text } from '../basic/text/Text';
import { Dropdown, DropdownItem, DropdownProps } from '../display/Dropdown';
import { Container } from '../layout/Container';
import { Padding, PaddingProps } from '../layout/Padding';

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

const BreadcrumbSeparator = ({ color }: BreadcrumbSeparatorProps): React.JSX.Element => (
	<Padding all="extrasmall" style={{ cursor: 'default' }}>
		<Text size="large" color={color}>
			/
		</Text>
	</Padding>
);

export type Crumb = DropdownItem & HTMLAttributes<HTMLDivElement>;

type BreadcrumbCollapersProps = { all: string } & PaddingProps;

interface BreadcrumbsProps extends HTMLAttributes<HTMLDivElement> {
	/** Array of items, check Dropdown items prop to see the shape of an item */
	crumbs: Crumb[];
	/** Props to spread to the collapser element */
	collapserProps?: Omit<BreadcrumbCollapersProps, 'all'>;
	/** Props to spread to the dropdown element */
	dropdownProps?: Omit<DropdownProps, 'items' | 'children'>;
}

const Breadcrumbs = React.forwardRef<HTMLDivElement, BreadcrumbsProps>(function BreadcrumbsFn(
	{ crumbs, collapserProps, dropdownProps, ...rest },
	ref
) {
	const [visibleCrumbs, hiddenCrumbs, innerRef] = useSplitVisibility<DropdownItem, HTMLDivElement>(
		crumbs,
		{ removeFrom: 'start' }
	);
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
				{map(visibleCrumbs, ({ label, onClick, id, ...crumbProps }, index) => (
					<CrumbContainer key={id || `${index}-${label}`}>
						<BreadcrumbSeparator
							color={index === visibleCrumbs.length - 1 ? 'text' : 'secondary'}
						/>
						<CrumbPadding all="extrasmall" onClick={onClick} {...crumbProps}>
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

export { Breadcrumbs, BreadcrumbsProps };
