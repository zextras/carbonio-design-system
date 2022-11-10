import * as React from 'react';
import { SVGProps } from 'react';

const SvgFileVideo = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M19.72 7.323c.167.183.26.422.26.67V19.48a2.54 2.54 0 0 1-2.527 2.498H6.523a2.54 2.54 0 0 1-2.527-2.498V4.496a2.54 2.54 0 0 1 2.528-2.498h8.022a1 1 0 0 1 .74.33l4.435 4.995Zm-5.017 3.729h-5.43c-.652 0-1.188.536-1.188 1.188v5.43c0 .652.536 1.188 1.188 1.188h5.43c.652 0 1.189-.536 1.189-1.188v-5.43c0-.652-.537-1.188-1.189-1.188Zm-5.75 6.618v-.547h.867v.868h-.547a.323.323 0 0 1-.32-.321Zm6.071 0a.323.323 0 0 1-.32.32h-.547v-.867h.867v.547Zm-6.072-2.281h.868v.867h-.868v-.867Zm5.205 0h.867v.867h-.867v-.867ZM9.82 14.52h-.868v-.867h.868v.867Zm5.204 0h-.867v-.867h.867v.867Zm0-2.281v.546h-.867v-.867h.546c.176 0 .321.145.321.32Zm-5.75-.321h.546v.867h-.868v-.546c0-.176.145-.321.321-.321Zm4.712-7.923 3.737 3.996h-2.997a.792.792 0 0 1-.74-.849V3.996Z"
		/>
	</svg>
);

export default SvgFileVideo;
