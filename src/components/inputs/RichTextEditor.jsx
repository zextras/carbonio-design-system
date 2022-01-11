/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

/* eslint-disable react/jsx-pascal-case */
import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tinymce from 'tinymce/tinymce';

import 'tinymce/icons/default';

import 'tinymce/themes/silver';

import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/code';
import 'tinymce/plugins/print';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/table';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/help';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/quickbars';

// eslint-disable-next-line import/extensions
import { Editor as _TinyMCE } from '@tinymce/tinymce-react/lib/cjs/main/ts/index.js';

// Toolbar: alignleft aligncenter alignright alignjustify |

export function RichTextEditor({
	onEditorChange,
	inline,
	initialValue,
	value,
	baseAssetsUrl,
	...rest
}) {
	const [content, setContent] = useState(initialValue);
	const _onEditorChange = useCallback(
		(newContent, editor) => {
			setContent(newContent);
			onEditorChange([
				editor.getContent({ format: 'text' }),
				editor.getContent({ format: 'html' })
			]);
		},
		[setContent, onEditorChange]
	);
	useEffect(() => setContent(value), [value]);

	return (
		<_TinyMCE
			value={content}
			init={{
				skin_url: `${baseAssetsUrl}/tinymce/skins/ui/oxide`,
				content_css: `${baseAssetsUrl}/tinymce/skins/content/default/content.css`,
				height: 500,
				menubar: false,
				statusbar: false,
				branding: false,
				resize: false,
				inline,
				plugins: [
					'advlist',
					'autolink',
					'lists',
					'link',
					'image',
					'charmap',
					'print',
					'preview',
					'anchor',
					'searchreplace',
					'code',
					'fullscreen',
					'insertdatetime',
					'media',
					'table',
					'paste',
					'code',
					'help',
					'quickbars'
				],
				toolbar: inline
					? false
					: // eslint-disable-next-line max-len
					  'formatselect | bold italic underline | forecolor backcolor | bullist numlist outdent indent | removeformat',
				quickbars_insert_toolbar: inline ? 'bullist numlist' : '',
				quickbars_selection_toolbar: inline
					? 'bold italic underline | forecolor backcolor | removeformat | quicklink'
					: 'quicklink',
				contextmenu: inline ? '' : ''
			}}
			onEditorChange={_onEditorChange}
			{...rest}
		/>
	);
}

RichTextEditor.propTypes = {
	/** The callback invoked when an edit is performed into the editor. `([text, html]) => {}` */
	onEditorChange: PropTypes.func,
	/** Enable the distraction-free mode */
	inline: PropTypes.bool,
	/** The initial content of the editor */
	initialValue: PropTypes.string,
	/** The content of the editor (controlled mode) */
	value: PropTypes.string,
	/** The base url to append to the resource urls */
	baseAssetsUrl: PropTypes.string
};

RichTextEditor.defaultProps = {
	inline: false,
	onEditorChange: undefined,
	initialValue: undefined,
	value: undefined,
	baseAssetsUrl: ''
};
