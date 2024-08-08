import * as React from 'react';
import type { SVGProps } from 'react';

const SvgListViewOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M14.985 3.996v-.999c0-.548.451-.999 1-.999.547 0 .998.451.998 1v.998h1a3.01 3.01 0 0 1 2.997 2.997v11.989a3.01 3.01 0 0 1-2.998 2.997H5.994a3.01 3.01 0 0 1-2.997-2.997V6.993a3.01 3.01 0 0 1 2.997-2.997h1v-.999A1.004 1.004 0 0 1 8.043 2a.99.99 0 0 1 .645.285c.19.186.302.446.302.713v1zm2.997 15.984c.549 0 1-.45 1-.998V6.993c0-.548-.451-.999-1-.999h-.999v1c0 .547-.45.998-.999.998s-.999-.45-.999-.999v-.999H8.991v1c0 .547-.45.998-.999.998s-.999-.45-.999-.999v-.999h-.999c-.548 0-.999.451-.999 1v11.988q0 .17.057.33c.102.286.336.517.623.616q.155.052.32.052z" />
		<path
			fillRule="evenodd"
			d="M8.988 9.49a1 1 0 0 0 0 1.998h6a1 1 0 0 0 0-1.998zM8.988 16.479a1 1 0 0 0 0 1.998h6a1 1 0 0 0 0-1.998zM8.988 12.984a1 1 0 0 0 0 1.998h6a1 1 0 0 0 0-1.998z"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgListViewOutline;
