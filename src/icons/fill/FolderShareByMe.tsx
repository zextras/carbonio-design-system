import * as React from 'react';
import type { SVGProps } from 'react';

const SvgFolderShareByMe = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
		<path
			fillRule="evenodd"
			d="M4.492 20.5h15c1.4 0 2.5-1.099 2.5-2.4V9.502c0-1.4-1.1-2.4-2.5-2.4h-7l-2.6-3.2c-.2-.3-.5-.4-.8-.4h-4.6c-1.4 0-2.5 1-2.5 2.4v12.2c0 1.3 1.1 2.4 2.5 2.4Zm10.973-6.438c-.049.119-.12.227-.21.32l-2.016 2.015a1 1 0 0 1-1.42 0 1 1 0 0 1 0-1.42l.316-.306H9.5c-.549 0-1-.451-1-1 0-.548.451-1 1-1h2.705l-.4-.48a1.001 1.001 0 0 1 1.45-1.38l2.03 2.17c.033.041.063.085.09.13a.816.816 0 0 1 .17.46v.1a1 1 0 0 1-.08.39Z"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgFolderShareByMe;
