<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

Radio buttons can be used to select one option out of a list of many.

Radio should be used in combination with the RadioGroup component as demonstrated in [these examples](#/Components/Inputs/RadioGroup).

### Props combinator

```jsx
import { useState, useCallback, useMemo } from 'react';
import { Select, useTheme, Container, Row } from '@zextras/carbonio-design-system';
import { map } from 'lodash';

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

const theme = useTheme();

const iconColorItems = useMemo(() => map(theme.palette, (value, key) => ({
	label: key,
	value: key
})), [theme]);

const [selectedIconColor, setSelectedIconColor] = useState('gray0');

<Container gap={'0.5rem'}>
	<Container gap={'0.5rem'} orientation={'horizontal'}>
		<Row width={'50%'}>
			<Select
				items={sizeItems}
				background='gray5'
				label='Size'
				onChange={setSelectedSize}
				defaultSelection={{ value: 'medium', label: 'medium' }}
			/>
		</Row>
		<Row width={'50%'}>
			<Select
				items={iconColorItems}
				background='gray5'
				label='iconColor'
				onChange={setSelectedIconColor}
				defaultSelection={{ value: 'gray0', label: 'gray0' }}
			/>
		</Row>
	</Container>
	<Radio iconColor={selectedIconColor} size={selectedSize} checked={checked1} onClick={onClick1}
				 label={`size ${selectedSize}, not disabled, iconColor ${selectedIconColor}, checked ${checked1}`} />
	<Radio disabled iconColor={selectedIconColor} size={selectedSize} checked={checked1}
				 onClick={onClick1}
				 label={`size ${selectedSize}, disabled, iconColor ${selectedIconColor}, checked ${checked1}`} />
</Container>;
```

## Tips
By default, click on the label (even custom ones) toggle the value of the radio input.
In order to prevent this behavior, you need to prevent the default on the click event of the label itself.

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
import { useState, useCallback, useMemo, useRef } from 'react';
import {
	Button,
	RadioGroup,
	Row,
	Input,
	Text,
	Padding,
	Select
} from '@zextras/carbonio-design-system';

const [activeValue, setActiveValue] = useState('salad');

const updateActiveValue = useCallback((value) => () => {
	setActiveValue((prevState) => value === prevState ? '' : value);
}, []);

<>
	<Radio label='Chicken' value='chicken' onClick={updateActiveValue('chicken')}
				 checked={activeValue === 'chicken'} />
	<Radio label='Salad' value='salad' onClick={updateActiveValue('salad')}
				 checked={activeValue === 'salad'} />
	<Radio label='Tomato' value='tomato' onClick={updateActiveValue('tomato')}
				 checked={activeValue === 'tomato'} />
	<Radio
		label={
			<Row takeAvailableSpace mainAlignment='flex-start' wrap='nowrap' gap={'0.25rem'}>
				<Text overflow='break-word'>Day</Text>
				<Input backgroundColor='gray5' label='Day' defaultValue='17' />
				<Text overflow='break-word'>of every</Text>
				<Input backgroundColor='gray5' label='Month' defaultValue='1' />
			</Row>
		}
		value='complex-1'
		onClick={updateActiveValue('complex-1')}
        checked={activeValue === 'complex-1'}
	/>
	<Radio
		label={
			<Row takeAvailableSpace mainAlignment='flex-start' wrap='nowrap' gap={'0.25rem'}>
				<Text overflow='break-word'>The</Text>
				<Select
					display='inline-block'
					dropdownWidth='auto'
					background='gray5'
					label='Number'
					items={[{ label: 'Second', value: '1' }]}
					defaultSelection={{ value: '1', label: 'Second' }}
				/>
				<Select
					display='inline-block'
					dropdownWidth='auto'
					background='gray5'
					label='Day'
					items={[{ label: 'Weekend day', value: '1' }]}
					defaultSelection={{ value: '1', label: 'Weekend day' }}
				/>
				<Text overflow='break-word'>of every</Text>
				<Select
					display='inline-block'
					dropdownWidth='auto'
					background='gray5'
					label='Month'
					items={[{ label: 'January', value: '1' }]}
					defaultSelection={{ value: '1', label: 'January' }}
				/>
			</Row>
		}
		value='complex-2'
		onClick={updateActiveValue('complex-2')}
		checked={activeValue === 'complex-2'}
	/>
	<Radio label='Mayo' value='mayo' disabled={true}
				 onClick={updateActiveValue('mayo')} checked={activeValue === 'mayo'} />
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
