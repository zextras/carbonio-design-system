import * as React from 'react';
import type { SVGProps } from 'react';

const SvgFileCalc = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path
			fillRule="evenodd"
			d="M19.72 7.323c.167.183.26.422.26.67V19.48a2.54 2.54 0 0 1-2.527 2.498H6.523a2.54 2.54 0 0 1-2.527-2.498V4.496a2.54 2.54 0 0 1 2.528-2.498h8.022a1 1 0 0 1 .74.33zm-4.298 11.569H8.576a.49.49 0 0 1-.491-.492v-6.825c0-.272.22-.492.491-.492h6.846c.27 0 .49.22.49.49v6.829c0 .27-.22.49-.49.49m-.494-2.276h-2.43v1.292h2.43zm-3.413 0H9.069v1.292h2.448zm3.413-2.275h-2.43v1.292h2.43zm-3.413 0H9.069v1.292h2.448zm3.413-2.275h-2.43v1.292h2.43zm-3.413 0H9.069v1.292h2.448zm2.471-8.07 3.737 3.996h-2.997a.79.79 0 0 1-.74-.849z"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgFileCalc;
