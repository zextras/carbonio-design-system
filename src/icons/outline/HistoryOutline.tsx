import * as React from 'react';
import type { SVGProps } from 'react';

const SvgHistoryOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M3.697 13.417c.52-.162 1.082.13 1.248.65a7.15 7.15 0 0 0 6.864 4.914c3.883.044 7.118-3.11 7.173-6.993-.055-3.883-3.29-7.037-7.173-6.993a7.26 7.26 0 0 0-4.646 1.668l2.168-.36q.081-.012.162-.013a1.003 1.003 0 0 1 .158 1.992l-4.236.7h-.17q-.175-.002-.34-.06a.3.3 0 0 1-.1-.06.8.8 0 0 1-.2-.11l-.09-.11c0-.05-.09-.09-.13-.15s0-.1-.049-.14a1.4 1.4 0 0 1-.07-.18l-.75-3.996a1.017 1.017 0 0 1 1.999-.38l.27 1.449a9.2 9.2 0 0 1 6.024-2.248c4.98-.044 9.116 4.012 9.17 8.991-.054 4.98-4.19 9.036-9.17 8.992a9.13 9.13 0 0 1-8.812-6.314 1 1 0 0 1 .7-1.25" />
	</svg>
);
export default SvgHistoryOutline;
