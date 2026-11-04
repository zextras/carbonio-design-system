/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useEffect, useRef } from 'react';

import { loadEmojiMart } from './loadEmojiMart';
import { useCombinedRefs } from '../../../hooks/useCombinedRefs';

/** The emoji passed to `onEmojiSelect`. */
type Emoji = {
	id: string;
	name: string;
	native: string;
	unified: string;
	keywords: string[];
	shortcodes: string;
	/** Only for emojis with skin tones: the selected tone, from 1 to 6 */
	skin?: number;
	aliases?: string[];
	emoticons?: string[];
};

/**
 * The emoji-mart Picker options, except custom emojis, image sets and the options removing emojis,
 * since emoji-mart would remove them from every picker of the page.
 * Values that emoji-mart does not support fall back to its defaults.
 * Function options are compared by identity, so memoize them to avoid rebuilding the picker on every render.
 *
 * emoji-mart keeps its translations at page level, so `locale` and `i18n` are the ones of the last picker created,
 * for every picker of the page, including those of other modules.
 *
 * @see https://github.com/missive/emoji-mart#options--props
 */
type EmojiPickerOptions = {
	/** Locales other than `en` are downloaded by emoji-mart from its CDN, unless `i18n` is given */
	locale?: string;
	/** Translations, e.g. the content of `@emoji-mart/data/i18n/<locale>.json` */
	i18n?: Record<string, unknown>;
	theme?: 'auto' | 'light' | 'dark';
	set?: 'native' | 'apple' | 'facebook' | 'google' | 'twitter';
	icons?: 'auto' | 'outline' | 'solid';
	previewPosition?: 'top' | 'bottom' | 'none';
	previewEmoji?: string;
	searchPosition?: 'sticky' | 'static' | 'none';
	navPosition?: 'top' | 'bottom' | 'none';
	skinTonePosition?: 'preview' | 'search' | 'none';
	skin?: 1 | 2 | 3 | 4 | 5 | 6;
	perLine?: number;
	dynamicWidth?: boolean;
	maxFrequentRows?: number;
	emojiSize?: number;
	emojiButtonSize?: number;
	emojiButtonRadius?: string;
	emojiButtonColors?: string[];
	emojiVersion?: number;
	/** Category ids, in the order they are shown. All the categories when not given */
	categories?: string[];
	noResultsEmoji?: string;
	autoFocus?: boolean;
	onClickOutside?: (event: MouseEvent) => void;
};

type EmojiPickerProps = EmojiPickerOptions & {
	/** Callback called with the emoji selected in the picker */
	onEmojiSelect: (emoji: Emoji) => void;
	/** Class applied to the element hosting the picker */
	className?: string;
	/** Style applied to the element hosting the picker */
	style?: React.CSSProperties;
	/** Id of the element hosting the picker */
	id?: string;
	/** Test id of the element hosting the picker */
	'data-testid'?: string;
};

const ALL_CATEGORIES = [
	'frequent',
	'people',
	'nature',
	'foods',
	'activity',
	'places',
	'objects',
	'symbols',
	'flags'
];

const isSameOption = (a: unknown, b: unknown): boolean =>
	a === b ||
	(typeof a === 'object' && typeof b === 'object' && JSON.stringify(a) === JSON.stringify(b));

const areSameOptions = (a: EmojiPickerOptions, b: EmojiPickerOptions): boolean => {
	const keys = Object.keys(a) as Array<keyof EmojiPickerOptions>;
	return keys.length === Object.keys(b).length && keys.every((key) => isSameOption(a[key], b[key]));
};

/** Returns the same object until the options change, even if the caller creates them on every render */
const useStableOptions = (options: EmojiPickerOptions): EmojiPickerOptions => {
	const stableOptionsRef = useRef(options);
	if (!areSameOptions(stableOptionsRef.current, options)) {
		stableOptionsRef.current = options;
	}
	return stableOptionsRef.current;
};

/**
 * The emoji-mart picker, rendered inside a div.
 * emoji-mart is loaded the first time a picker is mounted, so the picker appears asynchronously.
 * It is shared by all the modules through the design system, since its custom element can be registered only once per page.
 */
const EmojiPicker = React.forwardRef<HTMLDivElement, EmojiPickerProps>(function EmojiPickerFn(
	{ onEmojiSelect, className, style, id, 'data-testid': dataTestId, ...options },
	ref
) {
	const hostRef = useCombinedRefs<HTMLDivElement>(ref);

	// the picker calls the latest callback, so a new callback does not rebuild it
	const onEmojiSelectRef = useRef(onEmojiSelect);
	useEffect(() => {
		onEmojiSelectRef.current = onEmojiSelect;
	}, [onEmojiSelect]);

	const stableOptions = useStableOptions(options);

	useEffect(() => {
		let unmounted = false;
		let picker: HTMLElement | undefined;
		loadEmojiMart()
			.then(({ Picker, data }): void => {
				if (unmounted) {
					return;
				}
				picker = new Picker({
					...stableOptions,
					// emoji-mart keeps the categories of the last picker that set them
					categories: stableOptions.categories ?? ALL_CATEGORIES,
					// many systems, e.g. Windows, cannot display country flags, also in the mails and messages they are sent in.
					// Every picker hides them, since emoji-mart keeps them in the search if the first picker shows them
					noCountryFlags: true,
					data,
					onEmojiSelect: (emoji: Emoji): void => onEmojiSelectRef.current(emoji),
					ref: hostRef
				});
			})
			.catch((error: unknown) => {
				console.error('Unable to load the emoji picker', error);
			});
		return (): void => {
			unmounted = true;
			picker?.remove();
		};
	}, [hostRef, stableOptions]);

	return <div ref={hostRef} className={className} style={style} id={id} data-testid={dataTestId} />;
});

export type { Emoji, EmojiPickerOptions, EmojiPickerProps };
export { EmojiPicker };
