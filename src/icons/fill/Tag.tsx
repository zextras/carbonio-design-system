import * as React from 'react';
import { SVGProps } from 'react';

const SvgTag = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M14.613 3.21a1.26 1.26 0 0 0-.211.018c-.429.011-.854.18-1.18.507l-9.505 9.504a1.733 1.733 0 0 0 0 2.45l4.57 4.57a1.733 1.733 0 0 0 2.45 0l9.505-9.505c.326-.326.495-.751.506-1.18.012-.068.018-.139.018-.211V4.465c0-.692-.563-1.255-1.255-1.255h-4.898Zm1.854 3.316a.984.984 0 1 0 .001 1.968.984.984 0 0 0 0-1.968Z"
		/>
	</svg>
);
export default SvgTag;
