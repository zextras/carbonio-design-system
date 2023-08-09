import * as React from 'react';
import { SVGProps } from 'react';

const SvgCoffee = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M17.407 15.452a5.928 5.928 0 0 1-5.419 3.528 5.927 5.927 0 0 1-5.923-5.82v-1.636c0-.456.37-.826.826-.826h11.59a2.5 2.5 0 1 1-1.074 4.754Zm.505-2.787c.008.002 0 .338.038.531.056.288.238.531.531.531a.532.532 0 0 0 0-1.063h-.569ZM11.777 3.13a.978.978 0 0 0-1.335.359L9.428 5.245a.978.978 0 0 0 .358 1.336l.01.005a.978.978 0 0 0 1.335-.358l1.014-1.756a.978.978 0 0 0-.358-1.336l-.01-.005ZM15.345 3.13a.978.978 0 0 0-1.336.359l-2.177 3.77a.978.978 0 0 0 .358 1.335l.01.006a.978.978 0 0 0 1.336-.358l2.176-3.77a.978.978 0 0 0-.358-1.336l-.01-.005ZM20.98 19.979a1 1 0 0 0-1-.999H3.997a1 1 0 0 0-.999.999v.002a1 1 0 0 0 .999.999H19.98a1 1 0 0 0 .998-.999v-.002Z"
		/>
	</svg>
);
export default SvgCoffee;
