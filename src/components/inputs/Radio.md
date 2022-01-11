<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

Radio buttons can be used to select one option out of a list of many.

Radio should be used in combination with the RadioGroup component as demonstrated in [these examples](#/Components/Inputs/RadioGroup).

### Controlled

```jsx
import { useState } from 'react';
import { Button, RadioGroup, Row, Input, Text, Padding, Select } from '@zextras/zapp-ui';

const [activeValue, setActiveValue] = useState('salad');

<>
	<Radio label="Chicken" value="chicken" />
	<Radio label="Salad" value="salad" />
	<Radio label="Tomato" value="tomato" />
	<Radio
		label={
			<Row takeAvailableSpace mainAlignment="flex-start" wrap="nowrap">
				<Text overflow="break-word">Day</Text>
				<Padding horizontal="small"><Input backgroundColor="gray5" label="Day" defaultValue="17" /></Padding>
				<Text overflow="break-word">of every</Text>
				<Padding left="small"><Input backgroundColor="gray5" label="Month" defaultValue="1" /></Padding>
			</Row>
		}
		value="complex-1"
	/>
	<Radio
		label={
			<Row takeAvailableSpace mainAlignment="flex-start" wrap="nowrap">
				<Text overflow="break-word">The</Text>
				<Padding horizontal="small">
					<Select
						display="inline-block"
						dropdownWidth="auto"
						background="gray5"
						label="Number"
						items={[{ label: 'Second', value: '1' }]}
						defaultSelection={{ value: '1', label: 'Second' }}
					/>
				</Padding>
				<Select
					display="inline-block"
					dropdownWidth="auto"
					background="gray5"
					label="Day"
					items={[{ label: 'Weekend day', value: '1' }]}
					defaultSelection={{ value: '1', label: 'Weekend day' }}
				/>
				<Padding horizontal="small"><Text overflow="break-word">of every</Text></Padding>
				<Select
					display="inline-block"
					dropdownWidth="auto"
					background="gray5"
					label="Month"
					items={[{ label: 'January', value: '1' }]}
					defaultSelection={{ value: '1', label: 'January' }}
				/>
			</Row>
		}
		value="complex-2"
	/>
	<Radio label="Mayo" value="mayo" disabled={true} />
</>;
```

### Uncontrolled

```jsx
import { RadioGroup, Button } from '@zextras/zapp-ui';

<>
    <Radio label="Chicken" value="chicken" />
    <Radio label="Salad" value="salad" />
    <Radio label="Tomato" value="tomato" />
    <Radio
        label={
            <Button
                type="outlined"
                label="Click me"
                color="info"
                onClick={() => {
                    console.log('I got clicked!!');
                }}
            />
        }
        value="click-me"
    />
    <Radio label="Mayo" value="mayo" disabled />
</>;
```

### Development status:

```jsx noEditor
import { Container, Icon } from '@zextras/zapp-ui';
import StatusTable from 'status-table';
const items = [
	{
		feature: 'Graphics',
		status: 1,
		notes: ''
	},
	{
		feature: 'Documentation',
		status: 0,
		notes: ''
	},
	{
		feature: 'Examples',
		status: 1,
		notes: ''
	},
	{
		feature: 'Controlled/Uncontrolled mode',
		status: 1,
		notes: ''
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
		status: 0,
		notes: ''
	}
];

<StatusTable items={items} />;
```
