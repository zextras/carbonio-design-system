import * as React from 'react';
import { SVGProps } from 'react';

const SvgFileVcard = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M19.72 7.323c.167.183.26.422.26.67V19.48a2.54 2.54 0 0 1-2.527 2.498H6.523a2.54 2.54 0 0 1-2.527-2.498V4.496a2.54 2.54 0 0 1 2.528-2.498h8.022a1 1 0 0 1 .74.33l4.435 4.995Zm-5.13 11.566a.436.436 0 0 0 .434-.434 3.05 3.05 0 0 0-3.036-3.036 3.05 3.05 0 0 0-3.036 3.036c0 .238.196.434.434.434h5.204Zm-2.602-4.337c.952 0 1.735-.784 1.735-1.735 0-.952-.783-1.735-1.735-1.735-.951 0-1.734.783-1.734 1.735 0 .951.783 1.735 1.734 1.735Zm1.998-10.556 3.737 3.996h-2.997a.792.792 0 0 1-.74-.849V3.996Z"
		/>
	</svg>
);
export default SvgFileVcard;
