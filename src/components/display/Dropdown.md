<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

Dropdowns are toggleable, contextual overlays for displaying lists of links and more. They’re toggled by clicking.

Dropdown list items can be customized with components and/or disabled. Disabled items has a tooltip which content can be 
configurable by the _tooltipLabel_ prop of the item.

```jsx
import { useMemo, useState } from 'react';
import { Container, Padding, Text, Button, IconButton } from '@zextras/carbonio-design-system';

const items = [
	{
		id: 'item-1',
		icon: 'Activity',
		label: 'Some Item',
		onClick: () => console.log('click item 1'),
        tooltipLabel: 'Item 1 tooltip content',
		items: [
			{
				id: 'sub1',
				icon: 'Activity',
				label: 'Sub Item 1',
                tooltipLabel: 'Item 1 Sub 1 tooltip content',
                onClick: () => console.log('click item 1 sub 1')
			},
			{
				id: 'sub2',
				icon: 'Activity',
				label: 'Sub Item 2',
				keepOpen: true,
                tooltipLabel: 'Item 1 Sub 2 tooltip content',
                onClick: () => console.log('click item 1 sub 2')
			},
			{
				id: 'sub3',
				icon: 'Activity',
				label: 'Sub Item 3',
				keepOpen: true,
                tooltipLabel: 'Item 1 Sub 3 tooltip content',
                onClick: () => console.log('click item 1 sub 3')
			},
			{
				id: 'sub4',
				icon: 'Activity',
				label: 'Sub Item 4',
				keepOpen: true,
                tooltipLabel: 'Item 1 Sub 4 tooltip content',
                onClick: () => console.log('click item 1 sub 4')
			}
		]
	},
	{
		id: 'item-2',
		icon: 'Plus',
		label: 'Some Other Item',
        tooltipLabel: 'Item 2 tooltip content',
        onClick: () => console.log('click item 2'),
		disabled: true
	},
	{ type: 'divider', id: 'divider', label: 'divider' },
	{
		id: 'item-3',
		icon: 'Activity',
		label: 'Yet Another Item',
        tooltipLabel: 'Item 3 tooltip content',
        onClick: () => console.log('click item 3')
	},
	{
		id: 'item-4',
		icon: 'Activity',
		label: 'Some Item',
		keepOpen: true,
        tooltipLabel: 'Item 4 tooltip content',
		customComponent: <Button label="click me!" onClick={() => console.log('click4')} />
	}
];

const itemsSet2 = [
	{
		id: 'item-1',
		icon: 'Activity',
		label: 'Some Item',
        tooltipLabel: 'Item 1 tooltip content',
        onClick: () => console.log('click item 1')
	},
	{
		id: 'item-3',
		icon: 'Activity',
		label: 'Yet Another Item',
        tooltipLabel: 'Item 3 tooltip content',
		selected: true,
		items: [
			{
				id: 'sub1',
				icon: 'Activity',
				label: 'Some Item',
				selected: true,
                tooltipLabel: 'Item 3 Sub 1 tooltip content',
                onClick: () => console.log('click item 3 sub 1')
			},
			{
				id: 'sub2',
				icon: 'Activity',
				label: 'Some Item',
                tooltipLabel: 'Item 3 Sub 2 tooltip content',
                onClick: () => console.log('click item 3 sub 2')
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

<Container padding={{ vertical: 'small' }} style={{ gap: '3.125rem' }}>
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

```jsx
import { Button, Container } from '@zextras/carbonio-design-system';

const items = [
	{
		id: 'item1',
        label: 'item1',
        tooltipLabel: 'item 1 tooltip'
    },
    { 
        id: 'item2',
        label: 'item2',
        tooltipLabel: 'item 2 tooltip'
    }
];

const toggleDisabled = (itemIndex) => {
	items[itemIndex].disabled = !items[itemIndex].disabled;
}

<Container orientation="horizontal" mainAlignment="space-around">
    <Dropdown items={items}>
        <Button label="click here to open" onClick={() => undefined} />
    </Dropdown>
    <Button label="toggle item 1 disabled" onClick={() => toggleDisabled(0)} />
    <Button label="toggle item 2 disabled" onClick={() => toggleDisabled(1)} />
</Container>
```

### Keyboard shortcuts
#### Trigger component
| Key              | Action                     | Notes                                          |
|------------------|----------------------------|------------------------------------------------|
| Enter<br/> Space | Toggle dropdown open state | Can be enabled with prop `handleTriggerEvents` | 

#### Dropdown
| Key                        | Action                                                                    | Notes                                                                                                                                    |
|----------------------------|---------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| Arrow down <br/> Tab       | Focus on next item <br/> On last item: focus on first item                |                                                                                                                                          |
| Arrow up <br/> Shift + Tab | Focus on previous item <br/> On first item: focus on last item            |                                                                                                                                          |
| Enter                      | Select current item                                                       |                                                                                                                                          |
| Escape                     | Close dropdown and return focus to trigger component                      | Use `disableRestoreFocus` to not return of the focus <br/> For nested dropdown, the trigger component is the item of the parent dropdown |
| Arrow right                | Open nested dropdown (if present)                                         |                                                                                                                                          |
| Arrow left                 | Close nested dropdown and return focus to the item of the parent dropdown |                                                                                                                                          |

```jsx
import { noop } from 'lodash';
import { Button, Container } from '@zextras/carbonio-design-system';

const items = [
	{
		id: 'item1',
        label: 'item1',
        tooltipLabel: 'item 1 tooltip'
    },
    { 
        id: 'item2',
        label: 'item2',
        tooltipLabel: 'item 2 tooltip'
    },
	{
        id: 'item3',
        label: 'item3',
        tooltipLabel: 'item 3 tooltip',
        items: [
            {
                id: 'item31',
                label: 'item3-1',
                tooltipLabel: 'item 3-1 tooltip'
            },
            {
                id: 'item32',
                label: 'item3-2',
                tooltipLabel: 'item 3-2 tooltip'
            }
        ]
    }
];

<Dropdown items={items} handleTriggerEvents>
    <Button label="space or enter to open" onClick={noop} />
</Dropdown>
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
