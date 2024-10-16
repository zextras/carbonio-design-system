import * as React from 'react';
import type { SVGProps } from 'react';

const SvgFileAudio = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path
			fillRule="evenodd"
			d="M19.72 7.323c.167.183.26.422.26.67V19.48a2.54 2.54 0 0 1-2.527 2.498H6.523a2.54 2.54 0 0 1-2.527-2.498V4.496a2.54 2.54 0 0 1 2.528-2.498h8.022a1 1 0 0 1 .74.33zm-4.428 3.879-4.394.977a.49.49 0 0 0-.381.48v3.09a1.7 1.7 0 0 0-.728-.163c-.935 0-1.704.77-1.704 1.706s.77 1.705 1.704 1.705c.93 0 1.698-.762 1.704-1.693v-4.255l3.418-.757v2.48a1.7 1.7 0 0 0-.727-.163c-.935 0-1.704.77-1.704 1.705 0 .936.769 1.706 1.704 1.706.932 0 1.7-.766 1.704-1.699v-4.64a.49.49 0 0 0-.186-.381.5.5 0 0 0-.3-.109zm-1.306-7.206 3.737 3.996h-2.997a.79.79 0 0 1-.74-.849z"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgFileAudio;
