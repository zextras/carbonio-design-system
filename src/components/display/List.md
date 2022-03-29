<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

A basic virtual list without dependencies.

```jsx
import { faker } from '@faker-js/faker';
import { useState, useMemo, useCallback } from 'react';
import { Container, Avatar, Drag, Divider, Text, Row, Padding } from '@zextras/carbonio-design-system';
import { map, range, findIndex, without, reduce, omit } from 'lodash';

const [selected, setSelected] = useState(
	{}
	/*reduce(
		map(
			range(0, 200),
			i => Math.round(Math.random() * 500)
		),
		(acc, v) => ({ ...acc, [v]: true })
	)*/
);
const select = useCallback(
	(id) => () => {
		setSelected((s) => (s[id] ? omit(s, id) : { ...s, [id]: true }));
	},
	[]
);

const ListItem = useMemo(
	() => ({
		visible,
		active,
		item,
		selected,
		selecting,
		background,
		selectedBackground,
		activeBackground,	
	}) => {
		return visible ? (
			<Drag type="item" data={item} style={{ width: '100%' }}>
				<Container
					onClick={select(item.id)}
					height={64}
					orientation="vertical"
					mainAlignment="flex-start"
				>
					<Container
						padding={{ all: 'small' }}
						orientation="horizontal"
						mainAlignment="flex-start"
					>
						<Padding horizontal="small">
							<Avatar
								selecting={selecting}
								selected={selected}
								label={item.name}
								picture={item.image}
							/>
						</Padding>
						<Container
							padding={{ left: 'small' }}
							orientation="vertical"
							crossAlignment="flex-start"
						>
							<Row height="fit" orientation="horizontal" padding={{ bottom: 'small' }}>
								<Padding right="small">
									<Text weight="bold">{item.name}</Text>
								</Padding>
								<Text>{item.email}</Text>
							</Row>
							<Text>{item.text}</Text>
						</Container>
					</Container>
					<Divider />
				</Container>
			</Drag>
		) : (
			<div style={{ height: '64px' }} />
		);
	},
	[]
);

const items = useMemo(
	() =>
		map(range(0, 500), (i) => ({
			id: i,
			name: faker.name.findName(),
			email: faker.internet.email(),
			text: faker.lorem.sentence(),
			image: faker.image.avatar()
		})),
	[]
);

<Container height={750}>
	<List selected={selected} items={items} ItemComponent={ListItem} active={2} />
</Container>;
```

### List with background properties

```jsx
import { faker } from '@faker-js/faker';
import { useState, useMemo, useCallback } from 'react';
import { Container, Avatar, Drag, Divider, Text, Row, Padding } from '@zextras/carbonio-design-system';
import { map, range, findIndex, without, reduce, omit } from 'lodash';

const [selected, setSelected] = useState(
	{}
	/*reduce(
		map(
			range(0, 200),
			i => Math.round(Math.random() * 500)
		),
		(acc, v) => ({ ...acc, [v]: true })
	)*/
);
const select = useCallback(
	(id) => () => {
		setSelected((s) => (s[id] ? omit(s, id) : { ...s, [id]: true }));
	},
	[]
);

const ListItem = useMemo(
	() => ({
		visible,
		active,
		item,
		selected,
		selecting,
		background,
		selectedBackground,
		activeBackground,
	
	}) => {
		return visible ? (
			<Drag type="item" data={item} style={{ width: '100%' }} >
				<Container
					onClick={select(item.id)}
					height={64}
					orientation="vertical"
					mainAlignment="flex-start"
				>
					<Container
						padding={{ all: 'small' }}
						orientation="horizontal"
						mainAlignment="flex-start"
					>
						<Padding horizontal="small">
							<Avatar
								selecting={selecting}
								selected={selected}
								label={item.name}
								picture={item.image}
							/>
						</Padding>
						<Container
							padding={{ left: 'small' }}
							orientation="vertical"
							crossAlignment="flex-start"
						>
							<Row height="fit" orientation="horizontal" padding={{ bottom: 'small' }}>
								<Padding right="small">
									<Text weight="bold">{item.name}</Text>
								</Padding>
								<Text>{item.email}</Text>
							</Row>
							<Text>{item.text}</Text>
						</Container>
					</Container>
					<Divider />
				</Container>
			</Drag>
		) : (
			<div style={{ height: '64px' }} />
		);
	},
	[]
);

const items = useMemo(
	() =>
		map(range(0, 500), (i) => ({
			id: i,
			name: faker.name.findName(),
			email: faker.internet.email(),
			text: faker.lorem.sentence(),
			image: faker.image.avatar()
		})),
	[]
);

<Container height={250}>
	<List
		selected={selected}
		items={items}
		active={1}
		ItemComponent={ListItem}
		selectedBackground="success"
		activeBackground="warning"
	/>
</Container>;
```
