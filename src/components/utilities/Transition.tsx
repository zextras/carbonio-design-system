/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, {
	CSSProperties,
	ForwardRefExoticComponent,
	PropsWithoutRef,
	RefAttributes,
	useEffect,
	useMemo
} from 'react';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';

type CSSObject = {
	[K in keyof CSSProperties]: CSSProperties[K] | (() => NonNullable<CSSProperties[K]>);
};

const DEFAULT_TRANSITION_TIMING = 'cubic-bezier(0.4, 0, 0.2, 1)';
const DEFAULT_TRANSITION_DURATION = 225;

const STYLES: Record<
	Partial<CSSStyleDeclaration['transition']>,
	{
		from: CSSObject;
		to: CSSObject;
		end?: CSSObject;
	} & CSSObject & {
			transitionDuration?: number;
		}
> = {
	fade: {
		from: {
			opacity: '0'
		},
		to: {
			opacity: '1'
		}
	},
	'fade-in-left': {
		from: {
			transform: 'translateX(-50px)',
			opacity: '0'
		},
		to: {
			transform: 'translateX(0)',
			opacity: '1'
		}
	},
	'fade-in-right': {
		from: {
			transform: 'translateX(50px)',
			opacity: '0'
		},
		to: {
			transform: 'translateX(0)',
			opacity: '1'
		}
	},
	'fade-in-top': {
		from: {
			transform: 'translateY(-50px)',
			opacity: '0'
		},
		to: {
			transform: 'translateY(0)',
			opacity: '1'
		}
	},
	'fade-in-bottom': {
		from: {
			transform: 'translateY(50px)',
			opacity: '0'
		},
		to: {
			transform: 'translateY(0)',
			opacity: '1'
		}
	},
	'scale-in': {
		from: {
			transform: 'scale(0.9)',
			opacity: '0'
		},
		to: {
			transform: 'scale(1)',
			opacity: '1'
		}
	},
	'scale-out': {
		from: {
			transform: 'scale(1.1)',
			opacity: '0'
		},
		to: {
			transform: 'scale(1)',
			opacity: '1'
		}
	}
} as const;

function applyStyle(styles: CSSObject, element: HTMLElement): void {
	const styleKeys = Object.keys(styles) as Array<
		Extract<keyof CSSStyleDeclaration, keyof CSSObject>
	>;
	styleKeys.forEach((key) => {
		const style = styles[key];
		// eslint-disable-next-line no-param-reassign
		element.style[key] = typeof style === 'function' ? `${style()}` : `${style}`;
	});
}

function resetStyle(styles: CSSObject, element: HTMLElement): void {
	const styleKeys = Object.keys(styles) as Array<
		Extract<keyof CSSStyleDeclaration, keyof CSSObject>
	>;
	styleKeys.forEach((key) => {
		// eslint-disable-next-line no-param-reassign
		element.style[key] = '';
	});
}

interface TransitionOnProps {
	/** Transition type, one of the default ones. Ignore if is a custom Transition */
	type?: keyof typeof STYLES;
	/** Initial styles of the component to which apply the Transition */
	from?: CSSObject;
	/** Final styles of the component to which apply the Transition */
	to?: CSSObject;
	/** Styles to keep after the Transition */
	end?: CSSObject;
	/** Whether to apply the Transition. If not applied, the component maybe not be visible. */
	apply?: boolean;
	/** Custom transition css target (all, opacity...). */
	transitionTarget?: CSSStyleDeclaration['transitionProperty'];
	/** Custom transition css timing (ease-in, ease-out...). */
	transitionTiming?: CSSStyleDeclaration['transitionTimingFunction'];
	/** Custom transition css duration in ms */
	transitionDuration?: number;
	/** Custom transition css delay in ms */
	transitionDelay?: CSSStyleDeclaration['transitionDelay'] | number;
	/** Children */
	children: JSX.Element;
}

const TransitionOn = React.forwardRef<HTMLElement, TransitionOnProps>(function TransitionOnFn(
	{
		type = 'fade',
		from,
		to,
		end,
		apply = true,
		transitionTarget = 'all',
		transitionTiming,
		transitionDuration,
		transitionDelay = 0,
		children
	},
	ref
) {
	const childRef = useCombinedRefs<HTMLElement>(ref);

	const duration = useMemo(
		() => transitionDuration || STYLES[type].transitionDuration || DEFAULT_TRANSITION_DURATION,
		[type, transitionDuration]
	);
	const timing = useMemo(
		() => transitionTiming || STYLES[type].transitionTimingFunction || DEFAULT_TRANSITION_TIMING,
		[type, transitionTiming]
	);

	useEffect(() => {
		const childElement = childRef.current;

		if (apply && childElement) {
			const toStyles = to || STYLES[type].to;
			applyStyle(toStyles, childElement);
			childElement.style.transition = `${transitionTarget} ${duration}ms ${timing} ${transitionDelay}ms`;

			const timeout = setTimeout(() => {
				childElement.style.transition = '';
				resetStyle(toStyles, childElement);
				const endStyles = end || STYLES[type].end || {};
				applyStyle(endStyles, childElement);
			}, duration);
			return (): void => {
				applyStyle(toStyles, childElement);
				clearTimeout(timeout);
			};
		}

		setTimeout(() => {
			if (childElement) {
				const fromStyles = from || STYLES[type].from;
				applyStyle(fromStyles, childElement);
				childElement.style.transition = `${transitionTarget} ${duration}ms ${timing} ${transitionDelay}ms`;
			}
		}, 1);

		const timeout = setTimeout(() => {
			if (childElement) {
				childElement.style.transition = '';
				const endStyles = end || STYLES[type].end || {};
				resetStyle(endStyles, childElement);
			}
		}, duration);

		return (): void => {
			clearTimeout(timeout);
		};
	}, [
		apply,
		type,
		from,
		to,
		end,
		transitionDuration,
		transitionTiming,
		childRef,
		transitionTarget,
		duration,
		timing,
		transitionDelay
	]);

	return React.cloneElement(children, {
		ref: childRef,
		style: { ...(from || STYLES[type].from) }
	});
});

interface TransitionProps extends TransitionOnProps {
	/** Turn off the Transition */
	disabled?: boolean;
}

const Transition: ForwardRefExoticComponent<
	PropsWithoutRef<TransitionProps> & RefAttributes<HTMLElement>
> & { types?: Array<keyof typeof STYLES> } = React.forwardRef<HTMLElement, TransitionProps>(
	function TransitionFn({ disabled, children, ...rest }, ref) {
		if (disabled) return React.cloneElement(children, { ref });

		return (
			<TransitionOn ref={ref} {...rest}>
				{children}
			</TransitionOn>
		);
	}
);

Transition.types = Object.keys(STYLES);

Transition.defaultProps = {
	type: 'fade',
	apply: true,
	transitionTarget: 'all',
	transitionDelay: 0,
	disabled: false
};

export { Transition, TransitionProps };
