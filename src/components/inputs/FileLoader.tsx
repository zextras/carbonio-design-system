/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useRef, useCallback } from 'react';

import styled from 'styled-components';

import { Button, ButtonProps } from '../basic/button/Button';

const FileInput = styled.input`
	display: none;
`;

type FileLoaderProps = ButtonProps & {
	onChange?: (event: React.ChangeEvent<HTMLInputElement>, files: FileList | null) => void;
	/** icon name */
	icon?: ButtonProps['icon'];
	/** accept multiple files */
	multiple?: boolean;
	/** capture mode (see <input type="file"> docs) */
	capture?: string;
	/** Accept attribute of input element */
	accept?: string;
};

const FileLoader = React.forwardRef<HTMLDivElement, FileLoaderProps>(function FileLoaderFn(
	{ icon = 'Attach', onChange = (): void => undefined, multiple = false, accept, ...rest },
	ref
) {
	const inputRef = useRef<HTMLInputElement>(null);

	const onClick = useCallback(() => {
		if (inputRef.current) {
			inputRef.current.value = '';
			inputRef.current.click();
		}
	}, [inputRef]);

	const changeHandler = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
		(ev) => onChange(ev, inputRef.current?.files || null),
		[onChange]
	);

	return (
		<>
			<FileInput
				type="file"
				ref={inputRef}
				onChange={changeHandler}
				multiple={multiple}
				accept={accept}
			/>
			<Button ref={ref} icon={icon} {...rest} onClick={onClick} />
		</>
	);
});

export { FileLoader, FileLoaderProps };
