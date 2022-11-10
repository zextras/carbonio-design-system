import * as React from 'react';
import { SVGProps } from 'react';

const SvgZaListOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M17.704 6.29a1 1 0 0 0-.32-.21.999.999 0 0 0-.39-.08h-.1a.819.819 0 0 0-.46.17.995.995 0 0 0-.13.09l-3 2.86a1.001 1.001 0 0 0 1.38 1.45l1.31-1.23V17c0 .549.451 1 1 1 .549 0 1-.451 1-1V9.41l1.29 1.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-3-3Z" />
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M10.977 12a1 1 0 0 0-1-1h-5.98a1 1 0 0 0 0 2h5.98a1 1 0 0 0 1-1ZM10.977 17a1 1 0 0 0-1-1h-5.98a1 1 0 0 0 0 2h5.98a1 1 0 0 0 1-1ZM10.977 7a1 1 0 0 0-1-1h-5.98a1 1 0 0 0 0 2h5.98a1 1 0 0 0 1-1Z"
		/>
	</svg>
);

export default SvgZaListOutline;
