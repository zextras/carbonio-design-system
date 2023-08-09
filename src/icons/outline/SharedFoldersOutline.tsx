import * as React from 'react';
import type { SVGProps } from 'react';

const SvgSharedFoldersOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
		<path
			fillRule="evenodd"
			d="M19.492 7.051a2.482 2.482 0 0 1 2.5 2.43v8.59a2.482 2.482 0 0 1-2.5 2.43h-15a2.482 2.482 0 0 1-2.5-2.43V5.931a2.482 2.482 0 0 1 2.5-2.43h4.6a1 1 0 0 1 .77.37l2.044 2.472a3.014 3.014 0 0 0-1.067 1.87L8.622 5.5h-4.13a.462.462 0 0 0-.5.43v12.12a.462.462 0 0 0 .5.43h15a.462.462 0 0 0 .5-.43v-8.57a.462.462 0 0 0-.5-.43h-2.679a3 3 0 0 0-.45-2h3.13ZM11.923 9.12a1.97 1.97 0 1 1 3.901-.38 1.97 1.97 0 0 1-2.602 1.865l-1.16 1.014a1.983 1.983 0 0 1-.001.76l1.162 1.018a1.97 1.97 0 1 1 .633 3.834 1.97 1.97 0 0 1-1.932-2.35l-1.162-1.018a1.97 1.97 0 1 1 .001-3.729l1.16-1.014Z"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgSharedFoldersOutline;
