/* eslint-disable @typescript-eslint/no-var-requires */
import { VercelRequest, VercelResponse } from '@vercel/node';
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const microCors = require('micro-cors');
const fetch = require('cross-fetch');
const { execute, makePromise } = require('apollo-link');
const { createHttpLink } = require('apollo-link-http');
const gql = require('graphql-tag');

const cors = microCors();
const uri = process.env.GRAPH_CMS_CONTENT_API;
const link = createHttpLink({
  uri,
  fetch,
  headers: {
    Authorization: `Bearer ${process.env.GRAPH_CMS_API_TOKEN}`,
  },
});

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-zah-ux2d.us.auth0.com/.well-known/jwks.json',
  }),
  audience: 'https://project-dusk.vercel.app/api',
  issuer: 'https://dev-zah-ux2d.us.auth0.com/',
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

const createPlayer = async (req: VercelRequest, res: VercelResponse) => {
  await new Promise((resolve) => jwtCheck(req as any, res as any, resolve));
  const user = (req as VerifiedRequest).user;
  if (!user || !user.aud.includes('https://project-dusk.vercel.app/api')) {
    return res.status(401);
  }
  if (!req.body.email) {
    console.log(req.body);
    return res.status(400).send({ error: { message: 'No email' } });
  }
  const operation = {
    query: gql`
      mutation newPlayer($email: String!) {
        createPlayer(data: { email: $email }) {
          id
          email
        }
      }
    `,
    variables: {
      email: req.body.email,
    },
  };
  console.log(operation);
  // For single execution operations, a Promise can be used
  const data = await makePromise(execute(link, operation));
  console.log(data);
  res.status(200).json({});
};

export default cors(createPlayer);
