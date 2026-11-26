/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

/**
 * Whether the key belongs to an IME composition (e.g. Chinese or Japanese text): it must reach the composition
 * instead of moving, choosing or closing the options. Safari sends the enter that ends a composition after
 * compositionend, with isComposing false and keyCode 229.
 */
export function isComposingKey(event: KeyboardEvent): boolean {
	// keyCode is deprecated, but it is the only mark of that last Safari keydown
	return event.isComposing || event.keyCode === 229;
}
