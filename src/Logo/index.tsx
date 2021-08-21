import React from 'react';
import { keyframes, css } from '@emotion/react';
import { useThemeUI } from 'theme-ui';

const pauseFactor = 50;
const glitchFactor = 23;
const stepSize = (99 - pauseFactor) / glitchFactor;

const [glitch1, glitch2] = Array.from({ length: 2 }).map(
  () => keyframes`
  ${[
    `0%, ${pauseFactor} {
        clip-path: inset(0 0 0 0);
      }`,
    ...Array.from({ length: glitchFactor }, (_, i) => {
      const percentFactor = 100;
      const windowHeight = Math.round(Math.random() * 20);
      const from = (i + 1) * stepSize + pauseFactor;
      const top = Math.round(Math.random() * percentFactor);
      const bottom = Math.round(Math.random() - 0.6) * top - Math.round(Math.random() * windowHeight);
      const isVert = Math.random() > 0.5;
      if (i === 0) {
        return `clip-path: inset(0 0 0 0);`;
      }
      return `${from}% {
        ${isVert ? `clip-path: inset(${top}% 0 ${bottom}% 0);` : `clip-path: inset(0 ${top}% 0 ${bottom}%);`}
      }`;
    }),
  ].join('\n')}
`
);

const offset = 0;
const wiggleFactor = 1;

