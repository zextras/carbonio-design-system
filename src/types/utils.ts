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

export type LiteralUnion<TSub, TBase> = TSub | (TBase & Record<never, never>);

export type PaletteColor = keyof DefaultTheme['palette'];

export type AnyColor = LiteralUnion<PaletteColor, string>;

export type WithPrefix<TString extends string, TPrefix extends string> = `${TPrefix}${TString}`;

export type WithoutPrefix<
	TString extends string,
	TPrefix extends string
> = TString extends `${TPrefix}${infer S}` ? S : TString;

export type KeysWithPrefix<
	TObject,
	TPrefix extends string,
	TKeys extends keyof TObject = keyof TObject
> = {
	[K in TKeys as K extends string ? WithPrefix<K, TPrefix> : never]: TObject[K];
};

export type KeysWithoutPrefix<
	TObject,
	TPrefix extends string,
	TKeys extends keyof TObject = keyof TObject
> = {
	[K in TKeys as K extends string ? WithoutPrefix<K, TPrefix> : never]: TObject[K];
};

export type With$Prefix<TProps> = KeysWithPrefix<TProps, '$'>;

export type Without$Prefix<TProps> = KeysWithoutPrefix<TProps, '$'>;

export type MakeRequired<TObj, TKey extends keyof TObj> = TObj & Required<Pick<TObj, TKey>>;

export type AllKeys<TObj> = TObj extends unknown ? keyof TObj : never;
