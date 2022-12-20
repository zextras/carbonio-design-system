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

### Localization

Accept locale both as a string (and perform the required [registration of react-datepicker](https://github.com/Hacker0x01/react-datepicker#localization) automatically)
or as an object, imported from date-fns library.

Locale does not change the "time" label, which requires to be translated from the outside and pass it in the **timeLabel** prop.

#### Important note about bundle
The lib react-datepicker works only with _date-fns_ and not moment.
To avoid importing all locales inside the bundle of the DS, it's left up to the external
project to install date-fns and configure it to limit the bundle size.
See https://date-fns.org/v2.29.3/docs/webpack for more details.

**Important:** check inside installed dependency date-fns/locale for available locales (e.g.: en does not exists, en-US is the default)

Locale can be set in 3 ways:
1) By registering the locale and set it as default. Locale can be overridden for a single component by passing the locale prop.
If not specified differently, default locale is en-US.
```tsx
import es from 'date-fns/locale/es';
import ptBR from 'date-fns/locale/pt-BR';
import ru from 'date-fns/locale/ru';
import { Container, registerLocale, setDefaultLocale } from '@zextras/carbonio-design-system';

registerLocale('es', es);
registerLocale('pt-BR', ptBR);
registerLocale('ru', ru);

setDefaultLocale('es');

<Container gap={'0.5rem'} orientation={'horizontal'}>
    <DateTimePicker timeCaption="need translation" />
    <DateTimePicker locale={'pt-BR'} timeCaption="need translation" />
    <DateTimePicker locale={'ru'} timeCaption="need translation" />
</Container>
```

2) By registering the locale and pass the locale key as in the locale prop
```tsx
import es from 'date-fns/locale/es';
import ru from 'date-fns/locale/ru';
import ptBR from 'date-fns/locale/pt-BR';
import { Container, registerLocale } from '@zextras/carbonio-design-system';

registerLocale('es', es);
registerLocale('pt-BR', ptBR);
registerLocale('ru', ru);

<Container gap={'0.5rem'} orientation={'horizontal'}>
  <DateTimePicker locale={'es'} timeCaption="need translation" />
  <DateTimePicker locale={'pt-BR'} timeCaption="need translation" />
  <DateTimePicker locale={'ru'} timeCaption="need translation" />
</Container>
```

3) By passing the locale object in the locale prop
```tsx
import es from 'date-fns/locale/es';
import ru from 'date-fns/locale/ru';
import ptBR from 'date-fns/locale/pt-BR';
import { Container, Row } from '@zextras/carbonio-design-system';

<Container gap={'0.5rem'} orientation={'horizontal'}>
    <DateTimePicker locale={es} timeCaption="need translation" />
    <DateTimePicker locale={ptBR} timeCaption="need translation" />
    <DateTimePicker locale={ru} timeCaption="need translation" />
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
