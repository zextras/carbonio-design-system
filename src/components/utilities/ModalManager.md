<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

ModalManager is in charge of rendering the modals.
Within a ModalManager, the `useModal` hook can be used to retrieve the function to create modals from an
object, which fields represent the Modal props.

The creation function returns a callback that **must** be manually invoked to close the modal.

Overlapping modals are allowed.

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

Under the hood, the manager uses a context to provide the creation function.
The `useModal` hook is the preferred method to get this function,
but the context `ModalManagerContext` is still exported to allow the user to handle special cases.
Be aware that using this function, the returned value will be undefined if there is no `ModalManager` above.

