import * as React from 'react';
import type { SVGProps } from 'react';

const SvgFilePresentationOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="m19.72 8.322-5.434-5.994a1 1 0 0 0-.74-.33H6.525a2.54 2.54 0 0 0-2.528 2.498V19.48a2.54 2.54 0 0 0 2.528 2.498h10.929a2.54 2.54 0 0 0 2.528-2.498V8.99a1 1 0 0 0-.26-.67m-5.734-3.327 2.738 2.997h-1.998a.79.79 0 0 1-.74-.849zm3.437 14.985H6.553l-.03.001a.53.53 0 0 1-.529-.5V4.496a.53.53 0 0 1 .56-.5h5.434v3.147a2.8 2.8 0 0 0 2.708 2.847h3.286v9.49a.53.53 0 0 1-.559.5" />
		<path
			fillRule="evenodd"
			d="M14.44 11.083c.822 0 1.498.676 1.498 1.498v2.998c0 .822-.676 1.498-1.498 1.498h-.88l.58 1.007a.492.492 0 0 1-.85.491l-.866-1.498h-.84l-.865 1.498a.492.492 0 0 1-.852-.491l.581-1.007h-.88a1.506 1.506 0 0 1-1.499-1.499v-2.997c0-.822.677-1.498 1.499-1.498zm.5 4.496c0 .274-.226.499-.5.499H9.568a.5.5 0 0 1-.5-.5v-2.997c0-.274.226-.5.5-.5h4.872c.274 0 .5.226.5.5z"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgFilePresentationOutline;
