import * as React from 'react';
import { SVGProps } from 'react';

const SvgFileApp = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M17.423 21.979h-10.9a2.54 2.54 0 0 1-2.527-2.498V4.496a2.54 2.54 0 0 1 2.528-2.498h8.022a1 1 0 0 1 .74.33l4.435 4.995c.166.183.259.422.26.67V19.48a2.54 2.54 0 0 1-2.528 2.498h-.03Zm-6.758-3.091a.878.878 0 0 1-.526-.18l-.808-.6a.929.929 0 0 1-.191-1.257.804.804 0 0 0 .09-.726l-.024-.063a.715.715 0 0 0-.437-.476h-.063a.917.917 0 0 1-.577-1.147l.32-1.015a.85.85 0 0 1 .437-.55.835.835 0 0 1 .655-.047c.236.08.497.037.695-.113l.05-.039a.758.758 0 0 0 .286-.59v-.093a.91.91 0 0 1 .893-.91h.995c.235.002.46.096.625.262.172.175.267.411.265.656v.11a.687.687 0 0 0 .27.557l.042.031a.68.68 0 0 0 .62.102l.134-.043a.884.884 0 0 1 1.124.59l.308.983a.925.925 0 0 1-.57 1.143l-.078.027a.738.738 0 0 0-.48.5.781.781 0 0 0 .098.644l.101.148a.933.933 0 0 1-.195 1.26l-.784.605a.875.875 0 0 1-1.257-.206l-.047-.067a.683.683 0 0 0-.585-.304.703.703 0 0 0-.558.3l-.09.13a.879.879 0 0 1-.585.378.806.806 0 0 1-.153 0Zm3.319-14.892v3.075c0 .515.205.921.814.921h2.925l-3.739-3.996Z"
		/>
		<path d="M11.988 16.352a1.365 1.365 0 1 0 0-2.73 1.365 1.365 0 0 0 0 2.73Z" />
	</svg>
);
export default SvgFileApp;
