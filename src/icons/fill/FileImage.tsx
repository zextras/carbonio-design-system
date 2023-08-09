import * as React from 'react';
import { SVGProps } from 'react';

const SvgFileImage = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M19.72 7.323c.167.183.26.422.26.67V19.48a2.54 2.54 0 0 1-2.527 2.498H6.523a2.54 2.54 0 0 1-2.527-2.498V4.496a2.54 2.54 0 0 1 2.528-2.498h8.022a1 1 0 0 1 .74.33l4.435 4.995Zm-3.832 10.866a.658.658 0 0 1-.6.703H8.085l4.543-4.094a.416.416 0 0 1 .559 0l2.7 2.689v.702Zm-6.005-7.106c.822 0 1.499.676 1.499 1.498s-.677 1.499-1.499 1.499a1.506 1.506 0 0 1-1.498-1.499c0-.822.676-1.498 1.498-1.498Zm4.103-7.087 3.737 3.996h-2.997a.792.792 0 0 1-.74-.849V3.996Z"
		/>
	</svg>
);
export default SvgFileImage;
