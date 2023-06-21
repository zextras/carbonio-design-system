import React from 'react';

import { differenceWith, map } from 'lodash';

import { render } from '../test-utils';
import icons from './index';

describe('Icons', () => {
	test.each(map(icons, (Component, iconKey) => [iconKey, Component]))(
		'icon %s has no fill attribute',
		(iconKey, Component) => {
			render(<Component />);
			const elementsWithFillAttribute = document.querySelectorAll('[fill]');
			const clipPathElements = document.querySelectorAll('clipPath');
			const elementsWhichShouldNotHaveFillAttribute = differenceWith(
				elementsWithFillAttribute,
				clipPathElements,
				(element, clipPathElement) => clipPathElement.contains(element)
			);

			elementsWhichShouldNotHaveFillAttribute.forEach((element) => {
				expect(element).toHaveAttribute('fill', 'none');
			});
		}
	);
});
