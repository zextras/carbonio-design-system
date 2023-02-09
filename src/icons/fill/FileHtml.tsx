import * as React from 'react';
import { SVGProps } from 'react';

const SvgFileHtml = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M19.72 7.323c.167.183.26.422.26.67V19.48a2.54 2.54 0 0 1-2.527 2.498H6.523a2.54 2.54 0 0 1-2.527-2.498V4.496a2.54 2.54 0 0 1 2.528-2.498h8.022a1 1 0 0 1 .74.33l4.435 4.995ZM9.225 14.987l2.238-2.677a.5.5 0 1 0-.77-.64l-2.497 2.998a.5.5 0 0 0 0 .634l2.413 2.997a.502.502 0 0 0 .78-.63l-2.164-2.682Zm6.582-.315-2.387-2.997a.501.501 0 0 0-.78.63l2.133 2.682-2.238 2.683a.5.5 0 0 0 .065.704.5.5 0 0 0 .32.11.5.5 0 0 0 .385-.18l2.497-2.997a.501.501 0 0 0 .005-.635Zm-1.82-10.676 3.737 3.996h-2.997a.792.792 0 0 1-.74-.849V3.996Z"
		/>
	</svg>
);
export default SvgFileHtml;
