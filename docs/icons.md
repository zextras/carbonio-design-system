<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

```jsx
import { useState, useContext } from 'react';
import { filter, map } from 'lodash';
import { default as icons } from 'carbonio-design-system-icons';
import { Icon, Container, Padding, Text, Input, SnackbarManagerContext, SnackbarManager } from '@zextras/carbonio-design-system';
import styled from 'styled-components';
const iconKeys = Object.keys(icons).sort();
const CustomIcon = styled(Icon)`
    width: 2rem;
    height: 2rem;
`;
const CustomText = styled(Text)`
    font-family: monospace !important;
    font-size: 0.625rem;
`;
const CustomContainer = styled(Container)`
    border: 0.0625rem solid #eee;
    borderWidth: 0.0625rem 0 0 0.0625rem;
    min-width: 19.9%;
    max-width: 19.9%;
    cursor: pointer;
    &:hover {
        background: ${({ theme }) => theme.palette.highlight.regular}
    }
`;

function copyToClipboard(text, createSnackbar) {
    console.log(2, createSnackbar);

    window.top.navigator.clipboard.writeText(text)
        .then(
            () => {
                createSnackbar(
                    {
                        key: 1,
                        type: 'success',
                        label: 'Copied to clipboard!',
                        autoHideTimeout: 2000
                    }
                );
            }
        );
}
function App() {
    const createSnackbar = useContext(SnackbarManagerContext);
    console.log(1, createSnackbar);
    const [filterStr, setFilter] = useState('');
    return (
        <>
            <Input label="Filter" onChange={(ev) => setFilter(ev.target.value.toLowerCase())}/>
            <Container
                orientation="horizontal"
                height="fit"
                width="fill"
                crossAlignment="center"
                style={{
                    userSelect: 'none',
                    flexWrap: 'wrap',
                    border: '0.0625rem solid #eee',
                    borderWidth: '0 0.0625rem 0.0625rem 0'
                }}
            >
                { map(
                    filter(
                      iconKeys,
                      (key) => key.toLowerCase().includes(filterStr)
                    ),
                    (key) => (
                        <CustomContainer
                            onClick={() => {
                                window.top.navigator.clipboard.writeText(key)
                                    .then(
                                        () => {
                                            createSnackbar(
                                                {
                                                    key: 1,
                                                    type: 'success',
                                                    label: 'Copied to clipboard!',
                                                    autoHideTimeout: 2000
                                                }
                                            );
                                        }
                                    );
                            }}
                            key={key}
                            orientation="vertical"
                            width="20%"
                            mainAlignment="center"
                            padding={{vertical: 'medium'}}
                        >
                            <CustomIcon color="text" size="large" icon={key} />
                            <Padding top="medium"><CustomText> {key} </CustomText></Padding>
                        </CustomContainer> 
                    )
                )}
            </Container>
        </>
    );
}

<>
    <SnackbarManager>
        <App />
    </SnackbarManager>
</>
```
