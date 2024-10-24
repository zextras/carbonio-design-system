import * as React from 'react';
import type { SVGProps } from 'react';

const SvgReInvite = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
		<path d="M15 4v-.999c0-.549.451-1 1-1s1 .451 1 1v1h1c1.646 0 3 1.354 3 3v12c0 1.646-1.354 3-3 3H6c-1.646 0-3-1.354-3-3v-12c0-1.646 1.354-3 3-3h1V3a1.006 1.006 0 0 1 .751-.968.99.99 0 0 1 .946.254C8.888 2.474 9 2.733 9 3v1zm.232 9.786q.136-.139.21-.32a1 1 0 0 0 .08-.39v-.1a.8.8 0 0 0-.17-.46 1 1 0 0 0-.09-.13l-2.03-2.17a1 1 0 0 0-1.45 1.38l.4.48H9.478c-.549 0-1 .451-1 1s.451 1 1 1h2.635l-.316.306a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0z" />
	</svg>
);
export default SvgReInvite;
