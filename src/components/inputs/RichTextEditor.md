<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

A complete [WYSIWYG Editor](https://en.wikipedia.org/wiki/WYSIWYG).

The user can control the editing using the control bars on the top of the text area.

```jsx
<RichTextEditor
    initialValue="<p>This is the initial content of the editor</p>"
    onEditorChange={console.log}
/>
```

### Distraction free mode
The distraction free mode is an inline mode of the editor where the user still has the control over the content
but using contextual actions instead of a complete bar.
```jsx
<RichTextEditor
    inline={true}
    initialValue="<p>This is the initial content of the editor</p>"
    onEditorChange={console.log}
/>
```

Powered by [TinyMCE](https://www.tiny.cloud/docs/)

### Development status:
```jsx noEditor
import { Container, Icon } from '@zextras/zapp-ui';
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
    feature: 'Controlled/Uncontrolled mode',
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
    notes: ''
},{
    feature: 'Prop Types',
    status: 1,
    notes: ''
},{
    feature: 'Index Export',
    status: 1,
    notes: ''
},{
    feature: 'Customizability',
    status: 3,
    notes: ''
}
];

<StatusTable items={items} />

```