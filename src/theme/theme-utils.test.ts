/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { Theme } from './theme';
import { getPadding } from './theme-utils';

describe('getPadding', () => {
	describe('from string', () => {
		test('with 1 css value', () => {
			const initial = '10px';
			const result = getPadding(initial, Theme);
			expect(result).toBe('10px');
		});

		test('with 2 css values', () => {
			const initial = '10px 20px';
			const result = getPadding(initial, Theme);
			expect(result).toBe('10px 20px');
		});

		test('with 3 css values', () => {
			const initial = '10px 20px 30px';
			const result = getPadding(initial, Theme);
			expect(result).toBe('10px 20px 30px');
		});

		test('with 4 css values', () => {
			const initial = '10px 20px 30px 40px';
			const result = getPadding(initial, Theme);
			expect(result).toBe('10px 20px 30px 40px');
		});

		test('with 1 theme key', () => {
			const initial = 'extrasmall';
			const result = getPadding(initial, Theme);
			expect(result).toBe('4px');
		});

		test('with 2 theme keys', () => {
			const initial = 'extrasmall small';
			const result = getPadding(initial, Theme);
			expect(result).toBe('4px 8px');
		});

		test('with 3 theme keys', () => {
			const initial = 'extrasmall small medium';
			const result = getPadding(initial, Theme);
			expect(result).toBe('4px 8px 12px');
		});

		test('with 4 theme keys', () => {
			const initial = 'extrasmall small medium large';
			const result = getPadding(initial, Theme);
			expect(result).toBe('4px 8px 12px 16px');
		});

		test('with mixed values and keys', () => {
			const initial = 'extrasmall 20px 30px large';
			const result = getPadding(initial, Theme);
			expect(result).toBe('4px 20px 30px 16px');
		});
	});

	describe('from object', () => {
		describe('with value property', () => {
			test('et as value', () => {
				const initial = { value: '15px' };
				const result = getPadding(initial, Theme);
				expect(result).toBe('15px');
			});

			test('set as key', () => {
				const initial = { value: 'extrasmall' };
				const result = getPadding(initial, Theme);
				expect(result).toBe('4px');
			});

			test('set as mix of value and keys', () => {
				const initial = { value: 'extrasmall 15px extralarge' };
				const result = getPadding(initial, Theme);
				expect(result).toBe('4px 15px 24px');
			});
		});

		describe('with all property', () => {
			test('set as value', () => {
				const initial = { all: '15px' };
				const result = getPadding(initial, Theme);
				expect(result).toBe('15px');
			});

			test('set as key', () => {
				const initial = { all: 'extrasmall' };
				const result = getPadding(initial, Theme);
				expect(result).toBe('4px');
			});

			test('set as mix of value and keys', () => {
				const initial = { all: 'extrasmall 15px extralarge' };
				const result = getPadding(initial, Theme);
				expect(result).toBe('4px 15px 24px');
			});
		});

		describe('with vertical and horizontal properties', () => {
			test('set as value', () => {
				const initial = { vertical: '15px' };
				const result = getPadding(initial, Theme);
				expect(result).toBe('15px 0 15px 0');
			});

			test('set as key', () => {
				const initial = { horizontal: 'extrasmall' };
				const result = getPadding(initial, Theme);
				expect(result).toBe('0 4px 0 4px');
			});

			test('set as mix of value and keys', () => {
				const initial = { vertical: 'extrasmall', horizontal: '15px' };
				const result = getPadding(initial, Theme);
				expect(result).toBe('4px 15px 4px 15px');
			});
		});

		describe('with top, right, bottom, left properties', () => {
			test('set as value', () => {
				const initial = { top: '15px' };
				const result = getPadding(initial, Theme);
				expect(result).toBe('15px 0 0 0');
			});

			test('set as key', () => {
				const initial = { top: 'extrasmall', right: 'small', bottom: 'medium', left: 'large' };
				const result = getPadding(initial, Theme);
				expect(result).toBe('4px 8px 12px 16px');
			});

			test('set as mix of value and keys', () => {
				const initial = { bottom: 'extrasmall', left: '15px' };
				const result = getPadding(initial, Theme);
				expect(result).toBe('0 0 4px 15px');
			});
		});
	});
});
