import * as React from 'react';
import type { SVGProps } from 'react';

const SvgSharedFoldersOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
		<path
			fillRule="evenodd"
			d="M19.492 7.051a2.48 2.48 0 0 1 2.5 2.43v8.59a2.48 2.48 0 0 1-2.5 2.43h-15a2.48 2.48 0 0 1-2.5-2.43V5.931a2.48 2.48 0 0 1 2.5-2.43h4.6a1 1 0 0 1 .77.37l2.044 2.472a3 3 0 0 0-1.067 1.87L8.622 5.5h-4.13l-.04-.002a.46.46 0 0 0-.46.432v12.12a.46.46 0 0 0 .5.43h15l.041.002c.242 0 .444-.19.46-.432v-8.57a.46.46 0 0 0-.5-.43h-2.68q.023-.186.024-.378a3 3 0 0 0-.474-1.622zM11.923 9.12a1.97 1.97 0 1 1 3.901-.38 1.97 1.97 0 0 1-2.602 1.865l-1.16 1.015a2 2 0 0 1-.001.76l1.162 1.017q.299-.103.632-.104a1.97 1.97 0 0 1 0 3.937 1.97 1.97 0 0 1-1.931-2.35l-1.162-1.017a1.97 1.97 0 1 1 .001-3.729z"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgSharedFoldersOutline;
