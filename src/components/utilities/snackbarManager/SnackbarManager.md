<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

SnackbarManager is in charge of rendering the snackbars.
It stacks each snackbar displaying them one at a time (last one first).

Within a SnackbarManager,
the `useSnackbar` hook can be used to retrieve the function to create snackbars from an object,
which fields represent the Snackbar props, plus others to handle the stack.
**The "key" parameter must be unique.**
You can pass the `replace` field as true to replace the visible snackbar with the new one.

The creation function returns a callback that can be used to remove the snackbar when needed.

```jsx
import { useState, useContext } from 'react';
import { Button, Container, SnackbarManager, useSnackbar } from '@zextras/carbonio-design-system';

function App() {
	const createSnackbar = useSnackbar();
	return (
		<Container orientation="horizontal" mainAlignment="space-between" width="25rem">
			<Button
				type="outlined"
				color="success"
				label="Success"
				onClick={() => {
					const ref = createSnackbar({ key: 1, type: 'success', label: 'label' });
					setTimeout(ref, 1000);
				}}
			/>
			<Button
				type="outlined"
				color="info"
				label="Info"
				onClick={() => createSnackbar({ key: 2, type: 'info', label: 'label' })}
			/>
			<Button
				type="outlined"
				color="warning"
				label="Warning"
				onClick={() => createSnackbar({ key: 3, type: 'warning', label: 'label' })}
			/>
			<Button
				type="outlined"
				color="error"
				label="Error"
				onClick={() => createSnackbar({
					key: new Date().toLocaleString(),
					type: 'error',
					label: 'label',
					replace: true
				})}
			/>
		</Container>
	);
}

<>
	<SnackbarManager>
		<App />
	</SnackbarManager>
</>
```

Under the hood, the manager uses a context to provide the creation function.
The `useSnackbar` hook is the preferred method to get this function,
but the context `SnackbarManagerContext` is still exported to allow the user to handle special cases.
Be aware that using this function,
the returned value will be undefined if there is no `SnackbarManager` above.
