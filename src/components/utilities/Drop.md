<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

```js
import styled from 'styled-components';
import { Drag, Container, Button, Drop, Padding, Icon, Text, Badge } from '@zextras/carbonio-design-system';

const BackDropLayout = styled(Container)`
	width: 100%;
	position: absolute;
	height: 100%;
	z-index: 2;
	top: 0;
	left: 0;
`;
const DropBackground = styled(Container)`
	background: ${(props) => props.theme.palette.primary.regular};
	pointer-events: none;
`;
const DropBackgroundGray = styled(Container)`
	background: ${(props) => props.theme.palette.gray1.regular};
	pointer-events: none;
`;
const BackDropLayoutInnerBox = styled(Container)`
	background: ${(props) => props.theme.palette.gray6.regular};
	border-radius: 0.625rem;
	min-height: 11.25rem;
	max-width: 23.75rem;
	max-height: 13.125rem;
`;

const BackDropLayoutContentBox = styled(Container)`
	border-style: dashed;
	border-width: 0.125rem;
	border-radius: 0.3125rem;
	border-color: ${(props) => props.theme.palette.primary.regular};
	box-sizing: border-box;
	padding: 2.5rem;
`;

const DropBoxIconGroup = styled(Container)`
	margin-bottom: 0.5rem;
	height: 2.5rem;
`;

const DetailText = styled(Text)`
	text-align: center;
`;

const overlayComponent = (
	<BackDropLayout>
		<DropBackground>
			<BackDropLayoutInnerBox>
				<Padding all="medium">
					<BackDropLayoutContentBox>
						<Container mainAlignment="center">
							<DropBoxIconGroup mainAlignment="center" orientation="horizontal">
								<Padding right="small" left="small">
									<Icon icon="ImageOutline" height="2.1875rem" width="2.1875rem" color="primary"></Icon>
								</Padding>
								<Padding right="small" left="small">
									<Icon icon="FileAddOutline" height="2.1875rem" width="2.1875rem" color="primary"></Icon>
								</Padding>
								<Padding right="small" left="small">
									<Icon icon="FilmOutline" height="2.1875rem" width="2.1875rem" color="primary"></Icon>
								</Padding>
							</DropBoxIconGroup>
							<Container mainAlignment="center" height="auto">
								<Text size="reguler" color="primary" weight="bold">
									Title Text
								</Text>
								<Padding top="small" />
								<DetailText size="medium" weight="regular" color="primary" overflow="break-word">
									Detail Text
								</DetailText>
							</Container>
						</Container>
					</BackDropLayoutContentBox>
				</Padding>
			</BackDropLayoutInnerBox>
		</DropBackground>
	</BackDropLayout>
);
const overlayDenyComponent = (<BackDropLayout><DropBackgroundGray/></BackDropLayout>);
<>
	<Drag type="message" data={{ id: 15 }}>
		<Button label="Drag Me" />
	</Drag>
	<Padding value="extralarge"></Padding>
	<Container>
		<Drop
			acceptType={['message']}
			onDrop={(data) => console.log(data)}
			overlayAcceptComponent={overlayComponent}
			overlayDenyComponent={overlayDenyComponent}
			onDragEnter={(data) => {
				if (data.data.id != 5) {
					return { success: false };
				}
			}}
		>
			<Container background="#cacaca" height="18.75rem" width="100%">
				<Button onClick={() => console.log('clicked nested button')} label={'Nested button'} />
			</Container>
		</Drop>
	</Container>
</>
```
