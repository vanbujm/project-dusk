import typescript from '@rollup/plugin-typescript';
import { resolve } from 'path';

export default {
  input: resolve(__dirname, 'backend/api/graphql.ts'),
  output: {
    dir: 'api',
    format: 'cjs',
    exports: 'auto',
  },
  plugins: [
    typescript({
      exclude: 'src/**',
      allowSyntheticDefaultImports: true,
      tsconfig: false,
    }),
  ],
  external: [
    'graphql-middleware',
    '@graphql-tools/schema',
    'apollo-server-micro',
    'jsonwebtoken',
    'jwks-rsa',
    'cross-fetch',
    'micro-cors',
    'graphql-shield',
    '@prisma/client',
  ],
};
