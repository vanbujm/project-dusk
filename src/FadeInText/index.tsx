import React from 'react';
import { Text } from 'theme-ui';
import { keyframes } from '@emotion/react';

const typingAnimation = keyframes`
  from { width: 0; filter: blur(2px) }
`;

const blurAnimation = keyframes`
  from { filter: blur(2px) }
`;

const wordsPerMinute = 120;
const wordsPerSecond = wordsPerMinute / 60;
const animationSpeed = (str: string) => str.split(' ').length / wordsPerSecond;

export const FadeInText = ({ children }: { children: string }) => (
  <Text
    sx={{
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      display: 'inline-block',
      width: '100%',
      filter: 'blur(0)',
      animation: `${typingAnimation} ${animationSpeed(children)}s linear, ${blurAnimation} ${
        animationSpeed(children) * 1.5
      }s ease-out`,
    }}
  >
    {children}
  </Text>
);
