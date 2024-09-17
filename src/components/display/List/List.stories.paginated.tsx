/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useMemo, useRef, useState } from 'react';

import { List, ListProps } from './List';
import { Container } from '../../layout/Container';
import { ListItem } from '../ListItem';

export const PaginatedList = ({
	limit,
	...props
}: ListProps & { limit: number }): React.JSX.Element => {
	const offsetRef = useRef(0);
	const [items, setItems] = useState<{ id: string; name: string }[]>([]);

	const loadItems = useCallback(() => {
		const offset = offsetRef.current;
		setItems((prevState) => [
			...prevState,
			...Array(limit)
				.fill('')
				.map((item, index) => ({
					id: `${index + offset}`,
					name: `Item ${index + offset}`
				}))
		]);
		offsetRef.current += limit;
	}, [limit]);

	const listItems = useMemo(
		() =>
			items.map((item) => (
				<ListItem key={item.id}>
					{(visible) => <Container height={'50px'}>{visible && <div>{item.name}</div>}</Container>}
				</ListItem>
			)),
		[items]
	);
	return (
		<List {...props} onListBottom={loadItems}>
			{listItems}
		</List>
	);
};
