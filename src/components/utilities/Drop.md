<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

```js
import styled from 'styled-components';
import { Drag, Container, Button, Drop, Padding, Icon, Text, Badge } from '@zextras/zapp-ui';

const BackDropLayout = styled(Container)`
	width: 100%;
	position: absolute;
	height: 100%;
	z-index: 2;
	top: 0px;
	left: 0px;
`;
const DropBackground = styled(Container)`
	background: ${(props) => props.theme.palette.primary.regular}b9;
	pointer-events: none;
`;
const DropBackgroundGray = styled(Container)`
	background: ${(props) => props.theme.palette.gray1.regular}b9;
	pointer-events: none;
`;
const BackDropLayoutInnerBox = styled(Container)`
	background: ${(props) => props.theme.palette.gray6.regular};
	border-radius: 10px;
	min-height: 180px;
	max-width: 380px;
	max-height: 210px;
`;

const BackDropLayoutContentBox = styled(Container)`
	border-style: dashed;
	border-width: 2px;
	border-radius: 5px;
	border-color: ${(props) => props.theme.palette.primary.regular};
	box-sizing: border-box;
	padding: 40px;
`;

const DropBoxIconGroup = styled(Container)`
	margin-bottom: 8px;
	height: 40px;
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
									<Icon icon="ImageOutline" height="35px" width="35px" color="primary"></Icon>
								</Padding>
								<Padding right="small" left="small">
									<Icon icon="FileAddOutline" height="35px" width="35px" color="primary"></Icon>
								</Padding>
								<Padding right="small" left="small">
									<Icon icon="FilmOutline" height="35px" width="35px" color="primary"></Icon>
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
			//acceptStyle={{ border: '2px solid rgba(43, 115, 210, 0,4)' }}
			//rejectStyle={{ border: '2px solid red' }}
			overlayAcceptComponent={overlayComponent}
			overlayDenyComponent={overlayDenyComponent}
			onDragEnter={(data) => {
				if (data.data.id != 5) {
					return { success: false };
				}
			}}
		>
			<Container background="#cacaca" height="300px" width="100%">
				{' '}
			</Container>
		</Drop>
	</Container>
</>
```
