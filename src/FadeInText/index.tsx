import React, { useEffect, useRef } from 'react';
import { Text } from 'theme-ui';
import { keyframes } from '@emotion/react';

const typingAnimation = keyframes`
  from { width: 0; filter: blur(2px) }
`;

const blurAnimation = keyframes`
  from { filter: blur(2px) }
`;

const wordsPerMinute = 180;
const wordsPerSecond = wordsPerMinute / 60;
const getAnimationSpeed = (str: string) => str.split(' ').length / wordsPerSecond;

export const FadeInText = ({ children, done }: { children: string; done?: () => void }) => {
  const doneFunc = useRef(done);
  doneFunc.current = done;
  const animationSpeed = getAnimationSpeed(children);
  const fadeSpeed = Math.min(2, animationSpeed);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const func = doneFunc.current;
      if (func) func();
    }, 1000 * Math.max(fadeSpeed, animationSpeed));
    return () => {
      doneFunc.current = undefined;
      clearTimeout(timeout);
    };
  }, [children, done]);

  return (
    <Text
      sx={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        display: 'inline-block',
        width: '100%',
        filter: 'blur(0)',
        animation: `${typingAnimation} ${animationSpeed}s linear, ${blurAnimation} ${fadeSpeed}s ease-out`,
      }}
    >
      {children}
    </Text>
  );
};
