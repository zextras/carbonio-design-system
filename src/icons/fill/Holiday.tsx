import * as React from 'react';
import type { SVGProps } from 'react';

const SvgHoliday = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path
			fillRule="evenodd"
			d="M7.579 3.55a.983.983 0 0 1 .696-1.198l.002-.001a.983.983 0 0 1 1.203.695l.004.015c3.548-.412 7 1.85 7.95 5.393a.74.74 0 0 1-.52.9l-5.435 1.456.384 1.434.007.027q.064.165.065.352v2.456h5.708l1.862-1.075a.983.983 0 0 1 1.342.36v.002a.983.983 0 0 1-.359 1.342l-2.072 1.196-.047.025.479 1.788a1 1 0 0 1 .033.296h1.118c.54 0 .98.44.98.98V20c0 .54-.44.98-.98.98H3.978a.98.98 0 0 1-.98-.98v-.005c0-.542.439-.981.98-.981H7.25a1 1 0 0 1 .033-.296l.447-1.671h-.615a.98.98 0 0 1-.981-.981v-.005c0-.541.44-.981.98-.981H9.97V12.77l-.005-.017-.385-1.434-5.434 1.456a.74.74 0 0 1-.9-.52C2.282 8.66 4.21 4.92 7.58 3.55m2.154 13.496q0 .126-.034.254l-.459 1.713h7.651l-.459-1.713a1 1 0 0 1-.034-.254z"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgHoliday;
