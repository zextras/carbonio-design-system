import * as React from 'react';
import type { SVGProps } from 'react';

const SvgAuth = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path
			fillRule="evenodd"
			d="M20.107 6.333C20.107 4.492 16.479 3 12 3 7.52 3 3.893 4.492 3.893 6.333v7.832c-.005.47.167.943.517 1.303.202.25 7.105 5.334 7.105 5.334.202.121.335.199.485.198.149 0 .283-.077.485-.198 0 0 6.903-5.085 7.104-5.334.35-.36.522-.832.518-1.303zm-7.56 5.961c.584.367.766 1.147.405 1.742-.36.595-1.127.78-1.712.413a1.28 1.28 0 0 1-.406-1.742 1.233 1.233 0 0 1 1.713-.413M10.21 9.373c.715.448.937 1.402.496 2.128a1.507 1.507 0 0 1-2.092.505 1.563 1.563 0 0 1-.497-2.129 1.507 1.507 0 0 1 2.093-.504m4.458-1.048a1.847 1.847 0 0 1 .586 2.516 1.78 1.78 0 0 1-2.473.596 1.847 1.847 0 0 1-.586-2.516 1.78 1.78 0 0 1 2.473-.596"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgAuth;
