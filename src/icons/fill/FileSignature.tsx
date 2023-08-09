import * as React from 'react';
import { SVGProps } from 'react';

const SvgFileSignature = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M19.72 7.323c.167.183.26.422.26.67V19.48a2.54 2.54 0 0 1-2.527 2.498H6.523a2.54 2.54 0 0 1-2.527-2.498V4.496a2.54 2.54 0 0 1 2.528-2.498h8.022a1 1 0 0 1 .74.33l4.435 4.995ZM8.97 17.485l-.12.613a.386.386 0 0 1-.758-.15l.682-3.459a3.914 3.914 0 0 1 7.086-1.423l-4.898 3.285a1.57 1.57 0 0 0-1.991 1.134H8.97Zm6.921.532a.386.386 0 0 0-.385-.385h-5.51a.386.386 0 0 0 0 .771h5.51a.386.386 0 0 0 .386-.386Zm-6.378-3.289.018-.09a3.142 3.142 0 0 1 5.179-1.73l-1.243.834-.497-.74a.394.394 0 0 0-.255-.165.384.384 0 0 0-.442.463c.01.047.03.092.057.132l.496.74-.673.452-.713-.963a.39.39 0 0 0-.324-.17.386.386 0 0 0-.316.6v.006l.702.964c-.232.153-.7.469-.7.469a2.33 2.33 0 0 0-1.51.315l.22-1.117-.001.009-.003.012.005-.02Zm4.473-10.732 3.737 3.996h-2.997a.792.792 0 0 1-.74-.849V3.996Z"
		/>
	</svg>
);
export default SvgFileSignature;
