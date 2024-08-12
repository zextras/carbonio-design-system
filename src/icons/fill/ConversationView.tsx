import * as React from 'react';
import type { SVGProps } from 'react';

const SvgConversationView = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="m21.979 18.05-11.986-.005a1 1 0 0 0-.55.14l-5.936 3.654a.998.998 0 0 1-1.509-.86V5.995a3.01 3.01 0 0 1 2.997-2.997h13.987a3.01 3.01 0 0 1 2.997 2.997zm0 2.93a1 1 0 0 1-.243.65 1.01 1.01 0 0 1-.888.34 1 1 0 0 1-.378-.131l-2.873-1.822h4.381zm-5.963-9.011H7.96a.984.984 0 0 0 0 1.967h8.055a.984.984 0 0 0 0-1.967m0-3.902H7.96a.984.984 0 0 0 0 1.967h8.055a.984.984 0 0 0 0-1.967" />
	</svg>
);
export default SvgConversationView;
