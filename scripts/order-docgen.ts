/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as fs from 'fs/promises';

const filePath = '.storybook/docgen-output.json';

type Output = Record<string, { displayName: string }[]>;

async function getDocgenOutput(): Promise<Output> {
	const data = await fs.readFile(filePath, { encoding: 'utf8' });
	return JSON.parse(data);
}

function orderOutput(output: Output): Output {
	return Object.keys(output)
		.sort((keyA, keyB) => {
			const displayNameA = output[keyA][0].displayName;
			const displayNameB = output[keyB][0].displayName;
			return displayNameA.localeCompare(displayNameB);
		})
		.reduce((acc: Output, key: string) => {
			acc[key] = output[key];
			return acc;
		}, {});
}

async function overwriteFile(sortedData: Output): Promise<void> {
	await fs.writeFile(filePath, JSON.stringify(sortedData, null, 2));
}

async function main(): Promise<void> {
	const docgenOutput = await getDocgenOutput();
	console.log('Docgen output generated');
	const orderedOutput = orderOutput(docgenOutput);
	await overwriteFile(orderedOutput);
	console.log('Docgen output sorted in alphabetical order');
}

main().catch((error) => {
	console.error('Error:', error);
});
