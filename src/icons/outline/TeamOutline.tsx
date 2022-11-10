import * as React from 'react';
import { SVGProps } from 'react';

const SvgTeamOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M11.988 2.014a9.972 9.972 0 0 0-9.974 9.974 9.972 9.972 0 0 0 11.614 9.838l6.258-1.247c.444-.114.592-.161.7-.746l1.24-6.199a9.972 9.972 0 0 0-9.837-11.62Zm0 1.967a8.011 8.011 0 0 1 8.008 8.007 8.011 8.011 0 0 1-8.008 8.008 8.011 8.011 0 0 1-8.007-8.008 8.011 8.011 0 0 1 8.007-8.007Z" />
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M17.327 11.988a1.265 1.265 0 1 1-2.53-.001 1.265 1.265 0 0 1 2.53.001ZM9.179 11.988a1.546 1.546 0 1 1-3.093-.001 1.546 1.546 0 0 1 3.093.001ZM13.815 11.988a1.827 1.827 0 1 1-3.655-.001 1.827 1.827 0 0 1 3.655.001Z"
		/>
	</svg>
);

export default SvgTeamOutline;
