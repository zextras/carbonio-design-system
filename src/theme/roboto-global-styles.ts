/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { createGlobalStyle } from 'styled-components';

import roboto300Eot from '../fonts/roboto/roboto-v20-latin-300.eot';
import roboto300Svg from '../fonts/roboto/roboto-v20-latin-300.svg';
import roboto300Ttf from '../fonts/roboto/roboto-v20-latin-300.ttf';
import roboto300Woff from '../fonts/roboto/roboto-v20-latin-300.woff';
import roboto300Woff2 from '../fonts/roboto/roboto-v20-latin-300.woff2';
import roboto300ItalicEot from '../fonts/roboto/roboto-v20-latin-300italic.eot';
import roboto300ItalicSvg from '../fonts/roboto/roboto-v20-latin-300italic.svg';
import roboto300ItalicTtf from '../fonts/roboto/roboto-v20-latin-300italic.ttf';
import roboto300ItalicWoff from '../fonts/roboto/roboto-v20-latin-300italic.woff';
import roboto300ItalicWoff2 from '../fonts/roboto/roboto-v20-latin-300italic.woff2';
import roboto500Eot from '../fonts/roboto/roboto-v20-latin-500.eot';
import roboto500Svg from '../fonts/roboto/roboto-v20-latin-500.svg';
import roboto500Ttf from '../fonts/roboto/roboto-v20-latin-500.ttf';
import roboto500Woff from '../fonts/roboto/roboto-v20-latin-500.woff';
import roboto500Woff2 from '../fonts/roboto/roboto-v20-latin-500.woff2';
import roboto500ItalicEot from '../fonts/roboto/roboto-v20-latin-500italic.eot';
import roboto500ItalicSvg from '../fonts/roboto/roboto-v20-latin-500italic.svg';
import roboto500ItalicTtf from '../fonts/roboto/roboto-v20-latin-500italic.ttf';
import roboto500ItalicWoff from '../fonts/roboto/roboto-v20-latin-500italic.woff';
import roboto500ItalicWoff2 from '../fonts/roboto/roboto-v20-latin-500italic.woff2';
import roboto700Eot from '../fonts/roboto/roboto-v20-latin-700.eot';
import roboto700Svg from '../fonts/roboto/roboto-v20-latin-700.svg';
import roboto700Ttf from '../fonts/roboto/roboto-v20-latin-700.ttf';
import roboto700Woff from '../fonts/roboto/roboto-v20-latin-700.woff';
import roboto700Woff2 from '../fonts/roboto/roboto-v20-latin-700.woff2';
import roboto700ItalicEot from '../fonts/roboto/roboto-v20-latin-700italic.eot';
import roboto700ItalicSvg from '../fonts/roboto/roboto-v20-latin-700italic.svg';
import roboto700ItalicTtf from '../fonts/roboto/roboto-v20-latin-700italic.ttf';
import roboto700ItalicWoff from '../fonts/roboto/roboto-v20-latin-700italic.woff';
import roboto700ItalicWoff2 from '../fonts/roboto/roboto-v20-latin-700italic.woff2';
import roboto400ItalicEot from '../fonts/roboto/roboto-v20-latin-italic.eot';
import roboto400ItalicSvg from '../fonts/roboto/roboto-v20-latin-italic.svg';
import roboto400ItalicTtf from '../fonts/roboto/roboto-v20-latin-italic.ttf';
import roboto400ItalicWoff from '../fonts/roboto/roboto-v20-latin-italic.woff';
import roboto400ItalicWoff2 from '../fonts/roboto/roboto-v20-latin-italic.woff2';
import roboto400Eot from '../fonts/roboto/roboto-v20-latin-regular.eot';
import roboto400Svg from '../fonts/roboto/roboto-v20-latin-regular.svg';
import roboto400Ttf from '../fonts/roboto/roboto-v20-latin-regular.ttf';
import roboto400Woff from '../fonts/roboto/roboto-v20-latin-regular.woff';
import roboto400Woff2 from '../fonts/roboto/roboto-v20-latin-regular.woff2';

