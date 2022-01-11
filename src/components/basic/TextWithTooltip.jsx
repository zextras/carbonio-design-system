/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Theme } from '../../theme/theme';
import Tooltip from '../display/Tooltip';
import Text from './Text';

const TextWithTooltip = React.forwardRef(function TextFn({ children, ...rest }, ref) {
	return (
		<Tooltip label={children} overflowTooltip>
			<Text ref={ref} {...rest}>
				{children}
			</Text>
		</Tooltip>
	);
});

TextWithTooltip.propTypes = {
	/** Text color */
	color: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf(Object.keys(Theme.palette))]),
	/** Text size */
	size: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf(Object.keys(Theme.sizes.font))]),
	/** Text weight */
	weight: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf(Object.keys(Theme.fonts.weight))]),
	/** Overflow handling */
	overflow: PropTypes.oneOf(['ellipsis', 'break-word']),
	disabled: PropTypes.bool
};

export default TextWithTooltip;
