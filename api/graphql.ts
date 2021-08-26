/* eslint-disable @typescript-eslint/no-var-requires */
const { ApolloServer } = require('apollo-server-micro');
const { typeDefs } = require('../graphql/typeDefs');
const { resolvers } = require('../graphql/resolvers');
const jwt = require('jsonwebtoken');
const jwks = require('jwks-rsa');
const fetch = require('cross-fetch');

const issuer = 'https://dev-zah-ux2d.us.auth0.com/';

const getSecret = jwks.expressJwtSecret({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: 'https://dev-zah-ux2d.us.auth0.com/.well-known/jwks.json',
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }: any) => {
    const secret = await new Promise((resolve, reject) => {
      getSecret(req, req.headers, {}, (err?: any, secret?: string) => {
        if (err) {
          reject(err);
        } else {
          resolve(secret);
        }
      });
    });

    const isValid = jwt.verify(req.headers.authorization, secret, {
      issuer,
      audience: 'https://project-dusk.vercel.app/api',
      algorithms: ['RS256'],
    });
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

export default server;
