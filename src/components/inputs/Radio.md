<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

Radio buttons can be used to select one option out of a list of many.

Radio should be used in combination with the RadioGroup component as demonstrated in [these examples](#/Components/Inputs/RadioGroup).

### props combinator

```jsx
import {useState, useCallback} from 'react';
import { Select } from '@zextras/carbonio-design-system';

const [checked1, setChecked1] = useState(false);

const onClick1 = useCallback(() => setChecked1((c) => !c), []);

const sizeItems = [
	{
		label: 'small',
		value: 'small'
	},
	{
		label: 'medium',
		value: 'medium'
	}
];
const [selectedSize, setSelectedSize] = useState('medium');

const iconColorItems = [
    {
        label: 'currentColor',
        value: 'currentColor'
    },
    {
        label: 'transparent',
        value: 'transparent'
    },
    {
        label: 'primary',
        value: 'primary'
    },
    {
        label: 'secondary',
        value: 'secondary'
    },
    {
        label: 'header',
        value: 'header'
    },
    {
        label: 'highlight',
        value: 'highlight'
    },
    {
        label: 'gray0',
        value: 'gray0'
    },
    {
        label: 'gray1',
        value: 'gray1'
    },
    {
        label: 'gray2',
        value: 'gray2'
    },
    {
        label: 'gray3',
        value: 'gray3'
    },
    {
        label: 'gray4',
        value: 'gray4'
    },
    {
        label: 'gray5',
        value: 'gray5'
    },
    {
        label: 'gray6',
        value: 'gray6'
    },
    {
        label: 'warning',
        value: 'warning'
    },
    {
        label: 'error',
        value: 'error'
    },
    {
        label: 'success',
        value: 'success'
    },
    {
        label: 'info',
        value: 'info'
    },
    {
        label: 'text',
        value: 'text'
    }
];
const [selectedIconColor, setSelectedIconColor] = useState('gray0');

<>
	<Select
		items={sizeItems}
		background="gray5"
		label="Size"
		onChange={setSelectedSize}
		defaultSelection={{ value: 'medium', label: 'medium' }}
	/>
	<Select
		items={iconColorItems}
		background="gray5"
		label="iconColor"
		onChange={setSelectedIconColor}
		defaultSelection={{ value: 'gray0', label: 'gray0' }}
	/>
	<Radio iconColor={selectedIconColor} size={selectedSize} checked={checked1} onClick={onClick1} label={`size ${selectedSize}, not disabled, iconColor ${selectedIconColor}, checked ${checked1}`} />
	<Radio disabled iconColor={selectedIconColor} size={selectedSize} checked={checked1} onClick={onClick1} label={`size ${selectedSize}, disabled, iconColor ${selectedIconColor}, checked ${checked1}`} />
</>
```

### check isDefaultPrevented to avoid that component label triggers checked switch 

```jsx
import { useState } from 'react';
import { Row, Text, Padding, Select } from '@zextras/carbonio-design-system';

<>
	<Radio
		label={
			<Row
				onClick={(ev) => {
					ev.preventDefault();
				}}
            	takeAvailableSpace mainAlignment="flex-start" wrap="nowrap">
				<Text overflow="break-word">label</Text>
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
			</Row>
		}
	/>
</>;
```

### Controlled

```jsx
import { useState } from 'react';
import { Button, RadioGroup, Row, Input, Text, Padding, Select } from '@zextras/carbonio-design-system';

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
import { RadioGroup, Button } from '@zextras/carbonio-design-system';

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
