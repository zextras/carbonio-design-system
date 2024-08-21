import * as React from 'react';
import type { SVGProps } from 'react';

const SvgFileRemove = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="m19.74 7.33-4.44-5a1 1 0 0 0-.74-.33h-8A2.53 2.53 0 0 0 4 4.5v15A2.53 2.53 0 0 0 6.56 22h10.88A2.53 2.53 0 0 0 20 19.5V8a1 1 0 0 0-.26-.67M14 15h-4a1 1 0 0 1 0-2h4a1 1 0 0 1 0 2m.71-7a.79.79 0 0 1-.71-.85V4l3.74 4z"
				data-name="file-remove"
			/>
		</g>
	</svg>
);
export default SvgFileRemove;
