import * as React from 'react';
import type { SVGProps } from 'react';

const SvgTagOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path
			fillRule="evenodd"
			d="M14.613 3.21a1.3 1.3 0 0 0-.211.018c-.429.011-.854.18-1.18.507l-9.505 9.504a1.733 1.733 0 0 0 0 2.45l4.57 4.57a1.733 1.733 0 0 0 2.45 0l9.505-9.504c.326-.327.495-.752.506-1.18q.018-.105.018-.212V4.465c0-.692-.562-1.255-1.255-1.255zm.043 1.967H18.8V9.32l-.008.064-.003.043-9.276 9.275-4.238-4.238 9.275-9.276.043-.002z"
			clipRule="evenodd"
		/>
		<path d="M16.467 8.492a.983.983 0 1 0 0-1.966.983.983 0 0 0 0 1.966" />
	</svg>
);
export default SvgTagOutline;
