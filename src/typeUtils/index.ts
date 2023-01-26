/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
export type NonEmptyArray<T> = [T, ...T[]];

export type SingleItemArray<T> = [T] | [];
