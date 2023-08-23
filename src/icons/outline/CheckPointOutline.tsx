import * as React from 'react';
import type { SVGProps } from 'react';

const SvgCheckPointOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path
			fillRule="evenodd"
			d="M21.723 2.285a1 1 0 0 0-1.415 0l-9.164 9.164a1 1 0 0 0 1.415 1.414L21.723 3.7a1 1 0 0 0 0-1.414Z"
			clipRule="evenodd"
		/>
		<path d="M16.956 11.285c.034.233.052.472.052.714 0 2.743-2.257 5-5 5s-5-2.257-5-5 2.257-5 5-5c.24 0 .475.017.706.05l-2.691 2.692.008.009a2.997 2.997 0 0 0-1.023 2.249c0 1.646 1.354 3 3 3 .85 0 1.62-.36 2.169-.936v.001l2.78-2.779Z" />
		<path d="M20.847 7.38a9.883 9.883 0 0 1 1.145 4.621c0 5.486-4.514 10-10 10s-10-4.514-10-10 4.514-10 10-10c1.66 0 3.231.413 4.615 1.142L15.11 4.64A7.897 7.897 0 0 0 11.992 4c-4.389 0-8 3.611-8 8 0 4.389 3.612 8 8 8 4.389 0 8-3.611 8-8 0-1.106-.229-2.162-.642-3.123l1.497-1.498Z" />
	</svg>
);
export default SvgCheckPointOutline;
