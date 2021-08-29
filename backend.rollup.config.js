import typescript from '@rollup/plugin-typescript';

export default {
  input: 'backend/api/graphql.ts',
  output: {
    dir: 'api',
    format: 'cjs',
  },
  plugins: [
    typescript({
      exclude: 'src/**',
      allowSyntheticDefaultImports: true,
      esModuleInterop: true,
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
