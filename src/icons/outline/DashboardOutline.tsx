import * as React from 'react';
import type { SVGProps } from 'react';

const SvgDashboardOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
		<path d="M16.7 10.25a1 1 0 0 0-1.414 0l-4.142 4.143a1 1 0 0 0 1.415 1.414l4.142-4.142a1 1 0 0 0 0-1.414M14.247 9.195a.995.995 0 1 1-1.99 0 .995.995 0 0 1 1.99 0M17.026 14.795a.995.995 0 1 0 0-1.99.995.995 0 0 0 0 1.99M7.966 13.997a.995.995 0 1 1-1.99 0 .995.995 0 0 1 1.99 0M10.253 10.31a.995.995 0 1 0 0-1.99.995.995 0 0 0 0 1.99M8.833 11.184a.995.995 0 1 1-1.99 0 .995.995 0 0 1 1.99 0" />
		<path
			fillRule="evenodd"
			d="M4.057 20.016a9.94 9.94 0 0 1-2.041-6.047c0-5.51 4.473-9.985 9.984-9.985 5.51 0 9.984 4.474 9.984 9.985 0 2.272-.76 4.368-2.04 6.047zm1.052-1.953a7.97 7.97 0 0 1-1.125-4.094A8.02 8.02 0 0 1 12 5.953a8.02 8.02 0 0 1 6.891 12.11z"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgDashboardOutline;
