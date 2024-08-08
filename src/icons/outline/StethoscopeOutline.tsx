import * as React from 'react';
import type { SVGProps } from 'react';

const SvgStethoscopeOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M16.995 8.902V4.976h-.758a1.967 1.967 0 1 1 0-1.99h1.753c.55 0 .995.445.995.994v5.058q0 .048-.004.094c-.043 3.424-2.597 6.345-5.994 6.835v2.382a1.967 1.967 0 1 1-1.998 0v-2.382C7.567 15.473 5 12.51 4.995 9.054q0-.046.004-.088V3.98c0-.55.445-.996.995-.996h1.753a1.967 1.967 0 1 1 0 1.99H6.99v3.99q.004.044.004.089c0 2.74 2.255 4.995 4.995 4.995s4.995-2.255 4.995-4.995a1 1 0 0 1 .012-.152" />
	</svg>
);
export default SvgStethoscopeOutline;
