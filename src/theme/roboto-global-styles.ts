/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { createGlobalStyle } from 'styled-components';

const DefaultFontStyles = createGlobalStyle<Record<string, unknown>>`
	/* roboto-300 - latin */
	@font-face {
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 300;
		src: url('roboto-v20-latin-300.eot'); /* IE9 Compat Modes */
		src: local(''),
			url('./fonts/roboto/roboto-v20-latin-300.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
			url('./fonts/roboto/roboto-v20-latin-300.woff2') format('woff2'), /* Super Modern Browsers */
			url('./fonts/roboto/roboto-v20-latin-300.woff') format('woff'), /* Modern Browsers */
			url('./fonts/roboto/roboto-v20-latin-300.ttf') format('truetype'), /* Safari, Android, iOS */
			url('./fonts/roboto/roboto-v20-latin-300.svg#Roboto') format('svg'); /* Legacy iOS */
	}
	/* roboto-300italic - latin */
	@font-face {
		font-family: 'Roboto';
		font-style: italic;
		font-weight: 300;
		src: url('roboto-v20-latin-300italic.eot'); /* IE9 Compat Modes */
		src: local(''),
			url('./fonts/roboto/roboto-v20-latin-300italic.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
			url('./fonts/roboto/roboto-v20-latin-300italic.woff2') format('woff2'), /* Super Modern Browsers */
			url('./fonts/roboto/roboto-v20-latin-300italic.woff') format('woff'), /* Modern Browsers */
			url('./fonts/roboto/roboto-v20-latin-300italic.ttf') format('truetype'), /* Safari, Android, iOS */
			url('./fonts/roboto/roboto-v20-latin-300italic.svg#Roboto') format('svg'); /* Legacy iOS */
	}
	/* roboto-regular - latin */
	@font-face {
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 400;
		src: url('roboto-v20-latin-regular.eot'); /* IE9 Compat Modes */
		src: local(''),
			url('./fonts/roboto/roboto-v20-latin-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
			url('./fonts/roboto/roboto-v20-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
			url('./fonts/roboto/roboto-v20-latin-regular.woff') format('woff'), /* Modern Browsers */
			url('./fonts/roboto/roboto-v20-latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
			url('./fonts/roboto/roboto-v20-latin-regular.svg#Roboto') format('svg'); /* Legacy iOS */
	}
	/* roboto-italic - latin */
	@font-face {
		font-family: 'Roboto';
		font-style: italic;
		font-weight: 400;
		src: url('roboto-v20-latin-italic.eot'); /* IE9 Compat Modes */
		src: local(''),
			url('./fonts/roboto/roboto-v20-latin-italic.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
			url('./fonts/roboto/roboto-v20-latin-italic.woff2') format('woff2'), /* Super Modern Browsers */
			url('./fonts/roboto/roboto-v20-latin-italic.woff') format('woff'), /* Modern Browsers */
			url('./fonts/roboto/roboto-v20-latin-italic.ttf') format('truetype'), /* Safari, Android, iOS */
			url('./fonts/roboto/roboto-v20-latin-italic.svg#Roboto') format('svg'); /* Legacy iOS */
	}
	/* roboto-500italic - latin */
	@font-face {
		font-family: 'Roboto';
		font-style: italic;
		font-weight: 500;
		src: url('roboto-v20-latin-500italic.eot'); /* IE9 Compat Modes */
		src: local(''),
			url('./fonts/roboto/roboto-v20-latin-500italic.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
			url('./fonts/roboto/roboto-v20-latin-500italic.woff2') format('woff2'), /* Super Modern Browsers */
			url('./fonts/roboto/roboto-v20-latin-500italic.woff') format('woff'), /* Modern Browsers */
			url('./fonts/roboto/roboto-v20-latin-500italic.ttf') format('truetype'), /* Safari, Android, iOS */
			url('./fonts/roboto/roboto-v20-latin-500italic.svg#Roboto') format('svg'); /* Legacy iOS */
	}
	/* roboto-500 - latin */
	@font-face {
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 500;
		src: url('roboto-v20-latin-500.eot'); /* IE9 Compat Modes */
		src: local(''),
			url('./fonts/roboto/roboto-v20-latin-500.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
			url('./fonts/roboto/roboto-v20-latin-500.woff2') format('woff2'), /* Super Modern Browsers */
			url('./fonts/roboto/roboto-v20-latin-500.woff') format('woff'), /* Modern Browsers */
			url('./fonts/roboto/roboto-v20-latin-500.ttf') format('truetype'), /* Safari, Android, iOS */
			url('./fonts/roboto/roboto-v20-latin-500.svg#Roboto') format('svg'); /* Legacy iOS */
	}
	/* roboto-700italic - latin */
	@font-face {
		font-family: 'Roboto';
		font-style: italic;
		font-weight: 700;
		src: url('roboto-v20-latin-700italic.eot'); /* IE9 Compat Modes */
		src: local(''),
			url('./fonts/roboto/roboto-v20-latin-700italic.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
			url('./fonts/roboto/roboto-v20-latin-700italic.woff2') format('woff2'), /* Super Modern Browsers */
			url('./fonts/roboto/roboto-v20-latin-700italic.woff') format('woff'), /* Modern Browsers */
			url('./fonts/roboto/roboto-v20-latin-700italic.ttf') format('truetype'), /* Safari, Android, iOS */
			url('./fonts/roboto/roboto-v20-latin-700italic.svg#Roboto') format('svg'); /* Legacy iOS */
	}
	/* roboto-700 - latin */
	@font-face {
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 700;
		src: url('roboto-v20-latin-700.eot'); /* IE9 Compat Modes */
		src: local(''),
			url('./fonts/roboto/roboto-v20-latin-700.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
			url('./fonts/roboto/roboto-v20-latin-700.woff2') format('woff2'), /* Super Modern Browsers */
			url('./fonts/roboto/roboto-v20-latin-700.woff') format('woff'), /* Modern Browsers */
			url('./fonts/roboto/roboto-v20-latin-700.ttf') format('truetype'), /* Safari, Android, iOS */
			url('./fonts/roboto/roboto-v20-latin-700.svg#Roboto') format('svg'); /* Legacy iOS */
	}
`;

export default DefaultFontStyles;
