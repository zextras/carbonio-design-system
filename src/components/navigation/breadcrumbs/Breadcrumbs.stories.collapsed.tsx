/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { Breadcrumbs } from './Breadcrumbs';

export const BreadcrumbsCollapsed = (): React.JSX.Element => {
	const crumbs = [
		{
			id: 'crumb-1',
			label: 'Goodnight',
			onClick: () => console.log('Goodnight')
		},
		{
			id: 'crumb-2',
			label: 'Hello',
			onClick: () => console.log('Hello')
		},
		{
			id: 'crumb-3',
			label: 'AAAAAA',
			onClick: () => console.log('AAAAAA')
		},
		{
			id: 'crumb-4',
			label: 'Goodbye',
			onClick: () => console.log('Goodbye')
		},
		{
			id: 'crumb-5',
			label: 'Ok',
			onClick: () => console.log('Ok')
		}
	];

	return (
		<>
			<div style={{ width: '50%', height: '25rem', border: '0.0625rem solid grey' }}>
				<Breadcrumbs crumbs={crumbs} />
			</div>
			<h3>Collapsed</h3>
			<div style={{ width: '12.5rem', maxWidth: '100%', border: '0.0625rem solid grey' }}>
				<Breadcrumbs crumbs={crumbs} />
			</div>
		</>
	);
};
