/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import fs from 'fs';
import path from 'path';

import * as index from './index';

const fileREG = /^(.*)\.jsx?$/i;
const fileTestREG = /\.test\.jsx$/i;

describe('Index', () => {
	test('All basic components are exported', () => {
		const folderPath = path.resolve('src', 'components', 'basic');
		fs.readdirSync(folderPath).forEach((file) => {
			if (!fileREG.test(file) || fileTestREG.test(file)) return;
			const fileName = fileREG.exec(file)[1];
			expect(index).toHaveProperty(fileName);
		});
	});

	test('All layout components are exported', () => {
		const folderPath = path.resolve('src', 'components', 'layout');
		fs.readdirSync(folderPath).forEach((file) => {
			if (!fileREG.test(file) || fileTestREG.test(file)) return;
			const fileName = fileREG.exec(file)[1];
			expect(index).toHaveProperty(fileName);
		});
	});

	test('All inputs components are exported, except for `RichTextEditor`', () => {
		const folderPath = path.resolve('src', 'components', 'inputs');
		const blackList = ['RichTextEditor'];
		fs.readdirSync(folderPath).forEach((file) => {
			if (!fileREG.test(file) || fileTestREG.test(file)) return;
			const fileName = fileREG.exec(file)[1];
			if (blackList.includes(fileName)) expect(index).not.toHaveProperty(fileName);
			else expect(index).toHaveProperty(fileName);
		});
	});

	test('All navigation components are exported', () => {
		const folderPath = path.resolve('src', 'components', 'navigation');
		fs.readdirSync(folderPath).forEach((file) => {
			if (!fileREG.test(file) || fileTestREG.test(file)) return;
			const fileName = fileREG.exec(file)[1];
			expect(index).toHaveProperty(fileName);
		});
	});

	test('All display components are exported', () => {
		const folderPath = path.resolve('src', 'components', 'display');
		fs.readdirSync(folderPath).forEach((file) => {
			if (!fileREG.test(file) || fileTestREG.test(file)) return;
			const fileName = fileREG.exec(file)[1];
			expect(index).toHaveProperty(fileName);
		});
	});

	test('All feedback components are exported', () => {
		const folderPath = path.resolve('src', 'components', 'feedback');
		fs.readdirSync(folderPath).forEach((file) => {
			if (!fileREG.test(file) || fileTestREG.test(file)) return;
			const fileName = fileREG.exec(file)[1];
			expect(index).toHaveProperty(fileName);
		});
	});

	test('All utilities components are exported', () => {
		const folderPath = path.resolve('src', 'components', 'utilities');
		const blackList = ['functions'];
		fs.readdirSync(folderPath).forEach((file) => {
			if (!fileREG.test(file) || fileTestREG.test(file)) return;
			const fileName = fileREG.exec(file)[1];
			if (blackList.includes(fileName)) expect(index).not.toHaveProperty(fileName);
			else expect(index).toHaveProperty(fileName);
		});
	});

	test.skip('Only selected composite components are exported', () => {
		const folderPath = path.resolve('src', 'components', 'composite');
		const whiteList = [
			'DownloadFileButton',
			'FormSection',
			'GenericFileIcon',
			'Header',
			'MenuPanel',
			'NavigationPanel',
			'MessageBubble'
		];
		fs.readdirSync(folderPath).forEach((file) => {
			if (!fileREG.test(file) || fileTestREG.test(file)) return;
			const fileName = fileREG.exec(file)[1];
			if (!whiteList.includes(fileName)) expect(index).not.toHaveProperty(fileName);
			else expect(index).toHaveProperty(fileName);
		});
	});

	test('Theme utilities are exported', () => {
		expect(index).toHaveProperty('generateColorSet');
		expect(index).toHaveProperty('ThemeContext');
		expect(index).toHaveProperty('ThemeProvider');
		expect(index).toHaveProperty('ZimbraClassicThemeContextProvider');
	});

	test('Hooks are exported', () => {
		const folderPath = path.resolve('src', 'hooks');
		fs.readdirSync(folderPath).forEach((file) => {
			if (!fileREG.test(file) || fileTestREG.test(file)) return;
			const fileName = fileREG.exec(file)[1];
			expect(index).toHaveProperty(fileName);
		});
	});
});
