/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { EmojiMartData } from '@emoji-mart/data';

// emoji-mart's typings declare a base class TypeScript cannot resolve, hiding the HTMLElement members
type PickerConstructor = new (props: Record<string, unknown>) => HTMLElement;

// emoji-mart's typings name the get function _get1
type FrequentlyUsed = {
	get: (options: { maxFrequentRows: number; perLine: number }) => string[];
};

type Store = {
	get: (key: string) => unknown;
};

type EmojiMart = {
	Picker: PickerConstructor;
	data: EmojiMartData;
};

let emojiMartPromise: Promise<EmojiMart> | undefined;

/**
 * emoji-mart deletes from the frequently used emojis, also in the local storage, the ones a picker does not show.
 * Since the modules share emoji-mart, a picker showing only a few of them would delete them from every picker,
 * so each picker gets only the ones it shows, and the others are kept.
 */
const keepFrequentlyUsed = (frequentlyUsed: FrequentlyUsed, store: Store): void => {
	const { get } = frequentlyUsed;
	// eslint-disable-next-line no-param-reassign
	frequentlyUsed.get = ({ maxFrequentRows, perLine }): string[] => {
		if (!maxFrequentRows) {
			return [];
		}
		// with no limit, emoji-mart returns all of them, sorted by use, and deletes none
		const emojiIds = get({ maxFrequentRows: Infinity, perLine });
		const max = maxFrequentRows * perLine;
		if (emojiIds.length <= max) {
			return emojiIds;
		}
		const shownIds = emojiIds.slice(0, max);
		// as emoji-mart does, the last selected emoji is always shown
		const last = store.get('last');
		if (typeof last === 'string' && !shownIds.includes(last)) {
			shownIds.splice(-1, 1, last);
		}
		return shownIds;
	};
};

/**
 * Loads emoji-mart and its data the first time a picker is opened, so they stay out of the bundle
 * of whoever imports the design system (the shell, which shares it with the modules).
 */
export const loadEmojiMart = (): Promise<EmojiMart> => {
	emojiMartPromise ??= Promise.all([
		import(/* webpackChunkName: "emoji-mart" */ 'emoji-mart'),
		import(/* webpackChunkName: "emoji-mart-data" */ '@emoji-mart/data')
	]).then(
		([{ Picker, FrequentlyUsed: frequentlyUsed, Store: store }, { default: data }]) => {
			keepFrequentlyUsed(frequentlyUsed as unknown as FrequentlyUsed, store);
			return {
				Picker: Picker as unknown as PickerConstructor,
				data: data as EmojiMartData
			};
		},
		(error: unknown) => {
			// let the next picker retry, e.g. after a chunk failed to download
			emojiMartPromise = undefined;
			throw error;
		}
	);
	return emojiMartPromise;
};
