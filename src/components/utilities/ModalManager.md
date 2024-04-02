<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

Context created to create modals using javascript functions.

It exposes the `createModal` function to create an element and accept as argument an object with all
props as the Modal component.

The createModal function returns a callback, that MUST be manually invoked to close the modal.

Overlapping modals are allowed and handled properly.

```jsx
import { Button, Container, useModal, ModalManager, Text } from '@zextras/carbonio-design-system';

function App() {
	const createModal = useModal();
	return (
		<Container orientation="horizontal" mainAlignment="space-between" width="25rem">
			<Button
				type="outlined"
				color="success"
				label="Success"
				onClick={() => {
					let closeModal = createModal({
						title: 'Title title title',
						confirmLabel: 'Second Modal',
						onConfirm: () => {
							console.log('confirm');
							let closeSecondModal = createModal({
								title: 'Title 2',
								cofirmLabel: 'Close Both',
								onConfirm: () => {
									console.log('confirm 2');
									closeSecondModal();
									closeModal();
									},
								onSecondaryAction: () => {
									console.log('cancel 2');
									closeSecondModal();
									},
								onClose: () => {
									console.log('close 2');
									closeSecondModal();
								},
								dismissLabel: 'Cancel',
								children: <Text overflow="break-word">Lorem impsum</Text>
							});
						},
						onSecondaryAction: () => {
							console.log('cancel');
							closeModal();
						},
						onClose: () => {
							console.log('close');
							closeModal();
						},
						dismissLabel: 'Cancel',
						children:
						<>
							<Text overflow="break-word">Lorem impsum</Text>
							<Text overflow="break-word">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
						</>
					});
				}}
			/>
		</Container>
	);
}

<>
	<ModalManager>
		<App />
	</ModalManager>
</>
```

### Development status:
```jsx noEditor
import { Container, Icon } from '@zextras/carbonio-design-system';
import StatusTable from 'status-table';
const items = [{
	feature: 'Graphics',
	status: 1,
	notes: ''
},{
	feature: 'Documentation',
	status: 1,
	notes: ''
},{
	feature: 'Examples',
	status: 1,
	notes: ''
},{
	feature: 'I18n Compatibility',
	status: 1,
	notes: ''
},{
	feature: 'Theme Compatibility',
	status: 1,
	notes: ''
},{
	feature: 'Dark Mode',
	status: 1,
	notes: 'To be checked'
},{
	feature: 'Prop Types',
	status: 1,
	notes: 'To be checked'
},{
	feature: 'Index Export',
	status: 2,
	notes: 'To be checked'
},{
	feature: 'Customizability',
	status: 2,
	notes: 'To be checked'
},
];

<StatusTable items={items} />

```
