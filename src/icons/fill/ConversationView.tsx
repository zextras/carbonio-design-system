import * as React from 'react';
import { SVGProps } from 'react';

const SvgConversationView = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="m21.979 18.05-11.986-.005a.999.999 0 0 0-.55.14l-5.936 3.654a.998.998 0 0 1-1.509-.86V5.995a3.011 3.011 0 0 1 2.997-2.997h13.986a3.011 3.011 0 0 1 2.997 2.997V18.05Zm0 2.93a1.015 1.015 0 0 1-.243.65 1.012 1.012 0 0 1-.888.34 1.018 1.018 0 0 1-.378-.131l-2.873-1.822h4.381v.963Zm-5.963-9.011H7.96a.984.984 0 0 0 0 1.967h8.055a.984.984 0 0 0 0-1.967Zm0-3.902H7.96a.984.984 0 0 0 0 1.967h8.055a.984.984 0 0 0 0-1.967Z" />
	</svg>
);

export default SvgConversationView;
