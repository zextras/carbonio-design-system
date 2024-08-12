import * as React from 'react';
import type { SVGProps } from 'react';

const SvgAvatar = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M7.485 20.91c.808-1.687 2.535-2.863 4.515-2.863s3.707 1.176 4.515 2.863A9.9 9.9 0 0 1 12 22a9.9 9.9 0 0 1-4.515-1.09m-1.688-1.09C3.49 17.982 2 15.151 2 12 2 6.514 6.514 2 12 2s10 4.514 10 10c0 3.151-1.49 5.981-3.797 7.82-1.175-2.235-3.523-3.773-6.203-3.773s-5.028 1.538-6.203 3.773M12 14.048c2.194 0 4-1.806 4-4s-1.806-4-4-4-4 1.806-4 4 1.806 4 4 4" />
	</svg>
);
export default SvgAvatar;
