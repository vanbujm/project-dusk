/* eslint-disable @typescript-eslint/no-var-requires */
import { VercelRequest, VercelResponse } from '@vercel/node';
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const microCors = require('micro-cors');
const fetch = require('cross-fetch');
const { execute, makePromise } = require('apollo-link');
const { createHttpLink } = require('apollo-link-http');
const gql = require('graphql-tag');

console.log({
  GRAPH_CMS_CONTENT_API: process.env.GRAPH_CMS_CONTENT_API,
  GRAPH_CMS_API_TOKEN: process.env.GRAPH_CMS_API_TOKEN,
});

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
    res.status(401);
  } else {
    console.log(req.body);
    const operation = {
      query: gql`
          mutation {
              createPlayer(data:{
                  email: ${req.body.email}
              }){
                  id
                  email
              }
          }
      `,
      // variables: {}, //optional
    };
    // For single execution operations, a Promise can be used
    const data = await makePromise(execute(link, operation));
    res.status(200).json(data);
  }
};

export default cors(createPlayer);
