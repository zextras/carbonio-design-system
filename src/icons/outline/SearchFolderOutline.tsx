import * as React from 'react';
import type { SVGProps } from 'react';

const SvgSearchFolderOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M19.492 20.5h-15c-1.4 0-2.5-1.099-2.5-2.4V5.902c0-1.4 1.1-2.4 2.5-2.4h4.6c.3 0 .6.1.8.4l2.6 3.2h7c1.4 0 2.5 1 2.5 2.4v8.6c0 1.3-1.1 2.4-2.5 2.4M3.992 5.902v12.2c0 .3.2.4.5.4h15c.3 0 .5-.2.5-.4V9.5c0-.3-.2-.5-.5-.5h-7.5c-.3 0-.6-.1-.8-.4l-2.6-3.1h-4.1c-.3 0-.5.2-.5.4" />
		<path
			fillRule="evenodd"
			d="M12.825 15.774a3.001 3.001 0 0 1-4.317-2.696c0-1.656 1.344-3 3-3a3 3 0 0 1 2.706 4.296l.991.991a.987.987 0 0 1-1.395 1.395zm-1.317-3.69a.995.995 0 1 1-.001 1.99.995.995 0 0 1 0-1.99"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgSearchFolderOutline;
