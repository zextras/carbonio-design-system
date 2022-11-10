import * as React from 'react';
import { SVGProps } from 'react';

const SvgFolderShareWithMe = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M4.492 20.5h15c1.4 0 2.5-1.099 2.5-2.4V9.502c0-1.4-1.1-2.4-2.5-2.4h-7l-2.6-3.2c-.2-.3-.5-.4-.8-.4h-4.6c-1.4 0-2.5 1-2.5 2.4v12.2c0 1.3 1.1 2.4 2.5 2.4Zm4.088-7.369a1 1 0 0 1 .21-.32l2.016-2.015a1 1 0 0 1 1.42 0 1 1 0 0 1 0 1.42l-.316.305h2.635c.549 0 1 .452 1 1 0 .549-.451 1-1 1H11.84l.4.481a1 1 0 1 1-1.45 1.38l-2.03-2.17a1.005 1.005 0 0 1-.09-.13.819.819 0 0 1-.17-.46v-.1a1 1 0 0 1 .08-.39Z"
		/>
	</svg>
);

export default SvgFolderShareWithMe;
