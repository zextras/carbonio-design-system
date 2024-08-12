import * as React from 'react';
import type { SVGProps } from 'react';

const SvgRecordingOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M18 8a4 4 0 0 0-4 4 3.9 3.9 0 0 0 .56 2H9.44a3.9 3.9 0 0 0 .56-2 4 4 0 1 0-4 4h12a4 4 0 0 0 0-8M4 12a2 2 0 1 1 2 2 2 2 0 0 1-2-2m14 2a2 2 0 1 1 2-2 2 2 0 0 1-2 2"
				data-name="recording"
			/>
		</g>
	</svg>
);
export default SvgRecordingOutline;
