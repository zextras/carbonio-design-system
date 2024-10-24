import * as React from 'react';
import type { SVGProps } from 'react';

const SvgFolderRemove = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M19.5 7.05h-7L9.87 3.87a1 1 0 0 0-.77-.37H4.5A2.47 2.47 0 0 0 2 5.93v12.14a2.47 2.47 0 0 0 2.5 2.43h15a2.47 2.47 0 0 0 2.5-2.43V9.48a2.47 2.47 0 0 0-2.5-2.43M14 15h-4a1 1 0 0 1 0-2h4a1 1 0 0 1 0 2"
				data-name="folder-remove"
			/>
		</g>
	</svg>
);
export default SvgFolderRemove;
