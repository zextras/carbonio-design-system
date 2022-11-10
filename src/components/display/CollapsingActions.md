Similar to how Breadcrumb works, based on screen width, it shows the given actions until the main container is filled, then
other actions are collapsed inside a dropdown. Actions are removed from the end

Max number of visible actions can also be set to make only a limited group visible, independently of remaining spaces.
If less than max number of actions can be shown without scroll, then a lower number is rendered as visible.

```jsx
import { useState } from 'react';
import { Action, Container, Text } from '@zextras/carbonio-design-system';

const actions = [
	{
		id: 'action1',
		icon: 'Activity',
		label: 'Action 1',
		onClick: () => undefined
	},
	{
		id: 'action2',
		icon: 'People',
		label: 'Action 2',
		onClick: () => undefined
	},
	{
		id: 'action3',
		icon: 'ArrowUp',
		label: 'Action 3',
        color: 'error',
		onClick: () => undefined
	},
	{
		id: 'action4',
		icon: 'Airplane',
		label: 'Action 4',
        color: 'text',
		onClick: () => undefined
	},
	{
		id: 'action5',
		icon: 'AcceptanceMeeting',
		label: 'Action 5',
		onClick: () => undefined
	},
	{
		id: 'action6',
		icon: 'AddressBook',
		label: 'Action 6',
		onClick: () => undefined
	},
	{
		id: 'action7',
		icon: 'Archive',
		label: 'Action 7',
		onClick: () => undefined
	},
	{
		id: 'action8',
		icon: 'BackupMod',
		label: 'Action 8',
        color: 'warning',
		onClick: () => undefined
	}
];

<Container maxWidth="50%" background="gray5" orientation="vertical" gap="0.625rem">
    <Text>Default</Text>
    <CollapsingActions actions={actions} />
    <Text>Align at start</Text>
    <CollapsingActions actions={actions} alignment="start" />
    <Text>Max visible and size</Text>
    <CollapsingActions actions={actions} maxVisible={3} size="large" />
</Container>
```
