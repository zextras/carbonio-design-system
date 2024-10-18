import * as React from 'react';
import type { SVGProps } from 'react';

const SvgGroupCalendarOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
		<path
			fillRule="evenodd"
			d="M19 3h1c.796 0 1.559.316 2.121.879S23 5.204 23 6v11c0 .796-.316 1.559-.879 2.121A3 3 0 0 1 20 20H8a3 3 0 0 1-2.121-.879A3 3 0 0 1 5 17V6c0-.796.316-1.559.879-2.121A3 3 0 0 1 8 3h1V2a.997.997 0 0 1 1-1 .997.997 0 0 1 1 1v1h6V2a.997.997 0 0 1 1-1 .997.997 0 0 1 1 1zM9 5H8a.997.997 0 0 0-1 1v4h14V6a.997.997 0 0 0-1-1h-1v1a.997.997 0 0 1-1 1 .997.997 0 0 1-1-1V5h-6v1a.997.997 0 0 1-1 1 .997.997 0 0 1-1-1zm11 13a.997.997 0 0 0 1-1v-5H7v5a.997.997 0 0 0 1 1zm-2-4h-4a.997.997 0 0 0-1 1 .997.997 0 0 0 1 1h4a.997.997 0 0 0 1-1 .997.997 0 0 0-1-1m1.121 8.121c.32-.319.56-.703.707-1.121H5a.997.997 0 0 1-1-1V6.172A2.996 2.996 0 0 0 2 9v11c0 .796.316 1.559.879 2.121A3 3 0 0 0 5 23h12c.796 0 1.559-.316 2.121-.879M11 15a1 1 0 1 1-2 0 1 1 0 0 1 2 0"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgGroupCalendarOutline;
