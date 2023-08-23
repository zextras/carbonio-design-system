import * as React from 'react';
import type { SVGProps } from 'react';

const SvgKickMeeting = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path
			fillRule="evenodd"
			d="M21 7.15c-.62-.28-1.35-.16-1.85.3l-2.15 2V8c0-1.646-1.354-3-3-3H5C3.354 5 2 6.354 2 8v8c0 1.646 1.354 3 3 3h9c1.646 0 3-1.354 3-3v-1.45l2.16 2a1.74 1.74 0 0 0 1.16.45c.238 0 .473-.052.69-.15.602-.244.999-.83 1-1.48V8.63A1.603 1.603 0 0 0 21 7.15ZM10.955 12l.73-.73a1.04 1.04 0 0 0-1.47-1.47l-.73.7-.73-.73a1.05 1.05 0 0 0-1.47 1.5l.73.73-.73.73a1.04 1.04 0 0 0 1.47 1.47l.73-.7.73.73a1.05 1.05 0 0 0 1.47-1.5l-.73-.73Z"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgKickMeeting;
