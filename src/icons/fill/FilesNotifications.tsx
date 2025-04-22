import * as React from 'react';
import type { SVGProps } from 'react';

const SvgFilesNotifications = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
		<path
			fillRule="evenodd"
			d="M10.418 2.997c.322 0 .633.127.861.356l1.948 1.948a.46.46 0 0 0 .323.135h5.604c1.008 0 1.828.817 1.828 1.828v11.887a1.83 1.83 0 0 1-1.828 1.829H4.828A1.83 1.83 0 0 1 3 19.15V4.825a1.83 1.83 0 0 1 1.828-1.828zM15.406 13.7l.9.904a.82.82 0 0 1-.58 1.395h-1.68v.17a1.92 1.92 0 0 1-2 1.83 1.92 1.92 0 0 1-2-1.83v-.17h-1.68a.82.82 0 0 1-.58-1.395l.9-.905v-2.334a3.37 3.37 0 0 1 3.81-3.335 3.43 3.43 0 0 1 2.91 3.44zm-2.694 3.085a.94.94 0 0 0 .334-.616v-.17h-2v.17a.94.94 0 0 0 1 .83.94.94 0 0 0 .666-.214m-3.32-2.375-.59.59h6.489l-.595-.59a1 1 0 0 1-.29-.71v-2.25a2.43 2.43 0 0 0-2.04-2.45 2.34 2.34 0 0 0-1.87.585 2.37 2.37 0 0 0-.81 1.78v2.334a1 1 0 0 1-.295.71"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgFilesNotifications;
