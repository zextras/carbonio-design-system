import * as React from 'react';
import type { SVGProps } from 'react';

const SvgTag = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path
			fillRule="evenodd"
			d="M14.613 3.21a1.3 1.3 0 0 0-.211.018c-.429.011-.854.18-1.18.507l-9.505 9.504a1.733 1.733 0 0 0 0 2.45l4.57 4.57a1.733 1.733 0 0 0 2.45 0l9.505-9.504c.326-.327.495-.752.506-1.18q.018-.105.018-.212V4.465c0-.692-.562-1.255-1.255-1.255zm1.854 3.316a.984.984 0 1 0 .001 1.968.984.984 0 0 0 0-1.968"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgTag;
