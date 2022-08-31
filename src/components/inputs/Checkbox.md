<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

Checkboxes can be used to turn an option on or off.

It can also be used with a label description.

The Icon and status of the component depend on the checked status, whose initial value can be set via the `defaultChecked` prop.

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
	<Checkbox iconColor={selectedIconColor} size={selectedSize} checked={checked1} onClick={onClick1} label={`size ${selectedSize}, not disabled, iconColor ${selectedIconColor}`} />
	<Checkbox disabled iconColor={selectedIconColor} size={selectedSize} checked={checked1} onClick={onClick1} label={`size ${selectedSize}, disabled, iconColor ${selectedIconColor}`} />
</>
```

### Controlled

```jsx
import {useState, useCallback} from 'react';
const [checked1, setChecked1] = useState(false);
const [checked2, setChecked2] = useState(false);

const onClick1 = useCallback(() => setChecked1((c) => !c), []);
const onClick2 = useCallback(() => setChecked2((c) => !c), []);
<>
    <Checkbox value={checked1} onClick={onClick1} />
    <Checkbox value={checked2} onClick={onClick2} label="I have a label!" />
    <Checkbox value={checked1} onClick={onClick1} label="The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! " />
    <Checkbox value={checked2} onClick={onClick2} disabled={true} label="Disabled" />
</>
```

### Uncontrolled

```jsx
import {useState} from 'react';

<>
    <Checkbox defaultChecked={true} onChange={console.log}/>
    <Checkbox defaultChecked={false} onChange={console.log} label="I have a label!"/>
</>
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
