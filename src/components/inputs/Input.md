<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

The input component works like a standard html input, and can be either [controlled](https://reactjs.org/docs/forms.html#controlled-components) or [uncontrolled](https://reactjs.org/docs/uncontrolled-components.html).
```jsx
import { useState } from 'react';
import { Container, Padding, Text, PasswordInput, Icon, Button } from '@zextras/zapp-ui';

const [value, setValue] = useState('Some Controlled value');
const [value2, setValue2] = useState('');

<Container orientation="horizontal" mainAlignment="center" background="gray5" height="fill" width="fill">
    <Container orientation="vertical" mainAlignment="space-around" height="300px" width="50%">
        <Input autoComplete="on" autoFocus label="Input" defaultValue="Default Value" />
        <Input
            label="Some other Input"
            value={value}
            onChange={
                (ev) => {
                    setValue(ev.target.value)
                }
            }
            backgroundColor="gray6"
        />
        <Input 
            label="Input with custom icon"
            CustomIcon={({ hasFocus }) => <Icon icon="AgendaOutline" size="large" color={hasFocus ? 'primary' : 'text'} />}
        />
        <Input
            label="Input with onEnter"
            value={value2}
            onChange={
                (ev) => {
                    console.log('onChange', ev.target.value)
                    setValue2(ev.target.value)
                }
            }
            onEnter={(e) => { console.log('onEnter called with text', e.target.value) }}
            backgroundColor="gray6"
        />
        <Input />
    </Container>
</Container>
```

#### Colors

```typescript jsx
import { useMemo } from 'react';
import { Container, IconButton } from '@zextras/zapp-ui';
import styled from 'styled-components';

const StyledIconButton = styled(IconButton)`
  padding: 2px;
  & > svg {
    width: 20px;
    height: 20px;
    padding: 0;
  }
`;

const CustomElement = useMemo(() =>
		({ hasFocus, disabled, hasError }) =>
			<StyledIconButton
				icon="EyeOutline"
				iconColor={(hasError && 'error') || (hasFocus && 'primary') || 'text'}
                onClick={() => console.log('click')}
                disabled={disabled}
			/>,
	[]);

<Container style={{ gap: '10px', margin: 'auto' }} width="50%">
	<Input label="Default color. When active is primary" CustomIcon={CustomElement} description="Optional description" />
	<Input label="Custom color. When active is primary" backgroundColor="gray5" borderColor="gray3" CustomIcon={CustomElement} description="Optional description" />
	<Input label="Error type" backgroundColor="gray5" borderColor="gray3" hasError CustomIcon={CustomElement} description="Optional description" />
	<Input label="Disabled type" backgroundColor="gray5" borderColor="gray3" disabled CustomIcon={CustomElement} description="Optional description" />
	<Input label="Error Disabled type" backgroundColor="gray5" borderColor="gray3" hasError disabled CustomIcon={CustomElement} description="Optional description" />
</Container>
```

#### Optional description
Optional description is set to break on new line on overflow
```typescript jsx
import { useMemo } from 'react';
import { Container } from '@zextras/zapp-ui';
import styled from 'styled-components';

<Container style={{ gap: '10px', margin: 'auto' }} width="50%">
	<Input label="Input label" backgroundColor="gray5" borderColor="gray3" description="Optional short description" />
	<Input label="Input label" backgroundColor="gray5" borderColor="gray3" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in tortor maximus, iaculis sem eget, scelerisque libero. Quisque fermentum massa odio, ut feugiat ipsum laoreet in. Phasellus aliquet leo et bibendum ultrices. Etiam eget iaculis odio. Nunc ut mi dignissim, sagittis purus vitae, tempor massa." />
</Container>
```

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
    status: 1,
    notes: ''
}
];

<StatusTable items={items} />

```
