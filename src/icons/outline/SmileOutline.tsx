import * as React from 'react';
import type { SVGProps } from 'react';

const SvgSmileOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M11.988 1.998c-5.48 0-9.99 4.51-9.99 9.99s4.51 9.99 9.99 9.99 9.99-4.51 9.99-9.99-4.51-9.99-9.99-9.99Zm0 17.983c-4.384 0-7.992-3.608-7.992-7.993 0-4.384 3.608-7.992 7.992-7.992 4.385 0 7.992 3.608 7.992 7.992 0 4.385-3.607 7.992-7.992 7.992Z" />
		<path d="M9.928 10.958a.983.983 0 1 0 0-1.967.983.983 0 0 0 0 1.967ZM13.972 10.958a.983.983 0 1 0 0-1.967.983.983 0 0 0 0 1.967Z" />
		<path
			fillRule="evenodd"
			d="M13.941 13.942a2.764 2.764 0 0 1-3.907 0 .984.984 0 0 0-1.39 1.39 4.732 4.732 0 0 0 6.688 0 .984.984 0 0 0-1.39-1.39Z"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgSmileOutline;
