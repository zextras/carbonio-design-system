import * as React from 'react';
import type { SVGProps } from 'react';

const SvgFileZip = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path
			fillRule="evenodd"
			d="M9.99 21.979H6.524a2.54 2.54 0 0 1-2.528-2.498V4.495a2.54 2.54 0 0 1 2.528-2.497h8.022a1 1 0 0 1 .74.33l4.435 4.995c.166.183.259.421.26.669v11.489a2.54 2.54 0 0 1-2.528 2.498h-5.465v-1.993H9.99zm3.996-3.991h-1.998v1.998h1.998zm-1.998-2.003H9.99v1.998h1.998zm1.998-1.998h-1.998v1.998h1.998zm-1.998-1.998H9.99v1.998h1.998zm1.998-7.993 3.737 3.996h-2.997a.79.79 0 0 1-.74-.85z"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgFileZip;
