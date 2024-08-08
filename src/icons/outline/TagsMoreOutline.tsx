import * as React from 'react';
import type { SVGProps } from 'react';

const SvgTagsMoreOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M16.467 8.492a.983.983 0 1 0 0-1.966.983.983 0 0 0 0 1.966" />
		<path
			fillRule="evenodd"
			d="M14.614 3.21a1.3 1.3 0 0 0-.212.018c-.428.011-.853.18-1.18.507l-.578.578L3.85 6.669a1.8 1.8 0 0 0-.53.244c-.428.292-.71.78-.749 1.296q-.02.295.054.581l1.172 4.37-.08.08a1.733 1.733 0 0 0 0 2.448l4.571 4.571a1.733 1.733 0 0 0 2.45 0l9.504-9.504c.327-.327.496-.752.506-1.18q.018-.105.018-.212V4.465c0-.692-.562-1.255-1.254-1.255zm.043 1.967H18.8V9.32l-.009.064-.003.043-9.275 9.275-4.239-4.238 9.276-9.276.043-.002z"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgTagsMoreOutline;
