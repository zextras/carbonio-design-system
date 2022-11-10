import * as React from 'react';
import { SVGProps } from 'react';

const SvgSearchMod = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M18.327 19.683a9.93 9.93 0 0 1-6.354 2.288C6.468 21.971 2 17.503 2 11.998c0-5.504 4.468-9.972 9.973-9.972 5.504 0 9.972 4.468 9.972 9.973a9.92 9.92 0 0 1-2.24 6.294l2.006 2.006a.978.978 0 1 1-1.384 1.384l-2-2ZM7.83 15.277a1.548 1.548 0 0 1 3.093 0 1.548 1.548 0 0 1-3.093 0Zm2.75-3.033a1.829 1.829 0 1 1 3.658 0 1.829 1.829 0 0 1-3.658 0Zm3.49-3.093a1.268 1.268 0 1 1 2.535.001 1.268 1.268 0 0 1-2.535-.001Z"
		/>
	</svg>
);

export default SvgSearchMod;
