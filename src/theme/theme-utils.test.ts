/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { Theme } from './theme';
import type { ThemeColorObj } from './theme';
import { generateHighlightSet, getPadding } from './theme-utils';

describe('Theme Utils', () => {
	describe('getPadding', () => {
		describe('from string', () => {
			test('with 1 css value', () => {
				const initial = '0.625rem';
				const result = getPadding(initial, Theme);
				expect(result).toBe('0.625rem');
			});

			test('with 2 css values', () => {
				const initial = '0.625rem 1.25rem';
				const result = getPadding(initial, Theme);
				expect(result).toBe('0.625rem 1.25rem');
			});

			test('with 3 css values', () => {
				const initial = '0.625rem 1.25rem 1.875rem';
				const result = getPadding(initial, Theme);
				expect(result).toBe('0.625rem 1.25rem 1.875rem');
			});

			test('with 4 css values', () => {
				const initial = '0.625rem 1.25rem 1.875rem 2.5rem';
				const result = getPadding(initial, Theme);
				expect(result).toBe('0.625rem 1.25rem 1.875rem 2.5rem');
			});

			test('with 1 theme key', () => {
				const initial = 'extrasmall';
				const result = getPadding(initial, Theme);
				expect(result).toBe('0.25rem');
			});

			test('with 2 theme keys', () => {
				const initial = 'extrasmall small';
				const result = getPadding(initial, Theme);
				expect(result).toBe('0.25rem 0.5rem');
			});

			test('with 3 theme keys', () => {
				const initial = 'extrasmall small medium';
				const result = getPadding(initial, Theme);
				expect(result).toBe('0.25rem 0.5rem 0.75rem');
			});

			test('with 4 theme keys', () => {
				const initial = 'extrasmall small medium large';
				const result = getPadding(initial, Theme);
				expect(result).toBe('0.25rem 0.5rem 0.75rem 1rem');
			});

			test('with mixed values and keys', () => {
				const initial = 'extrasmall 1.25rem 1.875rem large';
				const result = getPadding(initial, Theme);
				expect(result).toBe('0.25rem 1.25rem 1.875rem 1rem');
			});
		});

		describe('from object', () => {
			describe('with value property', () => {
				test('et as value', () => {
					const initial = { value: '1rem' };
					const result = getPadding(initial, Theme);
					expect(result).toBe('1rem');
				});

				test('set as key', () => {
					const initial = { value: 'extrasmall' };
					const result = getPadding(initial, Theme);
					expect(result).toBe('0.25rem');
				});

				test('set as mix of value and keys', () => {
					const initial = { value: 'extrasmall 1rem extralarge' };
					const result = getPadding(initial, Theme);
					expect(result).toBe('0.25rem 1rem 1.5rem');
				});
			});

			describe('with all property', () => {
				test('set as value', () => {
					const initial = { all: '1rem' };
					const result = getPadding(initial, Theme);
					expect(result).toBe('1rem');
				});

				test('set as key', () => {
					const initial = { all: 'extrasmall' };
					const result = getPadding(initial, Theme);
					expect(result).toBe('0.25rem');
				});

				test('set as mix of value and keys', () => {
					const initial = { all: 'extrasmall 1rem extralarge' };
					const result = getPadding(initial, Theme);
					expect(result).toBe('0.25rem 1rem 1.5rem');
				});
			});

			describe('with vertical and horizontal properties', () => {
				test('set as value', () => {
					const initial = { vertical: '1rem' };
					const result = getPadding(initial, Theme);
					expect(result).toBe('1rem 0 1rem 0');
				});

				test('set as key', () => {
					const initial = { horizontal: 'extrasmall' };
					const result = getPadding(initial, Theme);
					expect(result).toBe('0 0.25rem 0 0.25rem');
				});

				test('set as mix of value and keys', () => {
					const initial = { vertical: 'extrasmall', horizontal: '1rem' };
					const result = getPadding(initial, Theme);
					expect(result).toBe('0.25rem 1rem 0.25rem 1rem');
				});
			});

			describe('with top, right, bottom, left properties', () => {
				test('set as value', () => {
					const initial = { top: '1rem' };
					const result = getPadding(initial, Theme);
					expect(result).toBe('1rem 0 0 0');
				});

				test('set as key', () => {
					const initial = { top: 'extrasmall', right: 'small', bottom: 'medium', left: 'large' };
					const result = getPadding(initial, Theme);
					expect(result).toBe('0.25rem 0.5rem 0.75rem 1rem');
				});

				test('set as mix of value and keys', () => {
					const initial = { bottom: 'extrasmall', left: '1rem' };
					const result = getPadding(initial, Theme);
					expect(result).toBe('0 0 0.25rem 1rem');
				});
			});
		});
	});

	describe('generate highlight color set', () => {
		test('transform a partial set in a complete set', () => {
			const from = { regular: '#2b73d2' };
			const expected = {
				regular: expect.stringMatching(/#\w{6}/),
				hover: expect.stringMatching(/#\w{6}/),
				active: expect.stringMatching(/#\w{6}/),
				focus: expect.stringMatching(/#\w{6}/),
				disabled: expect.stringMatching(/#\w{6}/)
			};

			const result = generateHighlightSet(from);
			expect(result).toEqual<ThemeColorObj>(expect.objectContaining(expected));
		});

		test('transform the regular value applying the the rule H = H + 1, S = S - 1, L = Min(L + 40, 90)', () => {
			const from = ['#2B73D2', '#E60000', '#DA1D52', '#542D84', '#FCB136'];
			const expected = ['#D5E3F6', '#FFB4B3', '#F8C9D6', '#BDA1DE', '#FEECCD'];
			expect(from.length).toBe(expected.length);
			from.forEach((fromColor, index) => {
				const result = generateHighlightSet({ regular: fromColor });
				expect(result.regular.toUpperCase()).toBe(expected[index].toUpperCase());
			});
			expect.assertions(from.length + 1);
		});
	});
});
