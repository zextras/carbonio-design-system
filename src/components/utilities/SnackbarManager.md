<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

Context created to manage the Snackbars in an App.
Stack each Snackbar and it displays them one at a time.

It exposes the createSnackbar function to push elements in the stack.

The createSnackbar function returns a callback, that can be used to remove the Snackbar when needed.
It accepts all the props of Snackbar as parameters, plus more unique ones to handle the stack.
**The "key" parameter must be unique.**
You can pass the "replace" parameter as true, to replace the visible snackbar with the new one.

```jsx
import { useState, useContext } from 'react';
import { Button, Container, SnackbarManagerContext, SnackbarManagerProvider } from '@zextras/carbonio-design-system';

function App() {
    const createSnackbar = useContext(SnackbarManagerContext);
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
                onClick={() => createSnackbar({ key: new Date().toLocaleString(), type: 'error', label: 'label', replace: true })}
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

### Development status:
```jsx noEditor
import { Container, Icon } from '@zextras/carbonio-design-system';
import StatusTable from 'status-table';
const items = [{
    feature: 'Graphics',
    status: 2,
    notes: 'To be checked'
},{
    feature: 'Documentation',
    status: 2,
    notes: 'To be checked'
},{
    feature: 'Examples',
    status: 2,
    notes: 'To be checked'
},{
    feature: 'I18n Compatibility',
    status: 2,
    notes: 'To be checked'
},{
    feature: 'Theme Compatibility',
    status: 2,
    notes: 'To be checked'
},{
    feature: 'Dark Mode',
    status: 2,
    notes: 'To be checked'
},{
    feature: 'Prop Types',
    status: 2,
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
