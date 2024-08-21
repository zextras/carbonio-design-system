import * as React from 'react';
import type { SVGProps } from 'react';

const SvgCheckPointOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path
			fillRule="evenodd"
			d="M21.723 2.285a1 1 0 0 0-1.415 0l-9.164 9.164a1 1 0 0 0 1.415 1.414L21.723 3.7a1 1 0 0 0 0-1.414"
			clipRule="evenodd"
		/>
		<path d="M16.956 11.285q.051.35.052.714c0 2.743-2.257 5-5 5s-5-2.257-5-5 2.257-5 5-5q.36 0 .706.05l-2.691 2.692.008.009a3 3 0 0 0-1.023 2.249c0 1.646 1.354 3 3 3 .85 0 1.62-.36 2.169-.936v.001z" />
		<path d="M20.847 7.38a9.9 9.9 0 0 1 1.145 4.621c0 5.486-4.514 10-10 10s-10-4.514-10-10 4.514-10 10-10c1.66 0 3.231.413 4.615 1.142L15.11 4.64A7.9 7.9 0 0 0 11.992 4c-4.389 0-8 3.611-8 8s3.612 8 8 8c4.389 0 8-3.611 8-8 0-1.106-.229-2.162-.642-3.123z" />
	</svg>
);
export default SvgCheckPointOutline;
