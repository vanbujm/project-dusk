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
  jwksUri: 'https://sandrino.auth0.com/.well-known/jwks.json',
});

client.getKeys().then((keys: any) => console.log('keys', keys));

function getKey(header: any, callback: any) {
  console.log('getKey header', header);
  if (!client) {
    client = jwks({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://sandrino.auth0.com/.well-known/jwks.json',
    });
  }
  client.getSigningKey(header.kid, function (err: any, key: { publicKey: any; rsaPublicKey: any }) {
    console.log('getSigningKey', key);
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
  context: async ({ req }: any) => {
    try {
      console.log('resolving context');
      const headers = req.headers.authorization ? jwt.decode(req.headers.authorization) : {};
      console.log('headers', headers);
      const test = await client.getSigningKey(headers.kid);

      console.log('getSigningKey', test);

      const secret = await new Promise((resolve, reject) =>
        jwt.verify(
          req.headers.authorization,
          getKey,
          {
            issuer,
            audience: 'https://project-dusk.vercel.app/api',
            algorithms: ['RS256'],
          },
          function (err: any, decoded: unknown) {
            if (err) {
              console.error('Authorization Error: ', err);
              reject(err);
            } else {
              resolve(decoded);
            }
          }
        )
      );

      console.log('secret', secret);

      const isValid = jwt.verify(req.headers.authorization, secret, {
        issuer,
        audience: 'https://project-dusk.vercel.app/api',
        algorithms: ['RS256'],
      });

      console.log('isValid', isValid);
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
