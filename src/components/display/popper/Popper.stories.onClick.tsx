import React, { useRef, useState } from 'react';
import { Button } from '../../basic/button/Button';
import { Popper } from './Popper';
import { Text } from '../../basic/text/Text';
import { Container } from '../../layout/container/Container';

export const PopperOnClick = (): React.JSX.Element => {
	const [open, setOpen] = useState(false);
	const buttonRef = useRef(null);

	return (
		<Container>
			<Button ref={buttonRef} label="Click me!" onClick={() => setOpen(true)} />
			<Popper open={open} anchorEl={buttonRef} placement="right" onClose={() => setOpen(false)}>
				<Text>This is the content of the Popper</Text>
			</Popper>
		</Container>
	);
};
