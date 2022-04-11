<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

Accordions allow the user to browse nested menus and folder structures.

Every item in an Accordion must have a label, while icons and click callbacks are optional.

If the user clicks on the arrow icon, the accordion shows its items list, without triggering the callback

If the user clicks on the label or container, the accordion shows its content and fires the relative callback (e.g. the sidebar items perform an history push to another route).

Once open, clicking on the arrow icon collapses the accordion without triggering the callback.

The activeId prop can be use to highlight an accordion item without manipulating the items tree

The openIds prop can be use to control the opening and closing of elements without manipulating the items tree

### Plain Accordion

```jsx
import { Container, Text } from '@zextras/carbonio-design-system';

const items = [
	{
		id: 'Root Accordion',
		icon: 'PersonOutline',
		label: 'Accordion Label',
		onClick: () => alert('root'),
    onOpen: () => console.log('open'),
		onClose: () => console.log('close'),items: [
      {
        id: '1',
        label: 'One Accordion',
        onClick: () => alert(1)
      },
      {
        id: '2',
        label: 'Two Accordion',
        onClick: () => alert(2),
        items:[{
            id: '3',
            label: 'Nested Accordion',
            onClick: () => alert(3)
          }
				]
			}
		]
	}
];

<Container
	orientation="vertical"
	mainAlignment="space-around"
	background="gray5"
	height="fit"
	width={306}
>
	<Accordion items={items} activeId="3" openIds={['Root Accordion']} />
</Container>;
```

### Accordion with icons

```jsx
import { useState } from 'react';
import { Container, Text, Icon, AccordionRoot, Button } from '@zextras/carbonio-design-system';

const [open, setOpen] = useState(true);

const items = [
	{
		id: '1',
		label: 'One Accordion',
		icon: 'CheckmarkCircleOutline',
		open,
		items: [
			{
				id: '1',
				label: 'Nested Accordion',
				icon: 'TrendingDown'
			},
			{
				id: '2',
				label: 'Another Nested Accordion',
				icon: 'AlertTriangleOutline'
			},
			{
				id: '3',
				label: 'Accordions!',
				icon: 'MicOff'
			}
		]
	},
	{
		id: '2',
		label: 'Two Accordion',
		icon: 'Attach'
	}
];

<>
	<Button onClick={() => setOpen(!open)} label="open" />
	<Accordion items={items} />
</>;
```

### Active Accordion with read/unread badge

```jsx
import { Container, Text } from '@zextras/carbonio-design-system';

const items = [
	{ id: '1', label: 'One Accordion', badgeCounter: 10 },
	{ id: '2', label: 'Two Accordion', badgeType: 'unread', badgeCounter: 100 }
];

<>
	<Container
		orientation="vertical"
		mainAlignment="space-around"
		background="gray5"
		height="fit"
		width={306}
	>
		<Accordion items={items} />
	</Container>
	<Container
		orientation="vertical"
		mainAlignment="space-around"
		background="gray5"
		height="fit"
		width={306}
	>
		<Accordion items={items} background="highlight" />
	</Container>
	<Container
		orientation="vertical"
		mainAlignment="space-around"
		background="gray5"
		height="fit"
		width={306}
	>
		<Accordion items={items} background="gray6" />
	</Container>
</>;
```

### Real example Accordion

```jsx
import { Container, Text } from '@zextras/carbonio-design-system';

const items = [
	{
		id: 'inbox',
		label: 'Inbox',
		badgeType: 'unread',
		badgeCounter: 10,
		items: [
			{
				id: 'starred',
				label: 'Starred',
				badgeCounter: 2
			},
			{
				id: 'important',
				label: 'Important',
				badgeType: 'unread',
				badgeCounter: 8
			}
		]
	},
	{
		id: 'spam',
		label: 'Spam',
		badgeCounter: 100
	},
	{
		id: 'outBox',
		label: 'outbox',
		badgeType: 'read',
		badgeCounter: 1,
		items: [
			{
				id: 'starred',
				label: 'Starred',
				badgeCounter: 2
			},
			{
				id: 'important',
				label: 'Important',
				badgeType: 'unread',
				badgeCounter: 8,
				items: [
					{
						id: 'inbox',
						label: 'Inbox',
						badgeType: 'unread',
						badgeCounter: 10,
						items: [
							{
								id: 'starred',
								label: 'Starred',
								badgeCounter: 2
							},
							{
								id: 'important',
								label: 'Important',
								badgeType: 'unread',
								badgeCounter: 8
							}
						]
					},
					{
						id: 'spam',
						label: 'Spam',
						badgeCounter: 100
					},
					{
						id: 'outBox',
						label: 'outbox',
						badgeType: 'read',
						badgeCounter: 1,
						items: [
							{
								id: 'starred',
								label: 'Starred',
								badgeCounter: 2
							},
							{
								id: 'important',
								label: 'Important',
								badgeType: 'unread',
								badgeCounter: 8,
								items: [
									{
										id: 'inbox',
										label: 'Inbox',
										badgeType: 'unread',
										badgeCounter: 10,
										items: [
											{
												id: 'starred',
												label: 'Starred',
												badgeCounter: 2
											},
											{
												id: 'important',
												label: 'Important',
												badgeType: 'unread',
												badgeCounter: 8
											}
										]
									},
									{
										id: 'spam',
										label: 'Spam',
										badgeCounter: 100
									},
									{
										id: 'outBox',
										label: 'outbox',
										badgeType: 'read',
										badgeCounter: 1,
										items: [
											{
												id: 'starred',
												label: 'Starred',
												badgeCounter: 2
											},
											{
												id: 'important',
												label: 'Important',
												badgeType: 'unread',
												badgeCounter: 8,
												items: []
											}
										]
									},
									{
										id: 'archive',
										label: 'Archive',
										badgeCounter: 100
									}
								]
							}
						]
					},
					{
						id: 'archive',
						label: 'Archive',
						badgeCounter: 100
					}
				]
			}
		]
	},
	{
		id: 'archive',
		label: 'Archive',
		badgeCounter: 100
	}
];

<>
	<Container orientation="vertical" mainAlignment="space-around" height="fit" width={306}>
		<Accordion items={items} background="gray4" />
	</Container>
</>;
```

