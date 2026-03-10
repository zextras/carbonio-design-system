/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

/**
 * Script to remove obsolete storybook images.
 *
 * Reads the Storybook index (storybook-static/index.json) to determine the valid
 * story IDs, then removes any image in .storybook-images/ that does not correspond
 * to an existing story.
 *
 * Usage:
 *   npm run clean:storybook-images
 *
 * Prerequisites:
 *   Storybook must be built first (npm run build:docs) so that
 *   storybook-static/index.json exists.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

const STORYBOOK_INDEX_PATH = path.resolve('storybook-static/index.json');
const STORYBOOK_IMAGES_DIR = path.resolve('.storybook-images');

interface StoryEntry {
	id: string;
	type: string;
}

interface StorybookIndex {
	entries: Record<string, StoryEntry>;
}

function getValidStoryIds(): Set<string> {
	if (!fs.existsSync(STORYBOOK_INDEX_PATH)) {
		console.error(
			`Error: Storybook index not found at ${STORYBOOK_INDEX_PATH}.\n` +
				'Run "npm run build:docs" first to generate it.'
		);
		process.exit(1);
	}

	const indexContent = fs.readFileSync(STORYBOOK_INDEX_PATH, 'utf-8');
	const index: StorybookIndex = JSON.parse(indexContent);

	const storyIds = new Set<string>();
	Object.entries(index.entries).forEach(([id, entry]) => {
		if (entry.type === 'story') {
			storyIds.add(id);
		}
	});
	return storyIds;
}

function getImageFiles(): string[] {
	if (!fs.existsSync(STORYBOOK_IMAGES_DIR)) {
		console.error(`Error: .storybook-images directory not found at ${STORYBOOK_IMAGES_DIR}.`);
		process.exit(1);
	}

	return fs
		.readdirSync(STORYBOOK_IMAGES_DIR)
		.filter((file) => file.endsWith('.png') && !file.startsWith('.'));
}

function run(): void {
	const validStoryIds = getValidStoryIds();
	const imageFiles = getImageFiles();

	console.log(`Found ${validStoryIds.size} stories in Storybook index.`);
	console.log(`Found ${imageFiles.length} images in .storybook-images/.`);

	// Image files are named {story-id}.png (customSnapshotIdentifier = context.id)
	const obsoleteFiles = imageFiles.filter((file) => {
		const storyId = file.replace(/\.png$/, '');
		return !validStoryIds.has(storyId);
	});

	if (obsoleteFiles.length === 0) {
		console.log('\nNo obsolete images found. Everything is up to date.');
		return;
	}

	console.log(`\nFound ${obsoleteFiles.length} obsolete image(s):\n`);

	obsoleteFiles.forEach((file) => {
		const filePath = path.join(STORYBOOK_IMAGES_DIR, file);
		fs.unlinkSync(filePath);
		console.log(`  Deleted: ${file}`);
	});

	console.log(`\nDone. Removed ${obsoleteFiles.length} obsolete image(s).`);
}

run();
