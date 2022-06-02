<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

Input whose entered values are showed as Chip elements.

The values are added when

- the 'space', 'enter' or 'comma' key are pressed
- ChipInput lose the focus (onBlur)

and are deleted when the 'Backspace' key is pressed.

When the internal state of the input changes the 'onChange' callback is called (with the current internal values as parameter).

You can pass the 'options' prop to populate a Dropdown to show within the ChipInput.
The view of single elements in the Dropdown can be modified passing down a ['customComponent' in the options value](#/Components/Data%20display/Dropdown).

**It's necessary to memoize** 'onChange' and 'onAdd' callbacks to avoid unusual behaviors.

---

### Controlled ChipInput

```jsx
import { useState, useRef, useCallback, useEffect } from 'react';
import { Button, Container, Divider, Input, Text } from '@zextras/carbonio-design-system';

const getChipLabel = (item) =>
	item.address || item.lastName || item.firstName || item.phone || item.value;
const initial = [
	{
		address: 'helensinclair@jourrapide.com',
		lastName: 'Sinclair',
		firstName: 'Helen',
		label: 'asd'
	},
	{
		address: 'pierrejohnson@rhyta.com',
		lastName: 'Johnson',
		firstName: 'Pierre',
		phone: '234627252',
		label: 'asd2'
	},
	{
		phone: '33683',
		label: 'asd3'
	},
	{
		value: 'something',
		label: 'asd4'
	}
];

const [contactsTo, setContactsTo] = useState(initial);
const [inputValue, setInputValue] = useState('');
const [options, setOptions] = useState([]);
const [results, setResults] = useState();

const addValue = () => {
	setContactsTo([...contactsTo, { label: inputValue }]);
	setInputValue('');
};
const onChange = useCallback(function onChange(c) {
	setContactsTo(c);
}, []);

useEffect(() => {
	fetch('https://jsonplaceholder.typicode.com/posts')
		.then((response) => response.json())
		.then((posts) => setResults(posts));
}, []);

<>
	<div>
		<Container
			orientation="horizontal"
			mainAlignment="flex-start"
			width="500px"
			padding={{ bottom: 'medium' }}
		>
			<Input
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				label="Contact to add"
			/>
			<Button onClick={(e) => addValue()} label="Add Element" />
		</Container>
		<ChipInput
			placeholder="To:"
			value={contactsTo}
			onChange={onChange}
			onInputType={(e) => {
				if (e.textContent && e.textContent !== '')
					setOptions(
						results
							.filter((result) => result.title.includes(e.textContent))
							.map((result) => ({ id: result.id, value: result.title, label: result.title }))
					);
				else setOptions([]);
			}}
			options={options}
		/>
		<Container
			mainAlignment="flex-start"
			crossAlignment="flex-start"
			width="500px"
			padding={{ top: 'medium' }}
		>
			<Text padding={{ bottom: 'medium' }}>State value:</Text>
			{contactsTo.length > 0 && (
				<ul>
					{contactsTo.map((contact, index) => (
						<li key={index}>
							<Text>{JSON.stringify(contact)}</Text>
						</li>
					))}
				</ul>
			)}
			{!contactsTo.length && <Text>Empty!</Text>}
		</Container>
	</div>
</>;
```

### Uncontrolled ChipInput

```jsx
import { useState, useRef, useCallback, useEffect } from 'react';
import { Button, Container, Divider, Input, Text } from '@zextras/carbonio-design-system';

const initial = [
	{
		label: 'helensinclair@jourrapide.com',
		lastName: 'Sinclair',
		firstName: 'Helen'
	},
	{
		label: 'pierrejohnson@rhyta.com',
		lastName: 'Johnson',
		firstName: 'Pierre'
	}
];
const [logs, setLogs] = useState([]);
const [options, setOptions] = useState([]);
const [results, setResults] = useState();

const onChange = useCallback((contacts) => {
	setLogs((l) => [...l, { change: contacts }]);
}, []);

useEffect(() => {
	fetch('https://jsonplaceholder.typicode.com/posts')
		.then((response) => response.json())
		.then((posts) => setResults(posts));
}, []);

<>
	<div>
		<ChipInput
			placeholder="To:"
			defaultValue={initial}
			onChange={onChange}
			maxChips={2}
			onInputType={(e) => {
				console.log(e.textContent);
				if (e.textContent && e.textContent !== '')
					setOptions(
						results
							.filter((result) => result.title.includes(e.textContent))
							.map((result) => ({ id: result.id, value: result.title, label: result.title }))
					);
				else setOptions([]);
			}}
			options={options}
		/>
		<Container
			orientation="horizontal"
			mainAlignment="flex-start"
			crossAlignment="center"
			width="500px"
			padding={{ top: 'medium', bottom: 'medium' }}
		>
			<Text style={{ margin: '0 50px 0 0' }}>Changes log:</Text>
			<Button label="Clear" onClick={() => setLogs([])} />
		</Container>
		{logs.length > 0 && (
			<ul>
				{logs.map((log, index) => (
					<li key={index}>
						<Text>{JSON.stringify(log.change)}</Text>
					</li>
				))}
			</ul>
		)}
		{!logs.length && <Text>Empty!</Text>}
	</div>
</>;
```

### Emails example

```jsx
import { useState, useRef, useCallback, useEffect } from 'react';
import { Button, Container, Divider, Input, Text } from '@zextras/carbonio-design-system';

const [options, setOptions] = useState([]);
const [results, setResults] = useState();

function isValidEmail(email) {
	var re = /\S+@\S+\.\S+/;
	return re.test(email);
}

const onAdd = useCallback((valueToAdd) => {
	const chip = { label: valueToAdd };
	if (!isValidEmail(valueToAdd)) chip.hasError = true;
	chip.icon = 'EmailOutline';
	return chip;
}, []);

<>
	<ChipInput
		placeholder="Emails"
		defaultValue={[{ label: 'pippo@franco.it', background: 'gray3', color: 'text' }]}
		onAdd={onAdd}
	/>
</>;
```

### Different Style

```jsx
import { useState, useRef, useCallback, useEffect } from 'react';
import { Button, Container, Divider, Input, Text } from '@zextras/carbonio-design-system';

const [options, setOptions] = useState([]);
const [results, setResults] = useState();

function isValidEmail(email) {
	var re = /\S+@\S+\.\S+/;
	return re.test(email);
}

const onAdd = useCallback((valueToAdd) => {
	const chip = { label: valueToAdd, background: 'gray3', color: 'text' };
	if (!isValidEmail(valueToAdd)) chip.hasError = true;
	return chip;
}, []);

<>
	<ChipInput
		placeholder="Emails"
		defaultValue={[{ label: 'pippo@franco.it', background: 'gray3', color: 'text' }]}
		background="gray5"
		onAdd={onAdd}
		wrap="wrap"
		icon="FolderOutline"
		maxHeight={200}
	/>
</>;
```

### Custom Separators

```jsx
<ChipInput
	placeholder="Chips:"
	defaultValue={[]}
	separators={['a', 'e', 'i', 'o', 'u']}
	confirmChipOnSpace={false}
/>
```

### Max Chips example

```jsx
<ChipInput
	placeholder="Max 3 Chips"
	defaultValue={[{ label: 'pippo@franco.it', background: 'gray3', color: 'text' }]}
	maxChips={3}
/>
```

### Has Error example

```jsx
const initial = [
	{
		id: '0',
		address: 'helensinclair@jourrapide.com',
		lastName: 'Sinclair',
		firstName: 'Helen',
		label: 'asd'
	},
	{
		id: '1',
		address: 'pierrejohnson@rhyta.com',
		lastName: 'Johnson',
		firstName: 'Pierre',
		phone: '234627252',
		label: 'asd2'
	},
	{ id: '2', phone: '33683', label: 'asd3' },
	{ id: '3', value: 'something', label: 'asd4' }
];

<ChipInput
	placeholder="Input with error"
	defaultValue={[{ label: 'pippo@franco.it', background: 'gray3', color: 'text' }]}
	hasError={true}
	maxChips={3}
	errorLabel="You have an error"
/>;
```

### Chipinput with unique chips

```jsx
import { useState } from 'react';
const initial = [
	{
		id: '0',
		address: 'helensinclair@jourrapide.com',
		lastName: 'Sinclair',
		firstName: 'Helen',
		label: 'Helen',
		value: {
			label: 'Helen Sinclair',
			anotherProp: 'prop1',
			avatarIcon :'People'
		}
	},
	{
		id: '1',
		address: 'pierrejohnson@rhyta.com',
		lastName: 'Johnson',
		firstName: 'Pierre',
		phone: '234627252',
		label: 'Pierre',
		value: {
			label: 'Pierre Johnson',
			anotherProps: 'ss'
		}
	},
	{
		id: '3',
		address: 'pierrejohnson@rhyta.com',
		lastName: 'Johnson',
		firstName: 'Pierre',
		phone: '234627252',
		label: 'No Label',
		value: {
			
			anotherProps: 'ss'
		}
	},
	{ id: '2', phone: '33683', label: 'Test user' },
	{ id: '3', value: 'something', label: 'asd4' }
];

const [options, setOptions] = useState([]);
console.log('options:', options);
const onChange = (e) => {
	console.log('e:', e);
	setOptions(e);
};


<ChipInput
	placeholder="Select"
	defaultValue={options}
	options={initial}
	requireUniqueChips
	onChange={onChange}
	disableOptions={false}	
/>;
```


### ChipInput with paste support

```jsx
import { useState } from 'react';
const [options, setOptions] = useState([]);

const onChange = (chips) => {
	console.log('chips:', chips);
	setOptions(chips);
};
<ChipInput
	placeholder="Chips:"
	defaultValue={options}
	pasteSeparators={[',']}
	createChipOnPaste
	confirmChipOnSpace={false}	
	onChange={onChange}
/>
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
		status: 1,
		notes: ''
	},
	{
		feature: 'Examples',
		status: 2,
		notes: 'Needs more examples'
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
		status: 2,
		notes: 'Needs more customizability'
	}
];

<StatusTable items={items} />;
```
