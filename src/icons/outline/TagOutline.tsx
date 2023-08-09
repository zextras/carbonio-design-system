import * as React from 'react';
import { SVGProps } from 'react';

const SvgTagOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M14.613 3.21a1.26 1.26 0 0 0-.211.018c-.429.011-.854.18-1.18.507l-9.505 9.504a1.733 1.733 0 0 0 0 2.45l4.57 4.57a1.733 1.733 0 0 0 2.45 0l9.505-9.505c.326-.326.495-.751.506-1.18.012-.068.018-.139.018-.211V4.465c0-.692-.563-1.255-1.255-1.255h-4.898Zm.043 1.967H18.8V9.32l-.008.064-.003.043-9.276 9.275-4.238-4.238 9.275-9.276.043-.002.064-.009Z"
		/>
		<path d="M16.467 8.492a.983.983 0 1 0 0-1.966.983.983 0 0 0 0 1.966Z" />
	</svg>
);
export default SvgTagOutline;
