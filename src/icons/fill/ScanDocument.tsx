import * as React from 'react';
import type { SVGProps } from 'react';

const SvgScanDocument = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M20 18.02v1.48a2.54 2.54 0 0 1-2.53 2.5H6.53A2.54 2.54 0 0 1 4 19.5v-1.48z" />
		<path
			fillRule="evenodd"
			d="M4 12.091v-7.59A2.54 2.54 0 0 1 6.56 2h7a1 1 0 0 1 .74.33l5.44 6A1 1 0 0 1 20 9v3.09zm10-7.09 2.74 3h-2A.793.793 0 0 1 14 7.15z"
			clipRule="evenodd"
		/>
		<path d="M21.003 14.07H2.997a.99.99 0 1 0 0 1.98h18.006a.99.99 0 1 0 0-1.98" />
	</svg>
);
export default SvgScanDocument;
