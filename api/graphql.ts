/* eslint-disable */
import { VercelRequest, VercelResponse } from '@vercel/node';

const { ApolloServer } = require('apollo-server-micro');
const { typeDefs } = require('../graphql/typeDefs');
const { resolvers } = require('../graphql/resolvers');
const jwt = require('jsonwebtoken');
const jwks = require('jwks-rsa');
const fetch = require('cross-fetch');
const cors = require('micro-cors')();
const issuer = 'https://dev-zah-ux2d.us.auth0.com/';

let client = jwks({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: `${issuer}.well-known/jwks.json`,
});

const getKey = (header: { kid: any }, callback: (arg0: null, arg1: any) => void) => {
  client.getSigningKey(header.kid, (err: any, key: { publicKey: any; rsaPublicKey: any }) => {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
  context: async ({ req }: any) => {
    try {
      if (!req.headers.authorization || req.headers.authorization === '') {
        return {};
      }
      const token = req.headers.authorization.replace('Bearer ', '');

      const isValid = await new Promise((resolve, reject) =>
        jwt.verify(
          token,
          getKey,
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

export default apolloServer
  .start()
  .then(() => {
    const handler = apolloServer.createHandler({ path: '/api/graphql' });
    return cors(async (req: VercelRequest, res: VercelResponse) =>
      req.method === 'OPTIONS' ? res.send('ok') : await handler(req, res)
    );
  })
  .catch((err: any) => console.error('app error: ', err));
