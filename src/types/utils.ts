/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { DefaultTheme } from 'styled-components';

export type NonEmptyArray<T> = [T, ...T[]];

export type SingleItemArray<T> = [T] | [];

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
	{
		[K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
	}[Keys];

export type PaletteColor = keyof DefaultTheme['palette'];

export type AnyColor = PaletteColor | (string & Record<never, never>);

export type Prefix<TString extends string, TPrefix extends string> = `${TPrefix}${TString}`;

export type WithPrefixedKeys<
	TObject,
	TPrefix extends string,
	TKeys extends keyof TObject = keyof TObject
> = {
	[K in TKeys as K extends string ? Prefix<K, TPrefix> : never]: TObject[K];
};

export type StyledComponentProps<TProps> = WithPrefixedKeys<TProps, '$'>;
