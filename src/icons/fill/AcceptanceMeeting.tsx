import * as React from 'react';
import { SVGProps } from 'react';

const SvgAcceptanceMeeting = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M21 7.15c-.62-.28-1.35-.16-1.85.3l-2.15 2V8c0-1.646-1.354-3-3-3H5C3.354 5 2 6.354 2 8v8c0 1.646 1.354 3 3 3h9c1.646 0 3-1.354 3-3v-1.45l2.16 2a1.74 1.74 0 0 0 1.16.45c.238 0 .473-.052.69-.15.602-.244.999-.83 1-1.48V8.63A1.603 1.603 0 0 0 21 7.15Zm-8.85 2.63a1.005 1.005 0 0 0-1.41.09l-1.87 2.15-.63-.71a1.003 1.003 0 0 0-1.5 1.33l1.39 1.56a1 1 0 0 0 .75.33c.284-.003.553-.127.74-.34l2.61-3a1.005 1.005 0 0 0-.08-1.41Z"
		/>
	</svg>
);

export default SvgAcceptanceMeeting;
