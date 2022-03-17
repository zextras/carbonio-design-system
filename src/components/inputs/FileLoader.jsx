/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useRef, useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import IconButton from './IconButton';

const FileInput = styled.input`
	display: none;
`;

const FileLoader = React.forwardRef(function FileLoaderFn(
	{ icon, onChange, multiple, accept, ...rest },
	ref
) {
	const inputRef = useRef();
	const onClick = useCallback(() => {
		if (inputRef.current) {
			inputRef.current.value = null;
			inputRef.current.click();
		}
	}, [inputRef]);

	return (
		<>
			<FileInput
				type="file"
				ref={inputRef}
				onChange={(ev) => onChange(ev, inputRef.current.files)}
				multiple={multiple}
				accept={accept}
			/>
			<IconButton ref={ref} icon={icon} {...rest} onClick={onClick} />
		</>
	);
});

FileLoader.propTypes = {
	onChange: PropTypes.func,
	/** icon name */
	// TODO: update to be IconButton icon prop type
	icon: PropTypes.string,
	/** accept multiple files */
	multiple: PropTypes.bool,
	/** capture mode (see <input type="file"> docs) */
	capture: PropTypes.string,
	accept: PropTypes.string
};

FileLoader.defaultProps = {
	icon: 'Attach',
	onChange: () => undefined,
	multiple: false,
	capture: undefined,
	accept: undefined
};

export default FileLoader;
