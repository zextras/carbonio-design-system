import * as React from 'react';
import type { SVGProps } from 'react';

const SvgCos = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path
			fillRule="evenodd"
			d="M19.987 12A7.99 7.99 0 0 1 12 19.989 7.99 7.99 0 0 1 4.013 12 7.99 7.99 0 0 1 12 4.014a.987.987 0 0 0 0-1.973c-5.497 0-9.96 4.463-9.96 9.96 0 5.497 4.463 9.96 9.96 9.96 5.497 0 9.96-4.463 9.96-9.96a.987.987 0 0 0-1.973 0ZM17.647 4.96a.984.984 0 1 1 1.392 1.394.984.984 0 0 1-1.392-1.393Z"
			clipRule="evenodd"
		/>
		<path d="M12 7c-2.743 0-5 2.257-5 5s2.257 5 5 5 5-2.257 5-5-2.257-5-5-5Z" />
	</svg>
);
export default SvgCos;
