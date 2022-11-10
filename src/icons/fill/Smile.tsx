import * as React from 'react';
import { SVGProps } from 'react';

const SvgSmile = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M11.988 1.998c-5.48 0-9.99 4.51-9.99 9.99s4.51 9.99 9.99 9.99 9.99-4.51 9.99-9.99-4.51-9.99-9.99-9.99Zm1.954 11.944a.984.984 0 0 1 1.39 1.39 4.732 4.732 0 0 1-6.688 0 .984.984 0 0 1 1.39-1.39 2.764 2.764 0 0 0 3.908 0Zm-4.014-4.95a.984.984 0 1 1-.001 1.967.984.984 0 0 1 0-1.968Zm4.044 0a.984.984 0 1 1 0 1.967.984.984 0 0 1 0-1.968Z" />
	</svg>
);

export default SvgSmile;
