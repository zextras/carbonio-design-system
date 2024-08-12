import * as React from 'react';
import type { SVGProps } from 'react';

const SvgMailFolder = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="m1.992 8.823 9.412 7.017c.35.26.831.26 1.18-.003l9.318-6.978q.084.299.09.622v8.59a2.48 2.48 0 0 1-2.5 2.43h-15a2.48 2.48 0 0 1-2.5-2.43zm0-2.471v-.42a2.48 2.48 0 0 1 2.5-2.43h4.6a1 1 0 0 1 .77.37l2.6 3.18h7l.06-.002c.457 0 .887.127 1.255.347l-8.788 6.42z" />
	</svg>
);
export default SvgMailFolder;
