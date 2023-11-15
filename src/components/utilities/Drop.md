<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

Drop is designed to work together with Drag component.

You can control whether a drop is allowed in two ways:

1. by setting the acceptType array (required)
2. by controlling the returned value of the onDragEnter callback (optional)

### Accepting/Rejecting a drop

To make the Drop component accept the drop event,
the type of the drag set in `window.draggedItem.type` must be included in the provided `acceptType` list.

If you need to perform additional checks on the dragged item,
to conditionally accept or reject the drop based on the data,
or some other external condition, the onDragEvent callback can be used.
This callback receives as argument an object with the event and the `draggedItem` info (`type` and `data`).
```ts static
type DragObj = {
	event: React.DragEvent;
	data?: Record<string, unknown>;
	type?: string;
};
```
To make the Drop accept the drop event, this callback can either return nothing (`void`/`undefined`),
or an object with the success field set to true.
To reject the drop, the callback must return the success field set to false.
```tsx static
const dragEnterHandler = (data: DragData): { success: boolean } | undefined => {
  // check data based on your need
  let dropIsValid = doYourStuff(data);
  if (dropIsValid) {
    return { success: true }; // or return undefined; it is equivalent
  }
  return { success: false };
}

<Drop acceptType={['acceptedType']} onDragEnter={dragEnterHandler}>
  {/* your component here */}
</Drop>
```


```jsx
import styled from 'styled-components';
import { Drag, Container, Button, Drop, Padding, Icon, Text, Badge } from '@zextras/carbonio-design-system';

const BackDropLayout = styled(Container)`
	width: 70%;
	position: absolute;
	height: 70%;
	z-index: 2;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

const overlayAcceptComponent = (
	<BackDropLayout background={'primary'}>Drop is accepted and fired</BackDropLayout>
);
const overlayDenyComponent = (
	<BackDropLayout background={'gray2'}>Drop is not fired here</BackDropLayout>
);

<Container gap={'1rem'}>
    <Container gap={'1rem'} orientation={'horizontal'}>
        <Drag type="message" data={{ id: 15 }}>
            <Button label="Drag Me - Reject example" onClick={() => undefined} />
        </Drag>
        <Drag type="message" data={{ id: 5 }}>
            <Button label="Drag Me - Accept example" onClick={() => undefined} />
        </Drag>
    </Container>
    <Drop
        acceptType={['message']}
        onDrop={(data) => console.log(data)}
        overlayAcceptComponent={overlayAcceptComponent}
        overlayDenyComponent={overlayDenyComponent}
        onDragEnter={(data) => {
            if (data.data.id != 5) {
                return { success: false };
            }
        }}
    >
        <Container background="gray5" height="18.75rem" width="100%">
            <Button onClick={() => console.log('clicked nested button')} label={'Nested button'} />
        </Container>
    </Drop>
</Container>
```
