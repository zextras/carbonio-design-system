import * as React from 'react';
import type { SVGProps } from 'react';

const SvgSmileOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M11.988 1.998c-5.48 0-9.99 4.51-9.99 9.99s4.51 9.99 9.99 9.99 9.99-4.51 9.99-9.99-4.51-9.99-9.99-9.99m0 17.983c-4.384 0-7.992-3.608-7.992-7.993s3.608-7.992 7.992-7.992 7.993 3.608 7.993 7.992-3.608 7.993-7.993 7.993" />
		<path d="M9.928 10.958a.983.983 0 1 0 0-1.967.983.983 0 0 0 0 1.967M13.972 10.958a.983.983 0 1 0 0-1.967.983.983 0 0 0 0 1.967" />
		<path
			fillRule="evenodd"
			d="M13.942 13.942a2.764 2.764 0 0 1-3.908 0 .984.984 0 0 0-1.39 1.39 4.73 4.73 0 0 0 6.688 0 .984.984 0 0 0-1.39-1.39"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgSmileOutline;
