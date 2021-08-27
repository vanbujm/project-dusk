/* eslint-disable @typescript-eslint/no-var-requires */
import { VercelRequest, VercelResponse } from '@vercel/node';

const { ApolloServer } = require('apollo-server-micro');
const { typeDefs } = require('../graphql/typeDefs');
const { resolvers } = require('../graphql/resolvers');
const jwt = require('jsonwebtoken');
const jwks = require('jwks-rsa');
const fetch = require('cross-fetch');
const cors = require('micro-cors')();
const issuer = 'https://dev-zah-ux2d.us.auth0.com/';

const getSecret = jwks.expressJwtSecret({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: 'https://dev-zah-ux2d.us.auth0.com/.well-known/jwks.json',
});

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
  context: async ({ req }: any) => {
    console.log('resolving context');
    const secret = await new Promise((resolve, reject) => {
      getSecret(req, req.headers, {}, (err?: any, secret?: string) => {
        if (err) {
          reject(err);
        } else {
          resolve(secret);
        }
      });
    });

    console.log(secret);

    const isValid = jwt.verify(req.headers.authorization, secret, {
      issuer,
      audience: 'https://project-dusk.vercel.app/api',
      algorithms: ['RS256'],
    });

    console.log(isValid);
    if (!isValid) {
      console.log('invalid token');
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
  },
});

export default apolloServer.start().then(() => {
  const handler = apolloServer.createHandler();
  return cors((req: VercelRequest, res: VercelResponse) => {
    console.log('processing req', req.headers, req.body, req.method);
    return req.method === 'OPTIONS' ? res.send('ok') : handler(req, res);
  });
});
