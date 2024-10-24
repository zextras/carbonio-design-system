import * as React from 'react';
import type { SVGProps } from 'react';

const SvgEmptyFolderOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="m12.694 11.867-.706.706-.706-.706a1.004 1.004 0 0 0-1.413 0 1.004 1.004 0 0 0 0 1.413l.706.706-.706.707a1.004 1.004 0 0 0 0 1.413 1.004 1.004 0 0 0 1.413 0l.706-.707.706.707a1.004 1.004 0 0 0 1.413 0 1.004 1.004 0 0 0 0-1.413l-.706-.707.706-.706a1.004 1.004 0 0 0 0-1.413 1.004 1.004 0 0 0-1.413 0" />
		<path d="M19.481 7.043h-6.993L9.86 3.866a1 1 0 0 0-.769-.37H4.496a2.48 2.48 0 0 0-2.498 2.428v12.128a2.48 2.48 0 0 0 2.498 2.428H19.48a2.48 2.48 0 0 0 2.497-2.428V9.471a2.48 2.48 0 0 0-2.497-2.428m.5 10.99a.46.46 0 0 1-.5.429H4.496l-.041.002a.46.46 0 0 1-.459-.432V5.924a.46.46 0 0 1 .5-.43h4.126l2.597 3.178a1 1 0 0 0 .77.37h7.492l.04-.003c.242 0 .445.19.46.432z" />
	</svg>
);
export default SvgEmptyFolderOutline;
