<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

Dropdowns are toggleable, contextual overlays for displaying lists of links and more. They’re toggled by clicking.

Dropdown list items can be customized with components and/or disabled.

```jsx
import { useMemo, useState } from 'react';
import { Container, Padding, Text, Button, IconButton } from '@zextras/carbonio-design-system';

const items = [
	{
		id: 'activity-1',
		icon: 'Activity',
		label: 'Some Item',
		click: () => console.log('click1'),
		items: [
			{
				id: 'sub1',
				icon: 'Activity',
				label: 'Some Item',
				keepOpen: true,
				click: () => console.log('click1')
			},
			{
				id: 'sub2',
				icon: 'Activity',
				label: 'Some Item',
				keepOpen: true,
				click: () => console.log('click1')
			},
			{
				id: 'sub3',
				icon: 'Activity',
				label: 'Some Item',
				keepOpen: true,
				click: () => console.log('click1')
			},
			{
				id: 'sub4',
				icon: 'Activity',
				label: 'Some Item',
				keepOpen: true,
				click: () => console.log('click1')
			}
		]
	},
	{
		id: 'activity-2',
		icon: 'Plus',
		label: 'Some Other Item',
		click: () => console.log('click2'),
		disabled: true
	},
	{ type: 'divider', id: 'divider', label: 'divider' },
	{
		id: 'activity-3',
		icon: 'Activity',
		label: 'Yet Another Item',
		click: () => console.log('click3')
	},
	{
		id: 'activity-4',
		icon: 'Activity',
		label: 'Some Item',
		keepOpen: true,
		customComponent: <Button label="click me!" onClick={() => console.log('click4')} />
	}
];

const itemsSet2 = [
	{
		id: 'activity-1',
		icon: 'Activity',
		label: 'Some Item',
		click: () => console.log('click1')
	},
	{
		id: 'activity-3',
		icon: 'Activity',
		label: 'Yet Another Item',
		selected: true,
		items: [
			{
				id: 'sub1',
				icon: 'Activity',
				label: 'Some Item',
				selected: true,
				click: () => console.log('click1')
			},
			{
				id: 'sub2',
				icon: 'Activity',
				label: 'Some Item',
				click: () => console.log('click1')
			}
		]
	}
];

const [open, setOpen] = useState(false);
<>
	<Container orientation="horizontal" mainAlignment="flex-start">
		<IconButton icon="Activity" onClick={() => setOpen((prevState) => !prevState)} />
		<Dropdown items={items} forceOpen={open}>
			<IconButton icon="ArrowDown" />
		</Dropdown>
		<Dropdown items={items} placement="top-end">
			<IconButton icon="ArrowUp" />
		</Dropdown>
		<Dropdown items={items} placement="left-start">
			<IconButton icon="ArrowLeft" />
		</Dropdown>
		<Dropdown items={items} placement="right-end">
			<IconButton icon="ArrowRight" />
		</Dropdown>
	</Container>

	<Container orientation="horizontal" mainAlignment="flex-start">
		<Dropdown items={items} placement="bottom-end">
			<Button icon="ArrowDown" label="Create" />
		</Dropdown>
		<Padding left="small">
			<Dropdown items={items} placement="right-start" contextMenu={true}>
				<Button label="Right Click" />
			</Dropdown>
		</Padding>
		<Padding left="small">
			<Dropdown
				itemPaddingBetween="large"
				itemIconSize="large"
				itemTextSize="large"
				selectedBackgroundColor="highlight"
				items={itemsSet2}
				multiple={true}
			>
				<Button label="Custom size and highlight" />
			</Dropdown>
		</Padding>
	</Container>
</>;
```

### `KeepOpen`

The `keepOpen` item property can be used to block the automatic closure of the dropdown on clicking the item. This allows a finer control of the dropdown in mixed behavior cases.

### Force open
Force open prop can be used to create a controlled dropdown. If dropdown should be opened with single click, just value
the outside state with the onOpen and onClose callbacks. If dropdown should not be opened with single click, but only from outside,
then the dropdown must be set as disabled, to disable the click callback on the children element.

```jsx
import { useState } from 'react';
import { Button, Container, Text } from '@zextras/carbonio-design-system';

const [openD1, setOpenD1] = useState(false);
const [openD2, setOpenD2] = useState(false);
const items = [{ id: 'item1', label: 'item1' }, { id: 'item2', label: 'item2' }];

<Container padding={{ vertical: 'small' }} style={{ gap: '50px' }}>
    <Text weight="bold">Dropdown with click enabled, but controlled from outside</Text>
	<Container orientation="horizontal" mainAlignment="space-around">
		<Dropdown items={items} forceOpen={openD1} onOpen={() => setOpenD1(true)}>
			<Button label="click here to open" />
		</Dropdown>
		<Button label="click here to close" onClick={() => setOpenD1(false)} />
	</Container>
    <Text weight="bold">Dropdown with click disabled, entirely controlled from outside</Text>
    <Container orientation="horizontal" mainAlignment="space-around">
        <Dropdown items={items} forceOpen={openD2} disabled>
          <Text>Dropdown is {openD2 ? 'open' : 'close'}</Text>
        </Dropdown>
        <Button label="click here to open" onClick={() => setOpenD2(true)} />
        <Button label="click here to close" onClick={() => setOpenD2(false)} />
    </Container>
</Container>
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
		status: 2,
		notes: 'Needs more examples'
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
		notes: 'Accepts custom list components as items'
	}
];

<StatusTable items={items} />;
```
