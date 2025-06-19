/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

/* eslint-disable no-console */

// api-extractor trims out module augmentations. This script is a workaround for it.
// See also https://github.com/microsoft/rushstack/issues/1709
import * as fs from 'fs/promises';
import * as path from 'node:path';
import ts from 'typescript';

const from = '../src/types/emotion.ts';
const to = '../dist/zapp-ui.bundle.d.ts';

async function extractModuleDeclarations(source: string): Promise<string> {
	const sourceFileContent = await fs.readFile(path.join(__dirname, source), 'utf8');
	const sourceFile = ts.createSourceFile(source, sourceFileContent, ts.ScriptTarget.Latest);

	const moduleDeclarations: string[] = [];

	function visitNode(node: ts.Node): void {
		if (ts.isModuleDeclaration(node)) {
			moduleDeclarations.push(node.getText(sourceFile));
		}
		ts.forEachChild(node, visitNode);
	}

	visitNode(sourceFile);

	return moduleDeclarations.join('\n');
}

async function writeToFile(destinationFile: string, content: string): Promise<void> {
	await fs.appendFile(destinationFile, `\n${content}\n`);
}

async function main(): Promise<void> {
	console.log('Injecting module augmentations');
	const extractedDeclarations = await extractModuleDeclarations(from);
	await writeToFile(path.join(__dirname, to), extractedDeclarations);
	console.log('Injection completed');
}

main().catch((error) => {
	console.error('Error:', error);
});