const DefaultFontStyles = createGlobalStyle<Record<string, unknown>>`
	/* roboto-300 - latin */
	@font-face {
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 300;
		src: url(${roboto300Eot}); /* IE9 Compat Modes */
		src: local(''),
			url('${roboto300Eot}?#iefix') format('embedded-opentype'), /* IE6-IE8 */
			url(${roboto300Woff2}) format('woff2'), /* Super Modern Browsers */
			url(${roboto300Woff}) format('woff'), /* Modern Browsers */
			url(${roboto300Ttf}) format('truetype'), /* Safari, Android, iOS */
			url('${roboto300Svg}#Roboto') format('svg'); /* Legacy iOS */
	}
	/* roboto-300italic - latin */
	@font-face {
		font-family: 'Roboto';
		font-style: italic;
		font-weight: 300;
		src: url(${roboto300ItalicEot}); /* IE9 Compat Modes */
		src: local(''),
			url('${roboto300ItalicEot}?#iefix') format('embedded-opentype'), /* IE6-IE8 */
			url(${roboto300ItalicWoff2}) format('woff2'), /* Super Modern Browsers */
			url(${roboto300ItalicWoff}) format('woff'), /* Modern Browsers */
			url(${roboto300ItalicTtf}) format('truetype'), /* Safari, Android, iOS */
			url('${roboto300ItalicSvg}#Roboto') format('svg'); /* Legacy iOS */
	}
	/* roboto-regular - latin */
	@font-face {
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 400;
		src: url(${roboto400Eot}); /* IE9 Compat Modes */
		src: local(''),
			url('${roboto400Eot}?#iefix') format('embedded-opentype'), /* IE6-IE8 */
			url(${roboto400Woff2}) format('woff2'), /* Super Modern Browsers */
			url(${roboto400Woff}) format('woff'), /* Modern Browsers */
			url(${roboto400Ttf}) format('truetype'), /* Safari, Android, iOS */
			url('${roboto400Svg}#Roboto') format('svg'); /* Legacy iOS */
	}
	/* roboto-italic - latin */
	@font-face {
		font-family: 'Roboto';
		font-style: italic;
		font-weight: 400;
		src: url(${roboto400ItalicEot}); /* IE9 Compat Modes */
		src: local(''),
			url('${roboto400ItalicEot}?#iefix') format('embedded-opentype'), /* IE6-IE8 */
			url(${roboto400ItalicWoff2}) format('woff2'), /* Super Modern Browsers */
			url(${roboto400ItalicWoff}) format('woff'), /* Modern Browsers */
			url(${roboto400ItalicTtf}) format('truetype'), /* Safari, Android, iOS */
			url('${roboto400ItalicSvg}#Roboto') format('svg'); /* Legacy iOS */
	}
	/* roboto-500italic - latin */
	@font-face {
		font-family: 'Roboto';
		font-style: italic;
		font-weight: 500;
		src: url(${roboto500ItalicEot}); /* IE9 Compat Modes */
		src: local(''),
			url('${roboto500ItalicEot}?#iefix') format('embedded-opentype'), /* IE6-IE8 */
			url(${roboto500ItalicWoff2}) format('woff2'), /* Super Modern Browsers */
			url(${roboto500ItalicWoff}) format('woff'), /* Modern Browsers */
			url(${roboto500ItalicTtf}) format('truetype'), /* Safari, Android, iOS */
			url('${roboto500ItalicSvg}#Roboto') format('svg'); /* Legacy iOS */
	}
	/* roboto-500 - latin */
	@font-face {
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 500;
		src: url(${roboto500Eot}); /* IE9 Compat Modes */
		src: local(''),
			url('${roboto500Eot}?#iefix') format('embedded-opentype'), /* IE6-IE8 */
			url(${roboto500Woff2}) format('woff2'), /* Super Modern Browsers */
			url(${roboto500Woff}) format('woff'), /* Modern Browsers */
			url(${roboto500Ttf}) format('truetype'), /* Safari, Android, iOS */
			url('${roboto500Svg}#Roboto') format('svg'); /* Legacy iOS */
	}
	/* roboto-700italic - latin */
	@font-face {
		font-family: 'Roboto';
		font-style: italic;
		font-weight: 700;
			src: url(${roboto700ItalicEot}); /* IE9 Compat Modes */
		src: local(''),
			url('${roboto700ItalicEot}?#iefix') format('embedded-opentype'), /* IE6-IE8 */
			url(${roboto700ItalicWoff2}) format('woff2'), /* Super Modern Browsers */
			url(${roboto700ItalicWoff}) format('woff'), /* Modern Browsers */
			url(${roboto700ItalicTtf}) format('truetype'), /* Safari, Android, iOS */
			url('${roboto700ItalicSvg}#Roboto') format('svg'); /* Legacy iOS */
	}
	/* roboto-700 - latin */
	@font-face {
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 700;
		src: url(${roboto700Eot}); /* IE9 Compat Modes */
		src: local(''),
			url('${roboto700Eot}?#iefix') format('embedded-opentype'), /* IE6-IE8 */
			url(${roboto700Woff2}) format('woff2'), /* Super Modern Browsers */
			url(${roboto700Woff}) format('woff'), /* Modern Browsers */
			url(${roboto700Ttf}) format('truetype'), /* Safari, Android, iOS */
			url('${roboto700Svg}#Roboto') format('svg'); /* Legacy iOS */
	}
`;

export default DefaultFontStyles;
