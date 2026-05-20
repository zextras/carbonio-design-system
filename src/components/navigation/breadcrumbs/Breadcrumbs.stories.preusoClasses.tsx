/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import styled from '@emotion/styled';

import { Breadcrumbs } from './Breadcrumbs';
import { getColor } from '../../../theme/theme-utils';

export const BreadcrumbsPseudoClasses = (): React.JSX.Element => {
	const crumbs = Array.from({ length: 5 }, (_, i) => ({
		id: `crumb-${i}`,
		label: `crumb ${i}`,
		onClick: () => i !== 0 && console.log('click crumb', i),
		className: 'breadcrumbCrumb',
		disabled: i === 0
	}));

	crumbs[crumbs.length - 1].className = `${crumbs[crumbs.length - 1].className} currentCrumb`;

	const CustomBreadcrumbs = styled(Breadcrumbs)`
		.breadcrumbCrumb {
			border-radius: 0.125rem;
			&:not([disabled]):hover {
				background-color: ${getColor('gray5.hover')};
			}
			&[disabled],
			&[disabled] * {
				cursor: default;
				color: ${getColor('text.disabled')};
			}
			&.currentCrumb {
				cursor: default;
				&:hover {
					background-color: inherit;
				}
			}
		}

		.breadcrumbCollapser {
			border-radius: 0.125rem;
			&:active,
			&.active {
				background-color: ${getColor('gray4.active')};
			}
			&:hover {
				background-color: ${getColor('gray4.hover')};
			}
		}
	`;

	return (
		<div>
			<div style={{ width: '50%', border: '0.0625rem solid grey', padding: '0.25rem 0' }}>
				<CustomBreadcrumbs crumbs={crumbs} collapserProps={{ className: 'breadcrumbCollapser' }} />
			</div>
			<h3>Collapsed</h3>
			<div
				style={{
					width: '12.5rem',
					maxWidth: '100%',
					border: '0.0625rem solid grey',
					padding: '0.25rem 0'
				}}
			>
				<CustomBreadcrumbs
					crumbs={crumbs}
					collapserProps={{ className: 'breadcrumbCollapser' }}
					dropdownProps={{
						onOpen: () =>
							(document.querySelector('.breadcrumbCollapser') as HTMLElement).classList.add(
								'active'
							),
						onClose: () =>
							(document.querySelector('.breadcrumbCollapser') as HTMLElement).classList.remove(
								'active'
							)
					}}
				/>
			</div>
		</div>
	);
};
