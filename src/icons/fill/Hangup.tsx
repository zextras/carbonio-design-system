import * as React from 'react';
import type { SVGProps } from 'react';

const SvgHangup = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M8.09 21.75a1 1 0 0 0 .65-.72l1.37-6a1 1 0 0 0-.26-.92c-.13-.14-.14-.15-1.38-.8a9.9 9.9 0 0 1 4.89-4.87c.64 1.27.64 1.28.79 1.41a1 1 0 0 0 .92.26L21 8.74a1 1 0 0 0 .72-.65 4 4 0 0 0 .18-.72 4 4 0 0 0 .1-.77C22 4.077 19.924 2 17.4 2 8.956 2.01 2.01 8.956 2 17.4 2 19.924 4.077 22 6.6 22q.383 0 .76-.06.373-.064.73-.19" />
	</svg>
);
export default SvgHangup;