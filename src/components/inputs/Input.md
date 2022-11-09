<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

The input component works like a standard html input, and can be either [controlled](https://reactjs.org/docs/forms.html#controlled-components) or [uncontrolled](https://reactjs.org/docs/uncontrolled-components.html).
```jsx
import { useState } from 'react';
import { Container, Icon } from '@zextras/carbonio-design-system';
import styled from 'styled-components';

const [value, setValue] = useState('Some Controlled value');
const [value2, setValue2] = useState('');

<Container orientation="horizontal" mainAlignment="space-around" wrap="wrap" style={{ margin: 'auto' }} crossAlignment="flex-start">
  <Container width="48%">
    <Input autoComplete="on" label="Input" defaultValue="Default Value" />
    <Input 
        label="Input with custom icon"
        CustomIcon={({ hasFocus }) => <Icon icon="AgendaOutline" size="large" color={hasFocus ? 'primary' : 'text'} />}
    />
    <Input />
  </Container>
  <Container width="48%">
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
    <Input description="empty with description" />
  </Container>
</Container>
```

#### Colors

```typescript jsx
import { useMemo } from 'react';
import { Container, IconButton } from '@zextras/carbonio-design-system';
import styled from 'styled-components';

const StyledIconButton = styled(IconButton)`
  padding: 0.125rem;
  & > svg {
    width: 1.25rem;
    height: 1.25rem;
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

<Container style={{ gap: '0.625rem', margin: 'auto' }} width="50%">
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
import { Container } from '@zextras/carbonio-design-system';

<Container style={{ gap: '0.625rem', margin: 'auto' }} width="50%">
	<Input label="Input label" backgroundColor="gray5" borderColor="gray3" description="Optional short description" />
	<Input label="Input label" backgroundColor="gray5" borderColor="gray3" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in tortor maximus, iaculis sem eget, scelerisque libero. Quisque fermentum massa odio, ut feugiat ipsum laoreet in. Phasellus aliquet leo et bibendum ultrices. Etiam eget iaculis odio. Nunc ut mi dignissim, sagittis purus vitae, tempor massa." />
</Container>
```

If you have mixed inputs, some with a description and some without a description, the components might have different heights.
To avoid expansion of the external container components, there are a few possibilities:
1. set description to an empty string to reserve space for the description (single line)
2. set min height on external container

However, a flex-start or baseline crossAlignment might be required in order to have components aligned nicely in a row.
```jsx
import { useState } from 'react';
import { Container, Text } from '@zextras/carbonio-design-system';

const [input3, setInput3] = useState('');
const [input5, setInput5] = useState('');

<Container gap="0.625rem">
    <Text>Flex-start alignment</Text>
    <Container gap="0.625rem" margin={{ left: 'auto', right: 'auto' }} orientation="horizontal" crossAlignment="flex-start">
        <Input label="Input without description" backgroundColor="gray5" borderColor="gray3" />
        <Input label="Input with description" backgroundColor="gray5" borderColor="gray3" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit" />
    </Container>
    <Text>Baseline alignment</Text>
    <Container gap="0.625rem" margin={{ left: 'auto', right: 'auto' }} orientation="horizontal" crossAlignment="baseline" minHeight="4.5rem">
        <Input label="Input without description" backgroundColor="gray5" borderColor="gray3" />
        <Input label="Input with error on typing" backgroundColor="gray5" borderColor="gray3" value={input3} onChange={(e) => setInput3(e.currentTarget.value)} hasError={input3} description={input3 ? 'Dynamic error message' : undefined} />
    </Container>
    <Text>Empty description to reserve space</Text>
	<Container gap="0.625rem" orientation="horizontal" crossAlignment="flex-start">
		<Input label="Input without description" backgroundColor="gray5" borderColor="gray3" />
        <Input label="Input with description on typing" backgroundColor="gray5" borderColor="gray3" value={input5} onChange={(e) => setInput5(e.currentTarget.value)} description={input5 ? 'Dynamic description' : ''} />
	</Container>
</Container>
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
