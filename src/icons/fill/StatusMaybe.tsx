import * as React from 'react';
import { SVGProps } from 'react';

const SvgStatusMaybe = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M15 4v-.999c0-.549.451-1 1-1 .549 0 1 .451 1 1v1h1c1.646 0 3 1.354 3 3v12c0 1.646-1.354 3-3 3H6c-1.646 0-3-1.354-3-3v-12c0-1.646 1.354-3 3-3h1V3a1.006 1.006 0 0 1 .751-.968.991.991 0 0 1 .946.254C8.888 2.474 9 2.733 9 3v1h6Zm-3 13.001a1 1 0 1 1-.001 2.001 1 1 0 0 1 .001-2Zm0-9.062c-1.92 0-3.5 1.58-3.5 3.5 0 .548.451 1 1 1 .549 0 1-.452 1-1 0-.823.677-1.5 1.5-1.5s1.5.677 1.5 1.5c0 .822-.677 1.5-1.5 1.5-.549 0-1 .451-1 1V15c0 .549.451 1 1 1 .549 0 1-.451 1-1v-.223a3.498 3.498 0 0 0 2.512-3.35 3.507 3.507 0 0 0-3.49-3.49H12Z"
		/>
	</svg>
);
export default SvgStatusMaybe;
