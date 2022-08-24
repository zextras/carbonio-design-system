<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

The Modal is the component that appears in front of app content to provide critical information or ask for decisions, and informs the user about a task.

The Modal requires decisions to be taken and can involve multiple tasks which have a clear start and end points.

This component helps also to prevent critical errors (for example when deleting an element) and to get user’s attention.

#### Simple Modal
```jsx
import { useState } from 'react';
import { Button, Checkbox, Text } from '@zextras/carbonio-design-system';

const [open, setOpen] = useState(false);
const clickHandler = () => setOpen(true);
const closeHandler = () => setOpen(false);

<>
    <Button label="Trigger Modal" onClick={clickHandler}/>
    <Modal
        title="Title_bold_dark"
        open={open}
        onConfirm={closeHandler}
        onClose={closeHandler}
		showCloseIcon={true}
		>
        <Text overflow="break-word">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
    </Modal>
</>
```

#### Modal size variants
```jsx
import { useState } from 'react';
import { Button, Checkbox, Text, Row } from '@zextras/carbonio-design-system';

const [open, setOpen] = useState(false);
const [size, setSize] = useState('extrasmall');

const clickHandlerExtrasmall = () => {
	setOpen(true);
	setSize('extrasmall');
};
const clickHandlerSmall = () => {
	setOpen(true);
	setSize('small');
};
const clickHandlerMedium = () => {
	setOpen(true);
	setSize('medium');
};
const clickHandlerLarge = () => {
	setOpen(true);
	setSize('large');
};

const closeHandler = () => setOpen(false);

<>
    <Row takeAvailableSpace mainAlignment='space-around' >
      <Button label="extrasmall" onClick={clickHandlerExtrasmall}/>
	  <Button label="small" onClick={clickHandlerSmall}/>
	  <Button label="medium" onClick={clickHandlerMedium}/>
	  <Button label="large" onClick={clickHandlerLarge}/>
    </Row>
	<Modal
        title="Title_bold_dark"
        open={open}
        onConfirm={closeHandler}
        onClose={closeHandler}
		showCloseIcon={true}
        size={size}
		>
        <Text overflow="break-word">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
    </Modal>
</>
```


#### Error Modal
```jsx
import { useState } from 'react';
import { Button, Checkbox, Text } from '@zextras/carbonio-design-system';

const [open, setOpen] = useState(false);
const clickHandler = () => setOpen(true);
const closeHandler = () => setOpen(false);

<>
    <Button label="Trigger Modal" onClick={clickHandler}/>
    <Modal
        type="error"
        title="Title_bold_dark"
        open={open}
        onConfirm={closeHandler}
        onClose={closeHandler}
		showCloseIcon={true}
		>
        <Text overflow="break-word">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
    </Modal>
</>
```

#### Centered Error Modal
```jsx
import { useState } from 'react';
import { Button, Checkbox, Text } from '@zextras/carbonio-design-system';

const [open, setOpen] = useState(false);
const clickHandler = () => setOpen(true);
const closeHandler = () => setOpen(false);

<>
    <Button label="Trigger Modal" onClick={clickHandler}/>
    <Modal
        type="error"
        title="Title_bold_dark"
        open={open}
        centered
        onConfirm={closeHandler}
        onClose={closeHandler}
		showCloseIcon={true}
		>
        <Text overflow="break-word">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
    </Modal>
</>
```

#### Confirmation Modal
```jsx
import { useState } from 'react';
import { Button, Checkbox, Text } from '@zextras/carbonio-design-system';

const [open, setOpen] = useState(false);
const clickHandler = () => setOpen(true);
const closeHandler = () => setOpen(false);

<>
    <Button label="Trigger Modal" onClick={clickHandler}/>
    <Modal
        title="Title_bold_dark"
        open={open}
        dismissLabel="Cancel"
        onConfirm={closeHandler}
        confirmLabel="Proceed"
        onClose={closeHandler}
        optionalFooter={<Checkbox label="Never ask again!" />}
		showCloseIcon={true}
    >
        <Text overflow="break-word">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
    </Modal>
</>
```

#### Multiple Actions
```jsx
import { useState } from 'react';
import { Button, Checkbox, Text } from '@zextras/carbonio-design-system';

const [open, setOpen] = useState(false);
const clickHandler = () => setOpen(true);
const closeHandler = () => setOpen(false);

<>
    <Button label="Trigger Modal" onClick={clickHandler}/>
    <Modal
        title="Title_bold_dark"
        open={open}
        onConfirm={closeHandler}
        confirmLabel="Main Action"
        onSecondaryAction={closeHandler}
        secondaryActionLabel="Secondary Action"
        onClose={closeHandler}
		showCloseIcon={true}
		>
        <Text overflow="break-word">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
    </Modal>
</>
```

#### Custom footer
```jsx
import { useState } from 'react';
import { Button, Checkbox, Text } from '@zextras/carbonio-design-system';

const [open, setOpen] = useState(false);
const clickHandler = () => setOpen(true);
const closeHandler = () => setOpen(false);

<>
    <Button label="Trigger Modal" onClick={clickHandler}/>
    <Modal
        title="Title_bold_dark"
        open={open}
        customFooter={<Button label={"I'm a custom footer"} onClick={closeHandler} />}
        showCloseIcon={true}
        onClose={closeHandler}
    >
        <Text overflow="break-word">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
    </Modal>
</>
```

#### Nested Modal (Never use)
```jsx
import { useState } from 'react';
import { Button, Text } from '@zextras/carbonio-design-system';

const [open1, setOpen1] = useState(false);
const [open2, setOpen2] = useState(false);
const clickHandler1 = () => setOpen1(true);
const clickHandler2 = () => setOpen2(true);
const closeHandler1 = () => setOpen1(false);
const closeHandler2 = () => setOpen2(false);

<>
    <Button label="Trigger Modal" onClick={clickHandler1}/>
    <Modal size="medium" title="Modal 1" open={open1} confirmLabel="Open 2nd Modal" onConfirm={clickHandler2} onClose={closeHandler1}>
        <Text overflow="break-word">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
    </Modal>
    <Modal title="Modal 2" open={open2} onClose={closeHandler2}>
        <Text overflow="break-word">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
    </Modal>
</>
```


#### Modal with Custom Title Component
```jsx
import { useState } from 'react';
import { Button, Checkbox, Text ,Icon,Container} from '@zextras/carbonio-design-system';

const [open, setOpen] = useState(false);

const clickHandler = () => setOpen(true);                           
const closeHandler = () => setOpen(false);


const TitleComponent = <Container background="gray5" orientation="horizontal">
                          <Icon icon="Award" color="secondary" size="medium"/>   
                          <Text color="primary" weight="bold">Title</Text>                        
                       </Container> ;
                          

<>
    <Button label="Trigger Modal" onClick={clickHandler}/>  
    
    <Modal
        title={TitleComponent}
        open={open}
        onConfirm={closeHandler}
        onClose={closeHandler}
    >
      <Text overflow="break-word">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
    </Modal>
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
    status: 2,
    notes: 'Needs more explanations for the various examples'
},{
    feature: 'Examples',
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
},
];

<StatusTable items={items} />

```