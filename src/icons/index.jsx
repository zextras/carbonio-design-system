/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as fillData from './fill';
import * as outlineData from './outline';
import { Logo } from './logo';

export default { ...fillData, ...outlineData, Logo };
