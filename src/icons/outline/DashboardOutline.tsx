import * as React from 'react';
import { SVGProps } from 'react';

const SvgDashboardOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M16.7 10.25a1 1 0 0 0-1.414 0l-4.142 4.143a1 1 0 0 0 1.415 1.414l4.142-4.142a1 1 0 0 0 0-1.414ZM14.247 9.195a.995.995 0 1 1-1.99 0 .995.995 0 0 1 1.99 0ZM17.026 14.795a.995.995 0 1 0 0-1.99.995.995 0 0 0 0 1.99ZM7.966 13.997a.995.995 0 1 1-1.99 0 .995.995 0 0 1 1.99 0ZM10.253 10.31a.995.995 0 1 0 0-1.99.995.995 0 0 0 0 1.99ZM8.833 11.184a.995.995 0 1 1-1.99 0 .995.995 0 0 1 1.99 0Z" />
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M4.057 20.016a9.938 9.938 0 0 1-2.041-6.047c0-5.51 4.473-9.985 9.984-9.985 5.51 0 9.984 4.474 9.984 9.985 0 2.272-.76 4.368-2.04 6.047H4.056Zm1.052-1.953a7.973 7.973 0 0 1-1.125-4.094A8.02 8.02 0 0 1 12 5.953a8.02 8.02 0 0 1 6.891 12.11H5.109Z"
		/>
	</svg>
);
export default SvgDashboardOutline;
