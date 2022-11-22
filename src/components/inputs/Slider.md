<!--
SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->
Slider allow to choose a value in a range. The slider is configured to have a range between 0 and the number of steps provided (as array of label for the options).
The new value is the index (0-based) of the selected step.

## Controlled usage

```jsx
import { useCallback, useState, useRef } from 'react';
import { Button, Container, Text } from '@zextras/carbonio-design-system';

const OPTIONS = [
	{ value: 'optA', label: 'option 1' },
	{ value: 'optB', label: 'option 2' },
	{ value: 'optC', label: 'option 3' },
	{ value: 'optD', label: 'option 4' },
	{ value: 'optE', label: 'option 5' },
	{ value: 'optF', label: 'option 6' },
];
const DEFAULT_VALUE_INDEX = Math.floor(OPTIONS.length / 2);

const [value, setValue] = useState(DEFAULT_VALUE_INDEX);
const selectedOptionRef = useRef(null);

const onSliderChange = useCallback((ev, newValue) => {
	setValue(newValue);
	if (OPTIONS[newValue]) {
	  selectedOptionRef.current = OPTIONS[newValue].value;
    }
}, []);

const decreaseByStep = useCallback(() => {
  setValue((prevState) => {
    const newValue = prevState > 0 ? prevState - 1 : prevState;
    if (OPTIONS[newValue]) {
      selectedOptionRef.current = OPTIONS[newValue].value;
      return newValue;
    }
    return prevState;
  });
}, []);

const increaseByStep = useCallback(() => {
  setValue((prevState) => {
    const newValue = prevState < OPTIONS.length - 1 ? prevState + 1 : prevState
    if (OPTIONS[newValue]) {
      selectedOptionRef.current = OPTIONS[newValue].value;
      return newValue;
    }
    return prevState;
  });
}, []);

<Container orientation={'vertical'} gap="1rem">
  <Container orientation={'horizontal'} gap="1rem">
    <Button width={'fit'} minWidth={'fit-content'} label={'-'} type={'ghost'} onClick={decreaseByStep} />
    <Slider options={OPTIONS.map((option) => option.label)} value={value} onChange={onSliderChange} />
    <Button width={'fit'} minWidth={'fit-content'} label={'+'} type={'ghost'} onClick={increaseByStep} />
  </Container>
  <Text>Value: {value}</Text>
  <Text>Selected option: {selectedOptionRef.current}</Text>
</Container>
```

## Uncontrolled usage

For the uncontrolled usage, the value prop can be used to set a default value.

```jsx
import { useCallback, useState, useRef } from 'react';
import { Button, Container, Text } from '@zextras/carbonio-design-system';

const OPTIONS = [
	{ value: 'optA', label: 'option 1' },
	{ value: 'optB', label: 'option 2' },
	{ value: 'optC', label: 'option 3' },
	{ value: 'optD', label: 'option 4' },
	{ value: 'optE', label: 'option 5' }
];

const inputRef = useRef(null);
const [valueToPrint, setValueToPrint] = useState(undefined)

const printValue = useCallback(() => {
  if (inputRef.current && inputRef.current.value !== undefined) {
    setValueToPrint(inputRef.current.value);
  } else {
    setValueToPrint(undefined);
  }
}, []);

<Container orientation={'vertical'} gap="1rem">
  <Slider options={OPTIONS.map((option) => option.label)} inputRef={inputRef} value={1} />
  <Button onClick={printValue} label="print value" />
  <Text>Value: {valueToPrint}</Text>
</Container>
```
