/* eslint-disable @typescript-eslint/no-var-requires */
import { VercelRequest, VercelResponse } from '@vercel/node';
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const microCors = require('micro-cors');
const fetch = require('cross-fetch');
const server = require('../graphql/server');

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
  await new Promise((resolve) => jwtCheck(req as any, res as any, resolve));
  const user = (req as VerifiedRequest).user;
  if (!user || !user.aud.includes('https://project-dusk.vercel.app/api')) {
    return res.status(401);
  }

  const getUserInfo = await fetch(`${issuer}userinfo`, {
    headers: {
      'Content-Type': 'Application/json',
      Authorization: req.headers.authorization,
    },
  });
  const { email } = await getUserInfo.json();

  if (!email) {
    return res.status(400).send({ error: { message: 'No email' } });
  }

  await server.start();
  const handler = server.createHandler();
  return handler(req, res);
};

export default cors(graphqlServer);
