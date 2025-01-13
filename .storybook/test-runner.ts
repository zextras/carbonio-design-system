/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type { TestRunnerConfig } from '@storybook/test-runner';
import { getStoryContext } from '@storybook/test-runner';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

const config: TestRunnerConfig = {
	// Hook that is executed before the test runner starts running tests
	setup() {
		expect.extend({ toMatchImageSnapshot });
	},
	/* Hook to execute before a story is rendered.
	 * The page argument is the Playwright's page object for the story.
	 * The context argument is a Storybook object containing the story's id, title, and name.
	 */
	// async preVisit(page, context) {},
	/* Hook to execute after a story is rendered.
	 * The page argument is the Playwright's page object for the story
	 * The context argument is a Storybook object containing the story's id, title, and name.
	 */
	async postVisit(page, context) {
		const storyContext = await getStoryContext(page, context);
		const visualTestParameters = storyContext.parameters?.visualTest ?? {};

		if (visualTestParameters.skip) {
			return;
		}
		// the following should work, but it does not work as expected when running storybook in dev mode
		// await waitForPageReady(page);
		// Waits for the page to be ready before taking a screenshot to ensure consistent results
		await page.waitForLoadState('domcontentloaded');
		await page.waitForLoadState('load');
		await page.waitForFunction(() => document.readyState === 'complete');
		await page.waitForFunction(() => document.fonts.ready);

		if (visualTestParameters.waitTime) {
			await new Promise((resolve) => {
				setTimeout(resolve, visualTestParameters.waitTime);
			});
		}
		const image = await page.screenshot({
			animations: 'disabled'
		});

		expect(image).toMatchImageSnapshot({
			customSnapshotsDir: '.storybook-images',
			customSnapshotIdentifier: context.id
		});
	}
};

export default config;
