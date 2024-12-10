/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

interface KeyboardShortcutTableProps {
	shortcuts: { keys: string[]; action: string[]; notes: string[] }[];
}

export const KeyboardShortcutTable = ({
	shortcuts
}: KeyboardShortcutTableProps): React.JSX.Element => (
	<table>
		<thead>
			<tr>
				<th>Keys</th>
				<th>Action</th>
				<th>Notes</th>
			</tr>
		</thead>
		<tbody>
			{shortcuts.map((item) => (
				<tr key={item.keys.join()}>
					<td>{item.keys.join('\n')}</td>
					<td>{item.action.join('\n')}</td>
					<td>{item.notes.join('\n')}</td>
				</tr>
			))}
		</tbody>
	</table>
);
