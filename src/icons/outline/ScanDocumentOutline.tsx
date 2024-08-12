import * as React from 'react';
import type { SVGProps } from 'react';

const SvgScanDocumentOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M20 18.02v1.48a2.54 2.54 0 0 1-2.53 2.5H6.53A2.54 2.54 0 0 1 4 19.5v-1.48h2v1.48a.53.53 0 0 0 .56.5h10.88a.53.53 0 0 0 .56-.5v-1.48z" />
		<path
			fillRule="evenodd"
			d="M4 12.091v-7.59A2.54 2.54 0 0 1 6.56 2h7a1 1 0 0 1 .74.33l5.44 6A1 1 0 0 1 20 9v3.09h-2V10h-3.29A2.803 2.803 0 0 1 12 7.15V4H6.53a.53.53 0 0 0-.53.5v7.591zm10-7.09 2.74 3h-2A.793.793 0 0 1 14 7.15z"
			clipRule="evenodd"
		/>
		<path d="M21.003 14.072H2.997a.99.99 0 1 0 0 1.98h18.006a.99.99 0 0 0 0-1.98" />
	</svg>
);
export default SvgScanDocumentOutline;
