import * as React from 'react';
import type { SVGProps } from 'react';

const SvgBoardCollapseOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M17.982 2.997H5.994a3.01 3.01 0 0 0-2.997 2.997v11.988a3.01 3.01 0 0 0 2.997 2.998h11.988a3.01 3.01 0 0 0 2.998-2.998V5.994a3.01 3.01 0 0 0-2.998-2.997M5.994 4.995h11.988c.549 0 1 .451 1 1v.967H4.995v-.968c0-.548.451-.999 1-.999m-.999 12.987V8.96h1.967v10.022h-.968c-.548 0-.999-.451-.999-1m12.987 1H8.96V8.96h10.022v9.022c0 .549-.451 1-1 1" />
		<path d="M15.017 10.93a1 1 0 0 1 .709 1.709l-1.409 1.32 1.257 1.34a1 1 0 1 1-1.418 1.409l-1.937-2.03a1.004 1.004 0 0 1 0-1.399l2.098-2.03a1 1 0 0 1 .7-.319" />
	</svg>
);
export default SvgBoardCollapseOutline;
