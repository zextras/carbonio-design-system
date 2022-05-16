/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { ErrorInfo } from 'react';
import { Container } from '../layout/Container';
import { Text } from '../basic/Text';

interface CatcherProps {
	/** error callback, use this to perform operations when an error is caught */
	onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface CatcherState {
	hasError: boolean;
	error: Error | null;
}

class Catcher extends React.Component<CatcherProps, CatcherState> {
	constructor(props: CatcherProps) {
		super(props);
		this.state = {
			hasError: false,
			error: null
		};
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		// You can also log the error to an error reporting service
		// eslint-disable-next-line no-console
		const { onError = console.error } = this.props;
		if (onError) {
			onError(error, errorInfo);
		}
		this.setState({
			hasError: true,
			error
		});
	}

	render(): React.ReactNode {
		const { children } = this.props;
		const { hasError, error } = this.state;
		if (hasError) {
			// You can render any custom fallback UI
			return (
				<Container>
					<Text size="large" color="error">
						{error?.message}
					</Text>
				</Container>
			);
		}

		return children;
	}
}

export { Catcher, CatcherProps };
