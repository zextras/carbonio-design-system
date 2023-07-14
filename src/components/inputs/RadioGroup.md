<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

RadioGroup can be used to select one option out of a list of many.

### Controlled

```jsx
import { useCallback, useState } from 'react';
import { Button, Radio, Row, Input, Text, Padding, Select } from '@zextras/carbonio-design-system';

const [activeValue, setActiveValue] = useState('salad');
const changeActiveValue = useCallback((newValue) => {
	setActiveValue(newValue);
}, []);

<RadioGroup value={activeValue} onChange={changeActiveValue} name={'controlled-radio'}>
	<Radio label='Chicken' value='chicken' />
	<Radio label='Salad' value='salad' />
	<Radio label='Tomato' value='tomato' />
	<Radio
		label={
			<Row takeAvailableSpace mainAlignment='flex-start' wrap='nowrap'>
				<Text overflow='break-word'>Day</Text>
				<Padding horizontal='small'>
					<Input
						backgroundColor='gray5' label='Day'
						defaultValue='17'
					/>
				</Padding>
				<Text overflow='break-word'>of every</Text>
				<Padding left='small'>
					<Input
						backgroundColor='gray5' label='Month'
						defaultValue='1'
					/>
				</Padding>
			</Row>
		}
		value='complex-1'
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
	/>
	<Radio label='Mayo' value='mayo' disabled={true} />
</RadioGroup>;
```

### Uncontrolled

```jsx
import { Radio, Button } from '@zextras/carbonio-design-system';

<RadioGroup defaultValue={'chicken'}>
	<Radio label='Chicken' value='chicken' />
	<Radio label='Salad' value='salad' />
	<Radio label='Tomato' value='tomato' />
	<Radio
		label={
			<Button
				type='outlined'
				label='Click me'
				color='info'
				onClick={() => {
					console.log('I got clicked!!');
				}}
			/>
		}
		value='click-me'
	/>
	<Radio label='Mayo' value='mayo' disabled />
</RadioGroup>;

```

### Disabled
You can quickly disable all the radios by disabling the entire group

```jsx
import { Container, Switch, Radio } from '@zextras/carbonio-design-system';
import { useCallback, useState } from 'react';

const [disabled, setDisabled] = useState(false);

const toggleDisabled = useCallback(() => {
	setDisabled((prevState) => !prevState);
}, []);

<Container crossAlignment={'flex-start'} gap={'1rem'}>
	<Switch label={'Disable group'} onClick={toggleDisabled} />
	<RadioGroup disabled={disabled}>
		<Radio value={'r1'} label={'Radio 1'} />
		<Radio value={'r2'} label={'Radio 2'} disabled />
		<Radio value={'r3'} label={'Radio 3'} />
	</RadioGroup>
</Container>;

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
