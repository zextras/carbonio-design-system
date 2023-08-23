import * as React from 'react';
import type { SVGProps } from 'react';

const SvgStatusAcceptOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M15 4v-.999c0-.549.451-1 1-1 .549 0 1 .451 1 1v1h1c1.646 0 3 1.354 3 3v12c0 1.646-1.354 3-3 3H6c-1.646 0-3-1.354-3-3v-12c0-1.646 1.354-3 3-3h1V3a1.006 1.006 0 0 1 .751-.968.991.991 0 0 1 .946.254C8.888 2.474 9 2.733 9 3v1h6Zm3 16.001c.549 0 1-.452 1-1v-12c0-.549-.451-1-1-1h-1v1c0 .549-.451 1-1 1-.549 0-1-.451-1-1V6H9v1c0 .549-.451 1-1 1-.549 0-1-.451-1-1V6H6c-.549 0-1 .451-1 1v12a1.006 1.006 0 0 0 .68.947c.104.035.211.052.32.053h12Z" />
		<path d="M14.662 10.75a1.005 1.005 0 0 0-1.41.09l-1.87 2.15-.63-.71a1.003 1.003 0 0 0-.75-.338 1.002 1.002 0 0 0-.75 1.667l1.39 1.56c.192.213.465.333.75.33a1 1 0 0 0 .74-.34l2.61-3a1.005 1.005 0 0 0-.08-1.41Z" />
	</svg>
);
export default SvgStatusAcceptOutline;
