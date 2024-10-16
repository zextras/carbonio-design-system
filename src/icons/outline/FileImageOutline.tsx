import * as React from 'react';
import type { SVGProps } from 'react';

const SvgFileImageOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="m19.72 8.322-5.434-5.994a1 1 0 0 0-.74-.33H6.525a2.54 2.54 0 0 0-2.528 2.498V19.48a2.54 2.54 0 0 0 2.528 2.498h10.929a2.54 2.54 0 0 0 2.528-2.498V8.99a1 1 0 0 0-.26-.67m-5.734-3.327 2.738 2.997h-1.998a.79.79 0 0 1-.74-.849zm3.437 14.985H6.553l-.03.001a.53.53 0 0 1-.529-.5V4.496a.53.53 0 0 1 .56-.5h5.434v3.147a2.8 2.8 0 0 0 2.708 2.847h3.286v9.49a.53.53 0 0 1-.559.5" />
		<path d="M9.883 11.083c.822 0 1.499.676 1.499 1.498s-.677 1.499-1.499 1.499a1.506 1.506 0 0 1-1.498-1.499c0-.822.676-1.498 1.498-1.498M15.888 18.19a.657.657 0 0 1-.6.701H8.085l4.544-4.093a.416.416 0 0 1 .558 0l2.701 2.689z" />
	</svg>
);
export default SvgFileImageOutline;
