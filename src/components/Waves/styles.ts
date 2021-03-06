import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import { layer } from '../../lib/theme';

import waveSvg from '../../assets/wave.svg';

interface ContainerProps {
  waves: number;
  width?: string;
}

export const Container = styled.div`
  left: 0;
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: ${layer.base};
  height: ${({ waves }: ContainerProps) => waves * 11}px;
  width: ${({ width }: ContainerProps) => width};
`;

const ebb = keyframes`
    50% {
      transform: translateX(4rem)
    }
  `;

export const Inner = styled.div`
  animation-duration: 16s;
  animation-name: ${ebb};
  animation-iteration-count: 50;
  animation-timing-function: cubic-bezier(0.5, 0, 0.5, 1);
  background-image: url(${waveSvg});
  background-position: 0 0;
  background-repeat: repeat;
  background-size: 34px auto;
  height: 100%;
  right: 0;
  position: absolute;
  top: 0;
  width: calc(100% + 4rem);
`;
