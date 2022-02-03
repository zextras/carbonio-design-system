import React from 'react';
import styled, { keyframes } from 'styled-components';
import { ThemeObj } from '../../theme/theme';
import { getColor } from '../../theme/theme-utils';

interface SpinnerProps {
	color: string | keyof ThemeObj['palette'];
}

const rotateKeyframes = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
	}
`;

const StyledSpinner = styled.div<SpinnerProps>`
	width: 0.75rem;
	height: 0.75rem;
	color: ${({ theme, color }): string => getColor(color, theme)};
	border: 0.125rem solid currentColor;
	border-right-color: transparent;
	border-radius: 50%;
	animation: ${rotateKeyframes} 0.75s linear infinite;
`;

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(function SpinnerFn({ color }, ref) {
	return <StyledSpinner color={color} ref={ref} />;
});

export default Spinner;
