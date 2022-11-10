import * as React from 'react';
import { SVGProps } from 'react';

const SvgTeam = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M11.988 2.014a9.972 9.972 0 0 0-9.974 9.974 9.972 9.972 0 0 0 11.614 9.838l6.258-1.247c.585-.107.631-.442.7-.746l1.24-6.199a9.972 9.972 0 0 0-9.837-11.62Zm1.827 9.974a1.827 1.827 0 1 1-3.655-.001 1.827 1.827 0 0 1 3.655.001Zm-4.636 0a1.546 1.546 0 1 1-3.093-.001 1.546 1.546 0 0 1 3.093.001Zm8.148 0a1.265 1.265 0 1 1-2.53-.001 1.265 1.265 0 0 1 2.53.001Z" />
	</svg>
);

export default SvgTeam;
