/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';

const defaultTransitionTiming = 'cubic-bezier(0.4, 0, 0.2, 1)';
const defaultTransitionDuration = 225;

const styles = {
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
};
const TransitionOn = React.forwardRef(function TransitionOnFn(
	{
		type,
		from,
		to,
		end,
		apply,
		transitionTarget,
		transitionTiming,
		transitionDuration,
		transitionDelay,
		children
	},
	ref
) {
	const innerRef = useRef(undefined);
	const combinedRef = useCombinedRefs(ref, innerRef);

	const duration = useMemo(
		() => transitionDuration || styles[type].transitionDuration || defaultTransitionDuration,
		[type, transitionDuration]
	);
	const timing = useMemo(
		() => transitionTiming || styles[type].transitionTiming || defaultTransitionTiming,
		[type, transitionTiming]
	);

	useEffect(() => {
		if (apply) {
			const toStyles = to || styles[type].to;
			const toStylesKeys = Object.keys(toStyles);

			toStylesKeys.forEach((key) => {
				combinedRef.current.style[key] =
					typeof toStyles[key] === 'function' ? toStyles[key]() : toStyles[key];
			});
			combinedRef.current.style.transition = `${transitionTarget} ${duration}ms ${timing} ${transitionDelay}ms`;

			const timeout = setTimeout(() => {
				combinedRef.current.style.transition = '';
				toStylesKeys.forEach((key) => {
					combinedRef.current.style[key] = '';
				});
				const endStyles = end || styles[type].end || {};
				const endStylesKeys = Object.keys(endStyles);
				endStylesKeys.forEach((key) => {
					combinedRef.current.style[key] =
						typeof endStyles[key] === 'function' ? endStyles[key]() : endStyles[key];
				});
			}, duration);
			const refSave = combinedRef.current;
			return () => {
				toStylesKeys.forEach((key) => {
					refSave.style[key] =
						typeof toStyles[key] === 'function' ? toStyles[key]() : toStyles[key];
				});
				clearTimeout(timeout);
			};
		}

		const applyStyleTimeout = setTimeout(() => {
			const fromStyles = from || styles[type].from;
			const fromStylesKeys = Object.keys(fromStyles);

			fromStylesKeys.forEach((key) => {
				combinedRef.current.style[key] =
					typeof fromStyles[key] === 'function' ? fromStyles[key]() : fromStyles[key];
			});
			combinedRef.current.style.transition = `${transitionTarget} ${duration}ms ${timing} ${transitionDelay}ms`;
		}, 1);

		const resetStyleTimeout = setTimeout(() => {
			combinedRef.current.style.transition = '';
			const endStyles = end || styles[type].end || {};
			const endStylesKeys = Object.keys(endStyles);
			endStylesKeys.forEach((key) => {
				combinedRef.current.style[key] = '';
			});
		}, duration);
		return () => {
			clearTimeout(applyStyleTimeout);
			clearTimeout(resetStyleTimeout);
		};
	}, [
		apply,
		type,
		from,
		to,
		end,
		transitionDuration,
		transitionTiming,
		combinedRef,
		transitionTarget,
		duration,
		timing,
		transitionDelay
	]);

	return React.cloneElement(children, {
		ref: combinedRef,
		style: { ...(from || styles[type].from) }
	});
});

const Transition = React.forwardRef(function TransitionFn({ disabled, children, ...rest }, ref) {
	if (disabled) return React.cloneElement(children, { ref });
	return (
		<TransitionOn ref={ref} {...rest}>
			{children}
		</TransitionOn>
	);
});

Transition.types = Object.keys(styles);
Transition.propTypes = {
	/** Transition type, one of the default ones. Ignore if is a custom Transition */
	type: PropTypes.oneOf(Object.keys(styles)),
	/** Initial styles of the component to which apply the Transition */
	from: PropTypes.object,
	/** Final styles of the component to which apply the Transition */
	to: PropTypes.object,
	/** Styles to keep after the Transition */
	end: PropTypes.object,
	/** Whether or not to apply the Transition. If not applied, the component maybe not be visible. */
	apply: PropTypes.bool,
	/** Custom transition css target (all, opacity...). */
	transitionTarget: PropTypes.string,
	/** Custom transition css timing (ease-in, ease-out...). */
	transitionTiming: PropTypes.string,
	/** Custom transition css duration in ms */
	transitionDuration: PropTypes.number,
	/** Custom transition css delay in ms */
	transitionDelay: PropTypes.number,
	/** Turn off the Transition */
	disabled: PropTypes.bool
};
Transition.defaultProps = {
	type: 'fade',
	apply: true,
	transitionTarget: 'all',
	transitionDelay: 0,
	disabled: false,
	from: undefined,
	to: undefined,
	end: undefined,
	transitionTiming: undefined,
	transitionDuration: undefined
};

export default Transition;
