import * as React from 'react';
import { SVGProps } from 'react';

const SvgMailFolder = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="m1.992 8.823 9.412 7.017c.35.26.831.26 1.18-.003l9.318-6.978c.055.199.087.407.09.622v8.59a2.482 2.482 0 0 1-2.5 2.43h-15a2.482 2.482 0 0 1-2.5-2.43V8.823Zm0-2.471v-.42a2.482 2.482 0 0 1 2.5-2.43h4.6a1 1 0 0 1 .77.37l2.6 3.18h7l.06-.002c.457 0 .887.127 1.255.347l-8.788 6.42-9.997-7.465Z" />
	</svg>
);
export default SvgMailFolder;
