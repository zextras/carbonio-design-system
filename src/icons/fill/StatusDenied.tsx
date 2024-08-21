import * as React from 'react';
import type { SVGProps } from 'react';

const SvgStatusDenied = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M15 4v-.999c0-.549.451-1 1-1s1 .451 1 1v1h1c1.646 0 3 1.354 3 3v12c0 1.646-1.354 3-3 3H6c-1.646 0-3-1.354-3-3v-12c0-1.646 1.354-3 3-3h1V3a1.006 1.006 0 0 1 .751-.968.99.99 0 0 1 .946.254C8.888 2.474 9 2.733 9 3v1zm-.29 6.291a1 1 0 0 0-1.42 0l-1.29 1.3-1.29-1.3a1.004 1.004 0 0 0-1.42 1.42l1.3 1.29-1.3 1.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l1.29-1.3 1.29 1.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-1.3-1.29 1.3-1.29a1 1 0 0 0 0-1.42" />
	</svg>
);
export default SvgStatusDenied;
