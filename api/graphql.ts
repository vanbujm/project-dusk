/* eslint-disable @typescript-eslint/no-var-requires */
import { VercelRequest, VercelResponse } from '@vercel/node';
const { ApolloServer } = require('apollo-server-micro');
const { typeDefs } = require('../graphql/typeDefs');
const { resolvers } = require('../graphql/resolvers');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const microCors = require('micro-cors');
const fetch = require('cross-fetch');

const cors = microCors();

const issuer = 'https://dev-zah-ux2d.us.auth0.com/';

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-zah-ux2d.us.auth0.com/.well-known/jwks.json',
  }),
  audience: 'https://project-dusk.vercel.app/api',
  issuer,
  algorithms: ['RS256'],
});

type VerifiedRequest =
  | {
      user?: {
        aud: string[];
        iss: string;
        sub: string;
        iat: number;
        exp: number;
        scope: string;
      };
    } & VercelRequest;

const graphqlServer = async (req: VercelRequest, res: VercelResponse) => {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  await new Promise((resolve) => jwtCheck(req as any, res as any, resolve));
  const user = (req as VerifiedRequest).user;
  if (!user || !user.aud.includes('https://project-dusk.vercel.app/api')) {
    return res.status(401);
  }

  console.log('fetching userinfo');

  const getUserInfo = await fetch(`${issuer}userinfo`, {
    headers: {
      'Content-Type': 'Application/json',
      Authorization: req.headers.authorization,
    },
  });
  const userInfo = await getUserInfo.json();

  if (!userInfo.email) {
    return res.status(400).send({ error: { message: 'No email' } });
  }

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async () => ({ user: userInfo }),
  });

  await server.start();
  console.log('server started');
  const handler = server.createHandler();
  return handler(req, res);
};

export default cors(graphqlServer);
