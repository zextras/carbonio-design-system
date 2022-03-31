<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

### Default

```jsx
<DateTimePicker label="Date Time Picker" isClearable />
```

### Without Time & Custom Date Format

```jsx
import { useState, useCallback } from 'react';
const [date, setDate] = useState(new Date());
const handleChange = useCallback((d) => {
	setDate(d);
}, []);

<DateTimePicker
    label="Date Time Picker"
    defaultValue={date}
    includeTime={false}
    onChange={handleChange}
    enableChips
    dateFormat="dd/MM/yyyy"
/>
```

### With Custom Input

```jsx
import { useState, forwardRef } from 'react';
import { Button } from '@zextras/carbonio-design-system';

const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
	<Button onClick={onClick} ref={ref} label={value} icon="CalendarOutline" />
));

<DateTimePicker
    label="Date Time Picker"
    includeTime={false}
    dateFormat="dd/MM/yyyy"
    CustomComponent={ExampleCustomInput}
/>
```

### With Chips

```jsx
import { useState } from 'react';
import { Padding } from '@zextras/carbonio-design-system';
<>
	<DateTimePicker
		label="Date Time Picker"
		enableChips
		includeTime={false}
		dateFormat="dd/MM/yyyy"
		defaultValue={new Date()}
	/>
</>;
```

### With Error

```jsx
import { useState } from 'react';
import { Padding } from '@zextras/carbonio-design-system';
<>
	<DateTimePicker label="Date Time Picker" hasError />
	<Padding top="small" />
	<DateTimePicker label="Date Time Picker" enableChips chipProps={{ hasError: true }} hasError />
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
		status: 1,
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
		status: 1,
		notes: ''
	}
];

<StatusTable items={items} />;
```
