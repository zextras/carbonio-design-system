/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import {
	autoUpdate,
	computePosition,
	ComputePositionConfig,
	ReferenceElement
} from '@floating-ui/dom';

export function setupFloating(
	reference: ReferenceElement,
	floating: HTMLElement,
	options?: Partial<ComputePositionConfig>
): ReturnType<typeof autoUpdate> {
	return autoUpdate(reference, floating, () => {
		computePosition(reference, floating, options).then(({ x, y }) => {
			Object.assign(floating.style, {
				left: `${x}px`,
				top: `${y}px`
			});
		});
	});
}
