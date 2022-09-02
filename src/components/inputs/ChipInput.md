<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

Input whose entered values are showed as Chip elements.

By default, values are added when

- the 'space', 'enter' or 'comma' key are pressed
- ChipInput lose the focus (onBlur)

and are deleted when the 'Backspace' key is pressed.

When the internal state of the input changes the 'onChange' callback is called (with the current internal values as parameter).

You can pass the 'options' prop to populate a Dropdown to show within the ChipInput.
The view of single elements in the Dropdown can be modified passing down a ['customComponent' in the options value](#/Components/Data%20display/Dropdown).

**It's necessary to memoize** 'onChange' and 'onAdd' callbacks to avoid unusual behaviors.

A custom Chip can be used in order to have more control on what a chip can do, but the component has to be an instance of the base Chip.


## onAdd vs onChange
**onAdd** and **onChange** have two different meaning in the chip input:
- onAdd: has to be used only for converting a value in a chip. The value received by arg can be a string or the value of a dropdown option, 
if present (value intended as the field _value_ of the Dropdown option object)
- onChange: onChange is called when a chip is added/removed/replaced from "inside" the chip input component. This means that if you
have to update the value from the outside, you can just change the value prop you pass to your ChipInput, and onChange will not be called.

## Disabled variants

ChipInput elements can be disabled independently.

To disable only the input, use the _disable_ prop.

To disable the dropdown (hide it), use the _disableOptions_ prop and also leave the _options_ prop empty (or valued with an empty array)

To disable the icon / iconButton, use the _iconDisabled_ prop

To entirely disable the chipInput, all the three disabling props has to be set to false and the _options_ prop has to be empty.
If options are provided, they will be visible by clicking on the chip input, and chips can be added through them (see usage examples below)

---

### Controlled ChipInput

In controlled mode value can be updated from outside the ChipInput.
When updated, the new value is applied to the ChipInput **without any internal check**,
so **you need to perform any additional check before setting the new value** (e.g. if you intend to have only uniq chips
or a max number of chips).

In the example below, the ChipInput has both the requireUniqChips and the maxChips prop valued. When chips are added directly
through the ChipInput, the checks are done, but when you set a new value through the Input (and Button), more than 8 chips are allowed,
and so are duplicates.

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
        maxChips={8}
        requireUniqueChips
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
```

### Emails example

```jsx
import { useState, useRef, useCallback, useEffect } from 'react';
import { Button, Container, Divider, Input, Text } from '@zextras/carbonio-design-system';

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

<ChipInput
    placeholder="Emails"
    defaultValue={[{ label: 'pippo@franco.it', background: 'gray3', color: 'text' }]}
    onAdd={onAdd}
/>
```

### Different Style

```jsx
import { useState, useRef, useCallback, useEffect } from 'react';
import { Button, Container, Divider, Input, Text } from '@zextras/carbonio-design-system';

function isValidEmail(email) {
	var re = /\S+@\S+\.\S+/;
	return re.test(email);
}

const onAdd = useCallback((valueToAdd) => {
	const chip = { label: valueToAdd, background: 'gray3', color: 'text' };
	if (!isValidEmail(valueToAdd)) chip.hasError = true;
	return chip;
}, []);

<ChipInput
    placeholder="Emails"
    defaultValue={[{ label: 'pippo@franco.it', background: 'gray3', color: 'text' }]}
    background="gray5"
    onAdd={onAdd}
    wrap="wrap"
    icon="FolderOutline"
/>
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

### ChipInput with unique chips

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
		id: '2',
		address: 'pierrejohnson@rhyta.com',
		lastName: 'Johnson',
		firstName: 'Pierre',
		phone: '234627252',
		label: 'No Label',
		value: {
			
			anotherProps: 'ss'
		}
	},
	{ id: '3', phone: '33683', label: 'Test user' },
	{ id: '4', value: 'something', label: 'asd4' }
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
	separators={['Enter', ',', ';']}
	pasteSeparators={[',']}
	confirmChipOnSpace={false}
	createChipOnPaste
	onChange={onChange}
/>
```
### Figma variants

```jsx
import { useCallback, useState } from 'react';
import { Container } from '@zextras/carbonio-design-system';

const [value1, setValue1] = useState([]);
const [value2, setValue2] = useState([]);
const [error, setError] = useState(false);

const onChangeChipInput1 = useCallback(
	(items) => {
		setValue1(items);
		setError(items.length > 0)
	},
	[],
);


<Container style={{ gap: '10px' }}>
	<ChipInput
		placeholder="Chip input 1"
		description="Optional description"
		icon="EyeOutline"
		iconAction={console.log}
		value={value1}
		onChange={onChangeChipInput1}
        background="gray5"
        bottomBorderColor="gray3"
	/>
	<ChipInput
		placeholder="Chip input 2"
		description="Optional description"
		icon="EyeOutline"
		iconAction={console.log}
		value={value2}
		onChange={setValue2}
        background="gray5"
        bottomBorderColor="gray3"
	/>
	<ChipInput
		description="Chip input 3"
		icon="EyeOutline"
		iconAction={console.log}
        background="gray5"
        bottomBorderColor="gray3"
	/>
	<ChipInput
		placeholder="Chip input 4"
		description={!error ? 'Fill chip input 1 to set error state' : 'Clear chip input 1 to remove error'}
		icon="EyeOutline"
		iconAction={console.log}
		hasError={error}
        background="gray5"
        bottomBorderColor="gray3"
	/>
	<ChipInput
		placeholder="Chip input 5"
		description="Disabled status"
		icon="EyeOutline"
		iconAction={console.log}
        iconDisabled
        disabled
        background="gray5"
        bottomBorderColor="gray3"
	/>
