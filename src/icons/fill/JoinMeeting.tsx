import * as React from 'react';
import type { SVGProps } from 'react';

const SvgJoinMeeting = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
		<g clipPath="url(#a)">
			<path
				fillRule="evenodd"
				d="M20.03 7.022a1.7 1.7 0 0 1 .97.128 1.6 1.6 0 0 1 1.01 1.48v6.74a1.6 1.6 0 0 1-1 1.48c-.217.098-.452.15-.69.15a1.74 1.74 0 0 1-1.16-.45l-2.16-2V16a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v1.45l2.15-2a1.7 1.7 0 0 1 .88-.428m-9.952 4.5h2.419a.403.403 0 0 1 0 .806h-2.419v2.419a.403.403 0 1 1-.806 0v-2.419H6.853a.403.403 0 0 1 0-.806h2.419V9.103a.403.403 0 0 1 .806 0z"
				clipRule="evenodd"
			/>
		</g>
		<defs>
			<clipPath id="a">
				<path fill="#fff" d="M0 0h24v24H0z" />
			</clipPath>
		</defs>
	</svg>
);
export default SvgJoinMeeting;
