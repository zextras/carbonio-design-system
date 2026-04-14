/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [
		react({
			babel: {
				plugins: [['@emotion/babel-plugin']]
			}
		})
	],
	resolve: {
		alias: {
			'@testing-library/user-event/dist/cjs/keyboard/keyMap':
				'@testing-library/user-event/dist/cjs/keyboard/keyMap.js'
		}
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./src/tests/vitest-env-setup.ts'],
		restoreMocks: true,
		reporters: ['default', 'junit'],
		outputFile: {
			junit: './junit.xml'
		},
		fakeTimers: {
			shouldAdvanceTime: true
		},
		testTimeout: 60000,
		coverage: {
			enabled: true,
			provider: 'v8',
			include: ['src/**/*.{js,ts,tsx,jsx}'],
			exclude: [
				'**/node_modules/**',
				'src/tests/**',
				'src/types/**',
				'src/icons/tsTemplate.ts',
				'src/**/stories-helpers.ts?(x)',
				'src/**/*.stories.tsx'
			],
			reportsDirectory: 'coverage',
			reporter: ['text', 'lcov', 'cobertura']
		},
		css: {
			modules: {
				classNameStrategy: 'non-scoped'
			}
		}
	}
});
