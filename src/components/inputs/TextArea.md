TextArea is an HTML textarea element with some styled applied to make it totally similar to the Input component,
but with the prerogative of the multiline.
All attributes of the HTML textarea are available as props for the TextArea component.

Through the maxHeight prop is possible to set the height limit, beyond which the scroll is activated.

### UI Kit
[TextArea Figma UI kit](https://www.figma.com/file/crORWeAU5S8Xugs4OmqPEV/UI-kit?node-id=1242%3A24185&t=MoazwV8SjJJTJ9qG-4)

### Examples
#### Default
```jsx
  <TextArea />
```

#### With label and description
```jsx
  import { faker } from '@faker-js/faker';
  import { Container } from '@zextras/carbonio-design-system';

  const loremIpsum = faker.lorem.paragraphs(4);
  <Container gap={'0.5rem'} crossAlignment={'flex-start'}>
    <TextArea label={'Label for the textarea'} />
    <TextArea description={'Description to describe what is this textarea meant for'} />
    <TextArea label={'Label for the textarea'} description={'Description to describe what is this textarea meant for'} defaultValue={loremIpsum} />
  </Container>
```

#### Uncontrolled
```jsx
  import { useRef } from 'react';
  import { Container } from '@zextras/carbonio-design-system';

  const printContentPRef = useRef(null);

  const onInput = (event) => {
    if (printContentPRef.current) {
        printContentPRef.current.textContent = event.currentTarget.value;
    }
  };

  <Container gap={'0.5rem'} crossAlignment={'flex-start'}>
    <TextArea
        label={'Label for the textarea'}
        description={'Description to describe what is this textarea meant for'}
        defaultValue={'Default value for the text area'}
        onInput={onInput}
    />
    <p ref={printContentPRef} style={{ border: '1px solid gray', width: '100%', minHeight: '1.5rem' }}>Type something</p>
  </Container>
```

#### Controlled
```jsx
  import { useState } from 'react';
  import { Button, Container } from '@zextras/carbonio-design-system';

  const [textAreaValue, setTextAreaValue] = useState('');

  const onChange = (event) => {
      setTextAreaValue(event.currentTarget.value);
  };
	
  const veryLongText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis aliquet ex, ac pellentesque velit. Nunc sed cursus odio. Nam viverra et mauris at maximus. Mauris imperdiet neque nec dolor pretium, elementum posuere ipsum egestas. Maecenas ut sagittis quam. Sed volutpat commodo orci vitae fringilla. Vivamus sapien nisi, viverra non consequat nec, venenatis vitae orci. Nulla sed nisl ut nunc euismod egestas. Maecenas vehicula accumsan nunc quis imperdiet. Pellentesque ut dolor luctus, sodales dolor at, laoreet libero. Quisque vulputate, diam sit amet eleifend malesuada, eros dolor porttitor turpis, ac consectetur augue elit vitae ante. Mauris eget magna quis lacus imperdiet sagittis ut eu est. Sed ligula arcu, maximus vel dictum vel, scelerisque ac eros. Pellentesque eu accumsan nulla. Pellentesque magna justo, laoreet nec ligula vel, varius imperdiet lorem. Nulla facilisi. Vestibulum molestie rutrum justo, sit amet feugiat ex iaculis id. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae iaculis ex. Proin fermentum augue sit amet tincidunt elementum.';

  const setValueFromButton = () => {
    setTextAreaValue(veryLongText)
  }

  <Container gap={'0.5rem'} crossAlignment={'flex-start'}>
    <TextArea
        label={'Label for the textarea'}
        description={'Description to describe what is this textarea meant for'}
        value={textAreaValue}
        onChange={onChange}
    />
    <p style={{ border: '1px solid gray', width: '100%', minHeight: '1.5rem' }}>{textAreaValue || 'Type something'}</p>
    <Button label={'Set value of TextArea'} onClick={setValueFromButton} />
  </Container>
```

#### Disabled
```jsx
  import { faker } from '@faker-js/faker';
  import { Container, Text } from '@zextras/carbonio-design-system';

  const loremIpsum = faker.lorem.paragraphs(4);
  
  <Container gap={'0.5rem'} crossAlignment={'flex-start'}>
    <Text weight={'bold'}>Without value</Text>
    <TextArea
        label={'Label for the textarea'}
        description={'Description to describe what is this textarea meant for'}
        disabled
    />
    <Text weight={'bold'}>With default value</Text>
    <TextArea
        label={'Label for the textarea'}
        description={'Description to describe what is this textarea meant for'}
        defaultValue={loremIpsum}
        disabled
    />
    <Text weight={'bold'}>With value</Text>
    <TextArea
        label={'Label for the textarea'}
        description={'Description to describe what is this textarea meant for'}
        value={loremIpsum}
        disabled
    />
  </Container>
```

#### With error
```jsx
  import { Container, Text } from '@zextras/carbonio-design-system';
  
  <Container gap={'0.5rem'} crossAlignment={'flex-start'}>
    <TextArea hasError />
    <TextArea
        label={'Label for the textarea'}
        description={'Description to describe what is this textarea meant for'}
        hasError
    />
    <TextArea
        label={'Label for the textarea'}
        description={'Description to describe what is this textarea meant for'}
        defaultValue={'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of '}
        hasError
    />
    <TextArea
        label={'Label for the textarea'}
        description={'Description to describe what is this textarea meant for'}
        defaultValue={'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of '}
        hasError
        disabled
    />
  </Container>
```