export const Logo = ({ width = 400, height = 320 }: { width?: number; height?: number }) => {
  const { theme } = useThemeUI();
  const base = css`
    position: absolute;
    background: ${theme.colors?.background};
    width: ${width}px;
    height: ${height}px;
    top: ${offset}px;
  `;
  const svg1 = css`
    ${base};
    fill: ${theme.colors?.text};
    left: ${offset}px;
  `;
  const svg2 = css`
    ${base};
    fill: ${theme.colors?.text};
    left: ${offset - wiggleFactor}px;
    animation: ${glitch1} 2s infinite linear reverse;
  `;
  const svg3 = css`
    ${base};
    fill: ${theme.colors?.text};
    left: ${offset + wiggleFactor}px;
    animation: ${glitch2} 3s infinite linear reverse;
  `;

  return (
    <div sx={{ width, height, position: 'relative' }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" css={svg1}>
        <g>
          <path
            sx={{
              filter: ({ colors }) => `drop-shadow(2px 2px 0px ${colors.secondary})`,
            }}
            d="M196.533 58.267 L 196.533 63.200 127.400 63.200 L 58.267 63.200 93.333 98.267 L 128.399 133.333 88.800 172.954 L 49.200 212.575 102.023 186.176 L 154.845 159.777 176.689 181.622 L 198.532 203.467 264.199 203.467 L 329.867 203.467 329.867 266.667 L 329.867 329.867 204.792 329.867 C 85.911 329.867,79.709 329.844,79.559 329.400 C 77.619 323.675,72.579 320.000,66.667 320.000 C 54.600 320.000,48.741 334.410,57.379 342.840 C 64.601 349.887,76.277 346.953,79.559 337.267 C 79.709 336.823,86.076 336.800,208.258 336.800 L 336.800 336.800 336.800 266.667 L 336.800 196.533 269.133 196.533 L 201.465 196.533 181.477 176.544 C 170.484 165.550,161.544 156.503,161.611 156.440 C 161.678 156.377,203.613 135.378,254.800 109.777 L 347.867 63.230 275.667 63.215 L 203.467 63.200 203.467 58.267 L 203.467 53.333 200.000 53.333 L 196.533 53.333 196.533 58.267 M162.467 99.267 L 133.333 128.400 104.200 99.267 L 75.067 70.133 133.333 70.133 L 191.600 70.133 162.467 99.267 M237.400 110.748 L 156.267 151.333 147.267 142.333 L 138.268 133.333 167.334 104.265 L 196.400 75.197 196.477 77.598 L 196.553 80.000 200.010 80.000 L 203.467 80.000 203.467 75.067 L 203.467 70.133 261.000 70.148 L 318.533 70.163 237.400 110.748 M141.578 146.512 L 149.686 154.623 117.043 170.932 L 84.400 187.242 108.799 162.821 C 122.219 149.389,133.260 138.400,133.334 138.400 C 133.409 138.400,137.119 142.050,141.578 146.512 M69.456 327.490 C 75.667 330.409,73.542 339.733,66.667 339.733 C 62.897 339.733,60.267 337.103,60.267 333.333 C 60.267 328.530,65.113 325.448,69.456 327.490 "
            stroke="none"
            fillRule="evenodd"
          ></path>
        </g>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" css={svg2}>
        <g>
          <path
            sx={{
              filter: ({ colors }) => `drop-shadow(2px 2px 0px ${colors.primary})`,
            }}
            d="M196.533 58.267 L 196.533 63.200 127.400 63.200 L 58.267 63.200 93.333 98.267 L 128.399 133.333 88.800 172.954 L 49.200 212.575 102.023 186.176 L 154.845 159.777 176.689 181.622 L 198.532 203.467 264.199 203.467 L 329.867 203.467 329.867 266.667 L 329.867 329.867 204.792 329.867 C 85.911 329.867,79.709 329.844,79.559 329.400 C 77.619 323.675,72.579 320.000,66.667 320.000 C 54.600 320.000,48.741 334.410,57.379 342.840 C 64.601 349.887,76.277 346.953,79.559 337.267 C 79.709 336.823,86.076 336.800,208.258 336.800 L 336.800 336.800 336.800 266.667 L 336.800 196.533 269.133 196.533 L 201.465 196.533 181.477 176.544 C 170.484 165.550,161.544 156.503,161.611 156.440 C 161.678 156.377,203.613 135.378,254.800 109.777 L 347.867 63.230 275.667 63.215 L 203.467 63.200 203.467 58.267 L 203.467 53.333 200.000 53.333 L 196.533 53.333 196.533 58.267 M162.467 99.267 L 133.333 128.400 104.200 99.267 L 75.067 70.133 133.333 70.133 L 191.600 70.133 162.467 99.267 M237.400 110.748 L 156.267 151.333 147.267 142.333 L 138.268 133.333 167.334 104.265 L 196.400 75.197 196.477 77.598 L 196.553 80.000 200.010 80.000 L 203.467 80.000 203.467 75.067 L 203.467 70.133 261.000 70.148 L 318.533 70.163 237.400 110.748 M141.578 146.512 L 149.686 154.623 117.043 170.932 L 84.400 187.242 108.799 162.821 C 122.219 149.389,133.260 138.400,133.334 138.400 C 133.409 138.400,137.119 142.050,141.578 146.512 M69.456 327.490 C 75.667 330.409,73.542 339.733,66.667 339.733 C 62.897 339.733,60.267 337.103,60.267 333.333 C 60.267 328.530,65.113 325.448,69.456 327.490 "
            stroke="none"
            fillRule="evenodd"
          ></path>
        </g>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" css={svg3}>
        <g>
          <path
            sx={{
              filter: ({ colors }) => `drop-shadow(2px 2px 0px ${colors.text})`,
            }}
            d="M196.533 58.267 L 196.533 63.200 127.400 63.200 L 58.267 63.200 93.333 98.267 L 128.399 133.333 88.800 172.954 L 49.200 212.575 102.023 186.176 L 154.845 159.777 176.689 181.622 L 198.532 203.467 264.199 203.467 L 329.867 203.467 329.867 266.667 L 329.867 329.867 204.792 329.867 C 85.911 329.867,79.709 329.844,79.559 329.400 C 77.619 323.675,72.579 320.000,66.667 320.000 C 54.600 320.000,48.741 334.410,57.379 342.840 C 64.601 349.887,76.277 346.953,79.559 337.267 C 79.709 336.823,86.076 336.800,208.258 336.800 L 336.800 336.800 336.800 266.667 L 336.800 196.533 269.133 196.533 L 201.465 196.533 181.477 176.544 C 170.484 165.550,161.544 156.503,161.611 156.440 C 161.678 156.377,203.613 135.378,254.800 109.777 L 347.867 63.230 275.667 63.215 L 203.467 63.200 203.467 58.267 L 203.467 53.333 200.000 53.333 L 196.533 53.333 196.533 58.267 M162.467 99.267 L 133.333 128.400 104.200 99.267 L 75.067 70.133 133.333 70.133 L 191.600 70.133 162.467 99.267 M237.400 110.748 L 156.267 151.333 147.267 142.333 L 138.268 133.333 167.334 104.265 L 196.400 75.197 196.477 77.598 L 196.553 80.000 200.010 80.000 L 203.467 80.000 203.467 75.067 L 203.467 70.133 261.000 70.148 L 318.533 70.163 237.400 110.748 M141.578 146.512 L 149.686 154.623 117.043 170.932 L 84.400 187.242 108.799 162.821 C 122.219 149.389,133.260 138.400,133.334 138.400 C 133.409 138.400,137.119 142.050,141.578 146.512 M69.456 327.490 C 75.667 330.409,73.542 339.733,66.667 339.733 C 62.897 339.733,60.267 337.103,60.267 333.333 C 60.267 328.530,65.113 325.448,69.456 327.490 "
            stroke="none"
            fillRule="evenodd"
          ></path>
        </g>
      </svg>
    </div>
  );
};