### Custom Components

The Accordion component can render custom components. You can import the vanilla component to wrap them or to add elements to them.

#### AccordionItem Props

The Accordion component passes the following props down to the accordion item, if you use the vanilla component within a custom configuration you should forward them to it.

- item: the item that is being displayed

```jsx
import {
	Container,
	Text,
	Icon,
	AccordionItem,
	Badge,
	Padding,
	Button
} from '@zextras/carbonio-design-system';
const CC1 = ({ item }) => (
	<AccordionItem item={item}>
		<Icon icon="Error" color="error" />
	</AccordionItem>
);
const CC2 = ({ item }) => (
	<AccordionItem item={item}>
		<Text size="small" color="secondary">
			Customized
		</Text>
	</AccordionItem>
);
const CC3 = ({ item }) => (
	<div style={{ width: '100%', border: '1px solid green' }}>
		<AccordionItem item={item} />
	</div>
);
const CC4 = ({ item }) => (
	<Container orientation="horizontal" mainAlignment="space-around" background="gray2" height="fit">
		<Button icon={item.icon} label={item.label} onClick={item.onButtonClick} />
		<Padding left="small">
			<Badge type={item.badgeType} value={item.badgeCounter} />
		</Padding>
	</Container>
);
const click = (m) => () => alert(m);
const items = [
	{
		id: '0',
		label: 'hello',
		CustomComponent: CC2,
		onClick: click(0),
		items: [
			{
				id: '1',
				label: 'One Accordion',
				icon: 'CheckmarkCircleOutline',
				CustomComponent: CC1,
				onClick: click(1),
				items: [
					{
						id: '1a',
						label: 'Nested Accordion',
						icon: 'TrendingDown',
						onClick: click('1a'),
						CustomComponent: CC3
					},
					{
						id: '2',
						label: 'Another Nested Accordion',
						icon: 'AlertTriangleOutline',
						CustomComponent: CC4,
						onClick: click(2),
						onButtonClick: () => console.log('Button'),
						badgeType: 'unread',
						badgeCounter: '23'
					},
					{
						id: '3',
						onClick: click(3),
						label: 'Accordions!',
						icon: 'MicOff'
					}
				]
			}
		]
	}
];

<Container orientation="vertical" mainAlignment="space-around" height="fit" width={306}>
	<Accordion items={items} />
</Container>;
```

### Development status:

```jsx noEditor
import { Container, Icon } from '@zextras/carbonio-design-system';
import StatusTable from 'status-table';
const items = [
	{
		feature: 'Graphics',
		status: 1,
		notes: ''
	},
	{
		feature: 'Documentation',
		status: 1,
		notes: ''
	},
	{
		feature: 'Examples',
		status: 1,
		notes: ''
	},
	{
		feature: 'I18n Compatibility',
		status: 1,
		notes: ''
	},
	{
		feature: 'Theme Compatibility',
		status: 1,
		notes: ''
	},
	{
		feature: 'Dark Mode',
		status: 1,
		notes: ''
	},
	{
		feature: 'Prop Types',
		status: 1,
		notes: ''
	},
	{
		feature: 'Index Export',
		status: 1,
		notes: ''
	},
	{
		feature: 'Customizability',
		status: 1,
		notes: ''
	}
];

<StatusTable items={items} />;
```
