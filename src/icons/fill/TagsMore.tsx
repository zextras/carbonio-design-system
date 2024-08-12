import * as React from 'react';
import type { SVGProps } from 'react';

const SvgTagsMore = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path
			fillRule="evenodd"
			d="m4.119 13.16-.08.08a1.733 1.733 0 0 0 0 2.448L8.61 20.26a1.733 1.733 0 0 0 2.45 0l9.504-9.504c.327-.327.496-.752.507-1.18q.017-.105.017-.212V4.465c0-.692-.562-1.255-1.254-1.255h-4.898q-.108 0-.212.018c-.428.011-.853.18-1.18.507l-.578.578-8.794 2.356a1.8 1.8 0 0 0-.53.244c-.428.292-.71.78-.749 1.296q-.02.295.055.581zm6.066-6.066-4.46 4.46-.817-3.046zm6.605-.568a.984.984 0 1 0 0 1.967.984.984 0 0 0 0-1.967"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgTagsMore;
