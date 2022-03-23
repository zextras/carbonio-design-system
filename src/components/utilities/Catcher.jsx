/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '../layout/Container';
import { Text } from '../basic/Text';

class Catcher extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false,
			error: null
		};
	}

	componentDidCatch(error, errorInfo) {
		// You can also log the error to an error reporting service
		const { onError } = this.props;
		if (onError) {
			onError(error, errorInfo);
		}
		this.setState({
			hasError: true,
			error
		});
	}

	render() {
		const { children } = this.props;
		const { hasError, error } = this.state;
		if (hasError) {
			// You can render any custom fallback UI
			return (
				<Container>
					<Text size="large" color="error">
						{error.message}
					</Text>
				</Container>
			);
		}

		return children;
	}
}

Catcher.propTypes = {
	/** error callback, use this to perform operations when an error is caught */
	onError: PropTypes.func
};

Catcher.defaultProps = {
	// eslint-disable-next-line no-console
	onError: console.error
};
export { Catcher };
