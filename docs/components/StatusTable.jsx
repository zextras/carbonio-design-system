/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useMemo } from 'react';
import { Table, Container, Icon } from '../../src';

const icon = (status) => {
	switch (status) {
		case 1:
			return (
				<Container>
					<Icon icon="CheckmarkCircle2" size="large" color="success" />
				</Container>
			);
		case 3:
			return (
				<Container>
					<Icon icon="CloseCircle" size="large" color="error" />
				</Container>
			);
		case 2:
		default:
			return (
				<Container>
					<Icon icon="Clock" size="large" color="info" />
				</Container>
			);
	}
};
const headers = [
	{
		id: 'feature',
		label: 'Feature',
		width: '20%',
		bold: true
	},
	{
		id: 'status',
		label: 'Status',
		width: '2rem',
		align: 'center',
		bold: true
	},
	{
		id: 'notes',
		label: 'Notes',
		width: '50%',
		bold: true
	}
];

export default function StatusTable({ items }) {
	const rows = useMemo(
		() =>
			items.map((item, index) => ({
				id: item.feature + index,
				columns: [item.feature, icon(item.status), item.notes]
			})),
		[items]
	);

	return <Table headers={headers} rows={rows} multiSelect={false} showCheckbox={false} />;
}
