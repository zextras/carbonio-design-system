import * as React from 'react';
import type { SVGProps } from 'react';

const SvgCrown = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path
			fillRule="evenodd"
			d="M4.41 16.678c-.022-.02-1.383-8.851-1.383-8.851-.209-.921.848-1.599 1.598-1.026L6.83 8.486a1.072 1.072 0 0 0 1.512-.214l2.826-3.812a1.01 1.01 0 0 1 1.623 0l2.826 3.812c.356.481 1.037.577 1.512.214L19.334 6.8c.75-.573 1.806.105 1.598 1.026l-1.348 8.616c-.15 1.933-3.5 3.48-7.605 3.48-3.937 0-7.18-1.423-7.57-3.245Zm7.558-3.365c3.234 0 5.86 1.034 5.86 2.306 0 1.273-2.626 2.306-5.86 2.306-3.234 0-5.86-1.033-5.86-2.306 0-1.272 2.626-2.306 5.86-2.306Z"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgCrown;
