/* eslint-disable */
import { VercelRequest, VercelResponse } from '@vercel/node';
import { applyMiddleware } from 'graphql-middleware';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from '../graphql/typeDefs';
import { resolvers } from '../graphql/resolvers';
import { permissions } from '../graphql/permissions';
import jwks from 'jwks-rsa';
import fetch from 'cross-fetch';
import microCors from 'micro-cors';
import { verify } from 'jsonwebtoken';

const cors = microCors();

const issuer = 'https://dev-zah-ux2d.us.auth0.com/';

const client = jwks({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: `${issuer}.well-known/jwks.json`,
});

const getKey = (header: { kid: any }, callback: (arg0: null, arg1: any) => void) => {
  client.getSigningKey(header.kid, (err, key) => {
    const signingKey = (key as any).publicKey || (key as any).rsaPublicKey;
    callback(null, signingKey);
  });
};

const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
  permissions
);

const apolloServer = new ApolloServer({
  schema,
  introspection: true,
  context: async ({ req }: any) => {
    try {
      if (!req.headers.authorization || req.headers.authorization === '') {
        return {};
      }
      const token = req.headers.authorization.replace('Bearer ', '');

      const isValid = await new Promise((resolve, reject) =>
        verify(
          token,
          getKey as any,
          {
            issuer,
            audience: 'https://project-dusk.vercel.app/api',
            algorithms: ['RS256'],
          },
          (err: any, decoded: unknown) => {
            if (err) {
              reject(err);
            } else {
              resolve(decoded);
            }
          }
        )
      );

      if (!isValid) {
        console.error('invalid token');
        return {};
      }
      const getUserInfo = await fetch(`${issuer}userinfo`, {
        headers: {
          'Content-Type': 'Application/json',
          Authorization: req.headers.authorization,
        },
      });
      const userInfo = await getUserInfo.json();
      return { user: userInfo };
    } catch (e) {
      console.error('context error', e);
      return {};
    }
  },
});

// @ts-ignore
const handler = cors(async (req: VercelRequest, res: VercelResponse) => {
  console.log(req.url);
  await apolloServer.start();
  const handler = apolloServer.createHandler({ path: '/api/graphql' });
  return handler(req, res);
});

export default handler;
