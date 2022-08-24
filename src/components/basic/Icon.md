<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

```jsx
import { Container, Padding, Text } from '@zextras/carbonio-design-system';

<Container orientation="horizontal" mainAlignment="space-around">
    <Icon icon="Activity" size="small"/>
    <Icon icon="Activity" size="medium"/>
    <Icon icon="Activity" size="large"/>
</Container>
```

### Colors
#### Theme palette
```jsx
import { Container } from '@zextras/carbonio-design-system';

<Container orientation="horizontal" mainAlignment="space-around">
    <Icon icon="Award" color="primary" />
    <Icon icon="Award" color="secondary" />
    <Container height="fit" width="fit" background="gray0">
        <Icon icon="Award" color="gray6" />
    </Container>
    <Container height="fit" width="fit" background="gray0">
        <Icon icon="Award" color="warning" />
    </Container>
    <Icon icon="Award" color="text" />
    <Icon icon="Award" color="success" />
    <Icon icon="Award" color="error" />
</Container>
```
#### Custom colors
Custom colors can be passed through _color_ prop
```jsx
import { Container } from '@zextras/carbonio-design-system';

<Container orientation="horizontal" mainAlignment="space-around">
    <Icon icon="Activity" color="orange" />
    <Icon icon="Activity" color="#73457A" />
    <Icon icon="Activity" color="rgba(100, 50, 50, 0.7)" />
</Container>
```

#### With variants
```jsx
import { Container } from '@zextras/carbonio-design-system';

<Container orientation="horizontal" mainAlignment="space-around">
    <Icon icon="Activity" color="orange" disabled />
    <Icon icon="Activity" color="#abcdef.focus" />
    <Icon icon="Activity" color="#73457A.active" />
    <Icon icon="Activity" color="rgba(100, 50, 50, 0.7).hover" />
    <Icon icon="Activity" color="primary.disabled" />
</Container>
```

### Custom Icons
```jsx
import { Container } from '@zextras/carbonio-design-system';

function BackUpLogo(props) {
    return (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path fillRule="evenodd" clipRule="evenodd" d="M24 0C37.246 0 48 10.754 48 24C48 37.246 37.246 48 24 48C10.754 48 0 37.246 0 24C0 10.754 10.754 0 24 0ZM24 4.73239C34.6343 4.73239 43.2676 13.3657 43.2676 24C43.2676 34.6343 34.6343 43.2676 24 43.2676C13.3657 43.2676 4.73239 34.6343 4.73239 24C4.73239 13.3657 13.3657 4.73239 24 4.73239Z" fill="currentColor" />
            <path fillRule="evenodd" clipRule="evenodd" d="M25.3595 33.8898C25.7971 35.5109 24.8356 37.1823 23.2144 37.6194C21.5933 38.0565 19.9224 37.0954 19.4849 35.4743C19.0478 33.8532 20.0093 32.1818 21.6304 31.7447C23.2515 31.3076 24.9224 32.2687 25.3595 33.8898Z" fill="currentColor" />
            <path fillRule="evenodd" clipRule="evenodd" d="M18.349 28.7354C18.8833 30.7171 17.7087 32.7593 15.7275 33.2936C13.7458 33.8279 11.7035 32.6532 11.1692 30.672C10.635 28.6903 11.8096 26.6481 13.7908 26.1138C15.7725 25.5791 17.8148 26.7542 18.349 28.7354Z" fill="currentColor" />
            <path fillRule="evenodd" clipRule="evenodd" d="M19.2279 18.1416C19.8594 20.4834 18.4711 22.897 16.1294 23.5285C13.7876 24.16 11.374 22.7717 10.7425 20.4299C10.111 18.0886 11.4993 15.6745 13.8411 15.0431C16.1824 14.4116 18.5965 15.7999 19.2279 18.1416Z" fill="currentColor" />
            <path fillRule="evenodd" clipRule="evenodd" d="M27.0689 31.8751C30.2177 30.6455 32.4506 27.5816 32.4506 24C32.4506 19.3361 28.6637 15.5493 23.9999 15.5493C22.9036 15.5493 21.8562 15.7582 20.8956 16.1385C20.0656 14.5845 18.6412 13.3953 16.9266 12.8755C18.9712 11.5723 21.398 10.8169 23.9999 10.8169C31.2759 10.8169 37.183 16.7239 37.183 24C37.183 30.0812 33.0567 35.2061 27.4534 36.7253C27.7102 36.0943 27.8515 35.4051 27.8515 34.6826C27.8515 33.6554 27.5656 32.6943 27.0689 31.8751Z" fill="currentColor" />
        </svg>
    );
}

<Container orientation="horizontal" mainAlignment="space-around">
    <Icon icon={BackUpLogo} size="small" color="primary" />
    <Icon icon={BackUpLogo} size="medium" color="secondary" />
    <Icon icon={BackUpLogo} size="large" color="error" />
</Container>
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
