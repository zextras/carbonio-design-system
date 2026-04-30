/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

/**
 * @types/jest-image-snapshot pulls in @types/jest via a triple-slash directive,
 * which replaces Vitest's global `test`/`it` type with Jest's `It` interface.
 * Jest's `It` has `failing` but not `fails`. This augmentation adds `fails`
 * so that `test.fails(...)` is recognized by TypeScript.
 */
declare namespace jest {
	interface It {
		/**
		 * Marks a test as expected to fail. The test will pass only if
		 * the test function throws an error. (Vitest API)
		 */
		fails: It;
	}
}
