import * as React from 'react';
import type { SVGProps } from 'react';

const SvgMailStatusOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M15.824 3.999h3.168c1.646 0 3 1.354 3 3v10c0 1.646-1.354 3-3 3h-14c-1.646 0-3-1.354-3-3V7c0-1.646 1.354-3 3-3H8.16a5 5 0 0 0-1.036 2H5.662l1.312.984a5 5 0 0 0 .95 3.214L3.991 7.25V17c0 .549.452 1 1 1h14c.549 0 1-.451 1-1V7.25l-3.931 2.949a5 5 0 0 0 .95-3.215L18.322 6H16.86a5 5 0 0 0-1.036-2m-3.832 10a1 1 0 1 1 0 2.001 1 1 0 0 1 0-2m0-10c-1.92 0-3.5 1.58-3.5 3.5 0 .549.452 1 1 1 .549 0 1-.451 1-1 0-.823.677-1.5 1.5-1.5s1.5.677 1.5 1.5-.677 1.5-1.5 1.5c-.548 0-1 .452-1 1v2c0 .549.452 1 1 1 .549 0 1-.451 1-1v-1.16a3.5 3.5 0 0 0 2.512-3.35 3.507 3.507 0 0 0-3.49-3.49z" />
	</svg>
);
export default SvgMailStatusOutline;
