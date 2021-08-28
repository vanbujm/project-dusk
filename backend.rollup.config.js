import typescript from '@rollup/plugin-typescript';
import { resolve } from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
export default {
  input: resolve(__dirname, 'backend/api/graphql.ts'),
  output: {
    dir: 'api',
    format: 'cjs',
    exports: 'auto',
  },
  plugins: [
    // nodeResolve({
    //   preferBuiltins: true,
    // }),
    // commonjs(),
    // json(),
    typescript({
      exclude: 'src/**',
      allowSyntheticDefaultImports: true,
      tsconfig: false,
    }),
  ],
};
