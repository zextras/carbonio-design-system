/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { createRef } from 'react';

import itI18n from '@emoji-mart/data/i18n/it.json' with { type: 'json' };
import { act, waitFor } from '@testing-library/react';
import { FrequentlyUsed, Picker } from 'emoji-mart';

import { EmojiPicker } from './EmojiPicker';
import { loadEmojiMart } from './loadEmojiMart';
import { screen, setup, within } from '../../../tests/utils';

type PickerElement = HTMLElement & { props: Record<string, unknown> };

const HOST_TEST_ID = 'emoji-picker-host';
const EMOJI_MART = 'emoji-mart';

const getPickers = (): NodeListOf<PickerElement> =>
	// em-emoji-picker has no role or text to query it by
	// eslint-disable-next-line testing-library/no-node-access
	screen.getByTestId(HOST_TEST_ID).querySelectorAll<PickerElement>('em-emoji-picker');

const findPicker = async (): Promise<PickerElement> => {
	await waitFor(() => expect(getPickers()).toHaveLength(1));
	return getPickers()[0];
};

const getFrequentlyUsedEmojis = (picker: PickerElement): string[] =>
	Array.from(
		// the categories have no role to query them by
		// eslint-disable-next-line testing-library/no-node-access
		picker.shadowRoot?.querySelectorAll('[data-id="frequent"] button') ?? [],
		(button) => button.getAttribute('aria-label') ?? ''
	);

