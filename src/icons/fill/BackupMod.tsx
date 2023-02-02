import * as React from 'react';
import { SVGProps } from 'react';

const SvgBackupMod = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M12 2.016c5.51 0 9.984 4.473 9.984 9.984 0 5.51-4.474 9.984-9.984 9.984S2.016 17.51 2.016 12 6.489 2.016 12 2.016Zm.565 14.099a1.266 1.266 0 1 1-2.445.658 1.266 1.266 0 0 1 2.445-.658Zm.712-.839a3.517 3.517 0 1 0-2.568-6.547 2.796 2.796 0 0 0-1.652-1.357A5.487 5.487 0 0 1 17.484 12a5.49 5.49 0 0 1-4.047 5.294c.107-.262.165-.55.165-.85 0-.427-.119-.827-.325-1.168ZM9.649 13.97a1.548 1.548 0 1 1-2.988.804 1.548 1.548 0 0 1 2.988-.804Zm.365-4.407a1.829 1.829 0 1 1-3.532.951 1.829 1.829 0 0 1 3.532-.95Z"
		/>
	</svg>
);
export default SvgBackupMod;
