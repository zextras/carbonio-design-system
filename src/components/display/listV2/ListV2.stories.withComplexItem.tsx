/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useCallback, useMemo, useState } from 'react';

import { faker } from '@faker-js/faker';

import { ListV2, ListV2Props } from './ListV2';
import { Avatar } from '../../basic/Avatar';
import { Text } from '../../basic/text/Text';
import { Container } from '../../layout/Container';
import { Divider } from '../../layout/divider/Divider';
import { Row } from '../../layout/Row';
import { Drag } from '../../utilities/Drag';
import { ListItem } from '../ListItem';

type Item = { id: string; name: string; image: string; email: string; text: string };
type ListItemContentProps = {
	selected: boolean;
	selecting: boolean;
	visible: boolean;
	onClick: (itemId: string) => void;
	item: Item;
};

const ListItemContent = React.memo(function ListItemContentFn({
	visible,
	item,
	selected,
	selecting,
	onClick
}: ListItemContentProps): React.JSX.Element {
	const clickHandler = useCallback(() => {
		onClick(item.id);
	}, [item.id, onClick]);

	return (
		<Container
			height={'4rem'}
			mainAlignment={'flex-start'}
			crossAlignment={'flex-start'}
			maxWidth={'fill'}
		>
			{visible && (
				<Drag type="item" data={item} style={{ width: '100%' }}>
					<Container
						onClick={clickHandler}
						padding={{ all: 'small' }}
						orientation="horizontal"
						mainAlignment="flex-start"
						maxWidth={'fill'}
						gap={'0.25rem'}
					>
						<Avatar
							selecting={selecting}
							selected={selected}
							label={item.name}
							picture={item.image}
						/>
						<Container
							padding={{ left: 'small' }}
							orientation="vertical"
							crossAlignment="flex-start"
							maxWidth={'fill'}
							minWidth={0}
						>
							<Row
								height="fit"
								orientation="horizontal"
								padding={{ bottom: 'small' }}
								gap={'0.25rem'}
							>
								<Text weight="bold">{item.name}</Text>
								<Text>{item.email}</Text>
							</Row>
							<Text>{item.text}</Text>
						</Container>
					</Container>
				</Drag>
			)}
		</Container>
	);
});

export const WithComplexItem = (props: ListV2Props): React.JSX.Element => {
	const [selected, setSelected] = useState<string[]>([]);

	const toggleSelect = useCallback((id: string) => {
		setSelected((prevState) => {
			const index = prevState.indexOf(id);
			if (index >= 0) {
				return prevState.toSpliced(index, 1);
			}
			return [...prevState, id];
		});
	}, []);

	const selecting = selected.length > 0;

	const data = useMemo(
		() =>
			Array(500)
				.fill('')
				.map((_, index) => ({
					id: `${index}`,
					name: faker.person.fullName(),
					email: faker.internet.email(),
					text: faker.lorem.sentence(),
					image: faker.image.avatar()
				})),
		[]
	);

	const items = useMemo(
		() =>
			data.map((item) => (
				<ListItem key={item.id} selected={selected.includes(item.id)} active={item.id === '2'}>
					{(visible) => (
						<Container
							orientation={'vertical'}
							mainAlignment={'flex-start'}
							crossAlignment={'flex-start'}
						>
							<ListItemContent
								visible={visible}
								item={item}
								selected={selected.includes(item.id)}
								selecting={selecting}
								onClick={toggleSelect}
							/>
							<Divider />
						</Container>
					)}
				</ListItem>
			)),
		[data, selected, selecting, toggleSelect]
	);

	return <ListV2 {...props}>{items}</ListV2>;
};
