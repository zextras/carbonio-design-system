import * as React from 'react';
import type { SVGProps } from 'react';

const SvgFileCalcOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="m19.72 8.322-5.434-5.994a1 1 0 0 0-.74-.33H6.525a2.54 2.54 0 0 0-2.528 2.498V19.48a2.54 2.54 0 0 0 2.528 2.498H17.453a2.54 2.54 0 0 0 2.527-2.498V8.99a.999.999 0 0 0-.26-.67Zm-5.734-3.327 2.738 2.997h-1.998a.792.792 0 0 1-.74-.849V4.995Zm3.437 14.985H6.553l-.03.001a.532.532 0 0 1-.529-.5V4.496a.532.532 0 0 1 .56-.5h5.434v3.147a2.8 2.8 0 0 0 2.708 2.847h3.286v9.49a.532.532 0 0 1-.559.5Z" />
		<path
			fillRule="evenodd"
			d="M8.595 18.892H8.577a.492.492 0 0 1-.492-.492v-6.825c0-.272.22-.492.492-.492h6.845c.27 0 .49.22.49.49v6.829c0 .27-.22.49-.49.49H8.595Zm6.333-2.276H12.5v1.292h2.43v-1.292Zm-3.412 0H9.068v1.292h2.448v-1.292Zm3.412-2.275H12.5v1.292h2.43V14.34Zm-3.412 0H9.068v1.292h2.448V14.34Zm3.412-2.275H12.5v1.292h2.43v-1.292Zm-3.412 0H9.068v1.292h2.448v-1.292Z"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgFileCalcOutline;
