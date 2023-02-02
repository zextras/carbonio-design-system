/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { types as t } from '@babel/core';
import { TemplateBuilder } from '@babel/template';

interface Template {
	(variables: TemplateVariables, context: TemplateContext): t.Statement | t.Statement[];
}

interface JSXRuntimeImport {
	source: string;
	namespace?: string;
	specifiers?: string[];
}

interface State {
	componentName: string;
	caller?: { previousExport?: string | null };
}

interface Options {
	typescript?: boolean;
	titleProp?: boolean;
	descProp?: boolean;
	expandProps?: boolean | 'start' | 'end';
	ref?: boolean;
	template?: Template;
	state: State;
	native?: boolean;
	memo?: boolean;
	exportType?: 'named' | 'default';
	namedExport?: string;
	jsxRuntime?: 'automatic' | 'classic';
	jsxRuntimeImport?: JSXRuntimeImport;
	importSource?: string;
}

interface TemplateVariables {
	componentName: string;
	interfaces: t.TSInterfaceDeclaration[];
	props: (t.ObjectPattern | t.Identifier)[];
	imports: t.ImportDeclaration[];
	exports: (t.VariableDeclaration | t.ExportDeclaration | t.Statement)[];
	jsx: t.JSXElement;
}

interface TemplateContext {
	options: Options;
	tpl: TemplateBuilder<t.Statement | t.Statement[]>['ast'];
}

const tsTemplate: Template = (
	{ imports, interfaces, componentName, props, jsx, exports },
	{ tpl }
) => tpl`
${imports};

${interfaces};

const ${componentName} = (${props}): JSX.Element => (
  ${jsx}
);

${exports};
`;

export = tsTemplate;
