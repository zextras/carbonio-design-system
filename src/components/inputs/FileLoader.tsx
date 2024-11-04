/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useRef, useCallback, useMemo } from 'react';

import styled from 'styled-components';

import { AnyColor } from '../../types/utils';
import { Button, ButtonProps } from '../basic/button/Button';

const FileInput = styled.input`
	display: none;
`;

type FileLoaderProps = Omit<ButtonProps, 'onClick' | 'secondaryAction'> & {
	onChange?: (event: React.ChangeEvent<HTMLInputElement>, files: FileList | null) => void;
	/** accept multiple files */
	multiple?: boolean;
	/** capture mode (see <input type="file"> docs) */
	capture?: string;
	/** Accept attribute of input element */
	accept?: string;
};

const FileLoader = React.forwardRef<HTMLDivElement, FileLoaderProps>(function FileLoaderFn(
	{
		icon = 'Attach',
		onChange = (): void => undefined,
		multiple = false,
		accept,
		type = 'ghost',
		color = 'text',
		labelColor,
		backgroundColor,
		...rest
	},
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

	const colorsAndType = useMemo<
		| { type: 'default' | 'outlined'; labelColor?: AnyColor; backgroundColor?: AnyColor }
		| { type: 'ghost'; color: AnyColor }
	>(() => {
		if (type === 'ghost') {
			return { type, color: color ?? labelColor };
		}
		if (type === 'outlined') {
			return {
				type,
				labelColor: color ?? labelColor,
				backgroundColor
			};
		}
		return {
			type,
			labelColor,
			backgroundColor: color ?? backgroundColor
		};
	}, [backgroundColor, color, labelColor, type]);

	return (
		<>
			<FileInput
				type="file"
				ref={inputRef}
				onChange={changeHandler}
				multiple={multiple}
				accept={accept}
			/>
			<Button ref={ref} icon={icon} {...colorsAndType} {...rest} onClick={onClick} />
		</>
	);
});

export { FileLoader, FileLoaderProps };