</Container>
```

### Custom Chip

```jsx
import { Chip, Popover, Text, Container } from '@zextras/carbonio-design-system';
import { useRef, useState, useCallback } from 'react';

const chipInputRef = useRef();

const CustomChip = (props) => {
	const [open, setOpen] = useState(false);
	const chipRef = useRef(undefined);
	const openPopover = useCallback(
        (e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpen(true);
        },
        [],
    );
	
	const closePopover = useCallback(() => {
        setOpen(false)
    }, [])
  
	return (
		<>
            <Container ref={chipRef} flexShrink={0} width="fit">
                <Chip {...props} onClick={openPopover} />
            </Container>
			<Popover open={open} anchorEl={chipRef} placement="bottom" onClose={closePopover}>
				<Text>Popover for the chip: {props.label}</Text>
			</Popover>
		</>
	);
};

<ChipInput placeholder="With custom chip" ChipComponent={CustomChip} ref={chipInputRef} />

```

### Chips overflowing management

Horizontal scroll
```jsx
import { useMemo } from 'react';

const defaultValue = useMemo(() => {
	const initial = [];
	for (let i = 0; i < 50; i += 1) {
		initial.push({ label: `chip number ${i + 1}`});
    }
	return initial;
}, []);

<ChipInput defaultValue={defaultValue} wrap="nowrap" icon="PeopleOutline" maxChips={null} placeholder="label for chipinput" />
```

Wrap on new line
```jsx
import { useMemo } from 'react';

const defaultValue = useMemo(() => {
	const initial = [];
	for (let i = 0; i < 50; i += 1) {
		initial.push({ label: `chip number ${i + 1}`});
    }
	return initial;
}, []);

<ChipInput defaultValue={defaultValue} icon="PeopleOutline" maxChips={null} wrap="wrap" placeholder="label for chipinput" confirmChipOnBlur={false} />
```

### ChipInput Options

Dropdown is accessible even if chipInput is disabled. This allows chips to be entered only through options and not with typing.
To entirely disable the chipInput, both the disable options have to be set to false.

When options are provided, and there is some option in the dropdown, blur event does not create a chip.

```jsx
import { Container } from '@zextras/carbonio-design-system';

const options = [
	{ id: '1', label: 'First option' },
	{ id: '2', label: 'Second option' },
	{ id: '3', label: 'Third option' },
	{ id: '4', label: 'Fourth option' },
	{ id: '5', label: 'Fifth option' }
];
<Container style={{ gap: '10px' }} orientation="horizontal">
    <ChipInput placeholder="ChipInput enabled" options={options} disableOptions={false} background="gray5" bottomBorderColor="gray3" description="" />
    <ChipInput placeholder="ChipInput disabled" options={options} disabled disableOptions={false} background="gray5" bottomBorderColor="gray3" description="Disabled" />
</Container>
```

To simulate a suggestion mode, value the option prop dinamically, leaving the disableOptions prop set to false

```jsx
import { useCallback, useState, useRef } from 'react';
import { Container } from '@zextras/carbonio-design-system';
import { filter } from 'lodash';

const allOptions = [
	{ id: '1', label: 'First option' },
	{ id: '2', label: 'Second option' },
	{ id: '3', label: 'Third option' },
	{ id: '4', label: 'Fourth option' },
	{ id: '5', label: 'Fifth option' }
];

const [options, setOptions] = useState([]);
const inputRef = useRef(null);

const filterOptions = useCallback(({ textContent }) => {
  setOptions(filter(allOptions, (option) => option.label.toLowerCase().includes(textContent.toLowerCase())));
}, []);

const iconAction = useCallback(() => {
	setOptions((prevState) => {
		if (inputRef.current && inputRef.current.value.length > 0) {
			return prevState;
        }
		return [...allOptions];
    });
}, []);

<Container style={{ gap: '10px' }}>
    <ChipInput
      placeholder="Options are filtered on typing"
      options={options}
      disableOptions
      background="gray5"
      bottomBorderColor="gray3"
      onInputType={filterOptions}
      icon="ChevronDown"
      iconAction={iconAction}
      inputRef={inputRef}
      description="Here options are shown when user starts typing or when the chevron icon is clicked"
    />
</Container>
```

To show all options also on focus an additional listener is required

```jsx
import { useCallback, useState, useRef, useEffect } from 'react';
import { Container } from '@zextras/carbonio-design-system';
import { filter } from 'lodash';

const allOptions = [
	{ id: '1', label: 'First option' },
	{ id: '2', label: 'Second option' },
	{ id: '3', label: 'Third option' },
	{ id: '4', label: 'Fourth option' },
	{ id: '5', label: 'Fifth option' }
];

const [options, setOptions] = useState([]);
const inputRef = useRef(null);

const filterOptions = useCallback(({ textContent }) => {
	if (textContent) {
      console.log(textContent)
      setOptions(filter(allOptions, (option) => option.label.toLowerCase().includes(textContent.toLowerCase())));
    } else {
	  setOptions([...allOptions]);
    }
}, []);

const iconAction = useCallback(() => {
	setOptions((prevState) => {
		if (inputRef.current && inputRef.current.value.length > 0) {
			return prevState;
        }
		return [...allOptions];
    });
}, []);

const initOptions = useCallback(() => {
    filterOptions({ textContent: inputRef.current ? inputRef.current.value : '' });
}, [filterOptions]);
  

<Container style={{ gap: '10px' }} onClick={initOptions}>
    <ChipInput
      placeholder="Options are filtered on typing"
      options={options}
      disableOptions
      background="gray5"
      bottomBorderColor="gray3"
      onInputType={filterOptions}
      icon="ChevronDown"
      iconAction={iconAction}
      inputRef={inputRef}
      description="Here options are shown when user starts typing or when the chevron icon is clicked"
    />
</Container>
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
