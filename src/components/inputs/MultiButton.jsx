/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';
import PropTypes from 'prop-types';
import Container from '../layout/Container';
import IconButton from './IconButton';
import Button from '../basic/Button';
import Dropdown from '../display/Dropdown';
import { Theme } from '../../theme/theme';

const MultiButton = React.forwardRef(function MultiButtonFn(
	{ background, color, label, disabledPrimary, disabledSecondary, icon, items, onClick, ...rest },
	ref
) {
	return (
		<Container
			background={background}
			ref={ref}
			orientation="horizontal"
			width="fit"
			height="fit"
			// style={{ cursor: disabled ? 'default' : 'pointer' }}
			crossAlignment="center"
			{...rest}
		>
			<Button
				backgroundColor={background}
				label={label}
				labelColor={color}
				onClick={onClick}
				disabled={disabledPrimary}
			/>
			<Dropdown items={items} placement="bottom-end" disabled={disabledSecondary}>
				<IconButton
					icon={icon}
					iconColor={color}
					backgroundColor={background}
					size="medium"
					disabled={disabledSecondary}
					// eslint-disable-next-line @typescript-eslint/no-empty-function
					onClick={() => {}}
					style={{ padding: `${Theme.sizes.padding.extrasmall}` }}
				/>
			</Dropdown>
		</Container>
	);
});

MultiButton.propTypes = {
	/** MultiButton text */
	label: PropTypes.string,
	/** whether to disable the Primary Button or not */
	disabledPrimary: PropTypes.bool,
	/** whether to disable the Secondary Dropdown or not */
	disabledSecondary: PropTypes.bool,
	/** MultiButton icon */
	icon: PropTypes.string.isRequired,
	/** Color of the Button label */
	color: PropTypes.string,
	/** Color of the Button background */
	background: PropTypes.string
};

MultiButton.defaultProps = {
	disabledPrimary: false,
	disabledSecondary: false,
	label: undefined,
	value: undefined,
	icon: 'ChevronDownOutline',
	background: 'primary',
	color: 'gray6'
};

export default MultiButton;
