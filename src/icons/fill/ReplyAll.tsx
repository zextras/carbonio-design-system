import * as React from 'react';
import type { SVGProps } from 'react';

const SvgReplyAll = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M22.219 21a1 1 0 0 1-1-.761 8.92 8.92 0 0 0-7.801-6.689v1.121c0 .714-.431 1.363-1.089 1.64a2 2 0 0 1-2.149-.31l-5.06-4.41a1.75 1.75 0 0 1 0-2.677l5.06-4.419c.601-.524 1.46-.645 2.182-.298a1.78 1.78 0 0 1 1.088 1.64v1.17c5.6.431 9.994 5.132 10.05 10.748 0 .839-.104 1.677-.31 2.492a1.01 1.01 0 0 1-1 .762h.029z" />
		<path d="M8.499 16.227q-.085.044-.17.08a2 2 0 0 1-2.149-.31l-5.06-4.406a1.77 1.77 0 0 1-.62-1.339c0-.516.226-1.008.62-1.338l5.06-4.419c.601-.524 1.46-.645 2.182-.298q.072.031.145.068a2 2 0 0 0-.327.23L3.12 8.91a1.77 1.77 0 0 0-.62 1.338c0 .516.225 1.008.62 1.339l5.06 4.41q.15.135.319.23" />
	</svg>
);
export default SvgReplyAll;