describe('EmojiPicker', () => {
	beforeAll(async () => {
		// emoji-mart registers its custom elements when loaded, before any test mocks the registry
		await loadEmojiMart();
	});

	it('renders the host element with the given attributes and forwards the ref to it', () => {
		const ref = createRef<HTMLDivElement>();
		setup(
			<EmojiPicker
				ref={ref}
				onEmojiSelect={vi.fn()}
				data-testid={HOST_TEST_ID}
				className="custom-class"
				id="custom-id"
				style={{ width: '22rem' }}
			/>
		);

		const host = screen.getByTestId(HOST_TEST_ID);
		expect(host).toHaveClass('custom-class');
		expect(host).toHaveAttribute('id', 'custom-id');
		expect(host).toHaveStyle({ width: '22rem' });
		expect(ref.current).toBe(host);
	});

	it('appends the emoji-mart picker to the host once emoji-mart is loaded', async () => {
		setup(<EmojiPicker onEmojiSelect={vi.fn()} data-testid={HOST_TEST_ID} />);

		expect(await findPicker()).toBeInstanceOf(Picker);
	});

	it('passes the options to the picker', async () => {
		const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(Response.json(itI18n));
		setup(
			<EmojiPicker
				onEmojiSelect={vi.fn()}
				data-testid={HOST_TEST_ID}
				theme="dark"
				locale="it"
				perLine={7}
				previewPosition="none"
			/>
		);

		const picker = await findPicker();
		expect(picker.props).toEqual(
			expect.objectContaining({ theme: 'dark', locale: 'it', perLine: 7, previewPosition: 'none' })
		);
		// emoji-mart downloads the translations of the locale
		await waitFor(() =>
			expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining('/i18n/it.json'))
		);
	});

	it('always hides the country flags', async () => {
		setup(<EmojiPicker onEmojiSelect={vi.fn()} data-testid={HOST_TEST_ID} />);

		const picker = await findPicker();
		expect(picker.props).toEqual(expect.objectContaining({ noCountryFlags: true }));
	});

	it('shows all the categories when none are given, also after a picker showing only some', async () => {
		const { unmount } = setup(
			<EmojiPicker onEmojiSelect={vi.fn()} data-testid={HOST_TEST_ID} categories={['people']} />
		);
		const peoplePicker = within((await findPicker()).shadowRoot as unknown as HTMLElement);
		expect(await peoplePicker.findByRole('button', { name: 'Smileys & People' })).toBeVisible();
		expect(peoplePicker.queryByRole('button', { name: 'Flags' })).not.toBeInTheDocument();
		unmount();

		setup(<EmojiPicker onEmojiSelect={vi.fn()} data-testid={HOST_TEST_ID} />);

		const defaultPicker = within((await findPicker()).shadowRoot as unknown as HTMLElement);
		expect(await defaultPicker.findByRole('button', { name: 'Flags' })).toBeVisible();
	});

	it('keeps the frequently used emojis that a picker showing fewer of them does not show', async () => {
		const frequentlyUsed = {
			grinning: '😀',
			smiley: '😃',
			smile: '😄',
			grin: '😁',
			laughing: '😆',
			sweat_smile: '😅',
			rolling_on_the_floor_laughing: '🤣',
			joy: '😂',
			slightly_smiling_face: '🙂',
			upside_down_face: '🙃'
		};
		// used more than the emojis selected by the other tests
		Object.keys(frequentlyUsed).forEach((id) => {
			for (let i = 0; i < 100; i += 1) {
				FrequentlyUsed.add({ id });
			}
		});
		const { unmount } = setup(
			<EmojiPicker
				onEmojiSelect={vi.fn()}
				data-testid={HOST_TEST_ID}
				maxFrequentRows={1}
				perLine={7}
			/>
		);
		const onePicker = await findPicker();
		await waitFor(() => expect(getFrequentlyUsedEmojis(onePicker)).toHaveLength(7));
		unmount();

		setup(<EmojiPicker onEmojiSelect={vi.fn()} data-testid={HOST_TEST_ID} />);

		const defaultPicker = await findPicker();
		await waitFor(() =>
			expect(getFrequentlyUsedEmojis(defaultPicker)).toEqual(
				expect.arrayContaining(Object.values(frequentlyUsed))
			)
		);
		expect(Object.keys(JSON.parse(localStorage.getItem('emoji-mart.frequently') ?? '{}'))).toEqual(
			expect.arrayContaining(Object.keys(frequentlyUsed))
		);
	});

	it('calls onEmojiSelect with the emoji clicked in the picker', async () => {
		const onEmojiSelect = vi.fn();
		const { user } = setup(
			<EmojiPicker
				onEmojiSelect={onEmojiSelect}
				data-testid={HOST_TEST_ID}
				previewPosition="none"
			/>
		);

		const picker = await findPicker();
		const pickerContent = within(picker.shadowRoot as unknown as HTMLElement);
		// the emoji is both in the frequently used and in its own category
		const [emojiButton] = await pickerContent.findAllByRole('button', { name: '😀' });
		await user.click(emojiButton);

		expect(onEmojiSelect).toHaveBeenCalledTimes(1);
		expect(onEmojiSelect).toHaveBeenCalledWith(
			expect.objectContaining({ id: 'grinning', native: '😀', unified: '1f600' })
		);
	});

	it('calls the latest onEmojiSelect without rebuilding the picker', async () => {
		const firstOnEmojiSelect = vi.fn();
		const latestOnEmojiSelect = vi.fn();
		const { rerender } = setup(
			<EmojiPicker onEmojiSelect={firstOnEmojiSelect} data-testid={HOST_TEST_ID} />
		);
		const picker = await findPicker();

		rerender(<EmojiPicker onEmojiSelect={latestOnEmojiSelect} data-testid={HOST_TEST_ID} />);
		const onPickerEmojiSelect = picker.props.onEmojiSelect as (emoji: unknown) => void;
		act(() => onPickerEmojiSelect({ id: 'grinning' }));

		expect(getPickers()[0]).toBe(picker);
		expect(firstOnEmojiSelect).not.toHaveBeenCalled();
		expect(latestOnEmojiSelect).toHaveBeenCalledWith({ id: 'grinning' });
	});

	it('rebuilds the picker when an option changes, leaving only the new one in the host', async () => {
		const { rerender } = setup(
			<EmojiPicker onEmojiSelect={vi.fn()} data-testid={HOST_TEST_ID} theme="light" />
		);
		const lightPicker = await findPicker();

		rerender(<EmojiPicker onEmojiSelect={vi.fn()} data-testid={HOST_TEST_ID} theme="dark" />);

		// removed right away, not when the new picker replaces it
		expect(lightPicker).not.toBeInTheDocument();
		const darkPicker = await findPicker();
		expect(darkPicker.props).toEqual(expect.objectContaining({ theme: 'dark' }));
	});

	it('keeps the picker when the options are recreated with the same values', async () => {
		const { rerender } = setup(
			<EmojiPicker
				onEmojiSelect={vi.fn()}
				data-testid={HOST_TEST_ID}
				categories={['people', 'nature']}
			/>
		);
		const picker = await findPicker();

		rerender(
			<EmojiPicker
				onEmojiSelect={vi.fn()}
				data-testid={HOST_TEST_ID}
				categories={['people', 'nature']}
			/>
		);
		await act(() => loadEmojiMart());

		expect(getPickers()).toHaveLength(1);
		expect(getPickers()[0]).toBe(picker);
	});

	it('does not create the picker when unmounted before emoji-mart is loaded', async () => {
		let host: HTMLDivElement | null = null;
		const { unmount } = setup(
			<EmojiPicker
				ref={(element): void => {
					host ??= element;
				}}
				onEmojiSelect={vi.fn()}
			/>
		);

		unmount();
		await loadEmojiMart();

		expect(host).not.toBeNull();
		// the host is detached after the unmount, so it cannot be queried through the screen
		// eslint-disable-next-line testing-library/no-node-access
		expect(host!.querySelector('em-emoji-picker')).toBeNull();
	});
});

describe('EmojiPicker, when emoji-mart cannot be loaded', () => {
	afterEach(() => {
		vi.doUnmock(EMOJI_MART);
		vi.resetModules();
	});

	it('logs the error and loads emoji-mart again for the next picker', async () => {
		const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
		vi.resetModules();
		vi.doMock(EMOJI_MART, () => {
			throw new Error('chunk failed to load');
		});
		const { EmojiPicker: FreshEmojiPicker } = await import('./EmojiPicker');

		const { unmount } = setup(
			<FreshEmojiPicker onEmojiSelect={vi.fn()} data-testid={HOST_TEST_ID} />
		);
		await waitFor(() =>
			expect(consoleErrorSpy).toHaveBeenCalledWith(
				'Unable to load the emoji picker',
				expect.any(Error)
			)
		);
		expect(getPickers()).toHaveLength(0);
		unmount();

		vi.doUnmock(EMOJI_MART);
		setup(<FreshEmojiPicker onEmojiSelect={vi.fn()} data-testid={HOST_TEST_ID} />);

		expect(await findPicker()).toBeInstanceOf(HTMLElement);
	});
});
