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
  console.log(user);
  if (!req.body.email) {
    return res.status(400).send({ error: { message: 'No email' } });
  }

  const getPlayer = {
    query: gql`
      query getPlayer($email: String!) {
        player(where: { email: $email }) {
          id
          email
        }
      }
    `,
    variables: {
      email: req.body.email,
    },
  };
  try {
    const getPlayerResponse = await makePromise(execute(link, getPlayer));
    if (getPlayerResponse && getPlayerResponse.data && getPlayerResponse.data.player) {
      return res.status(200).json(getPlayerResponse.data.player);
    }
  } catch (e) {
    console.error(e);
    res.status(e.statusCode).json(e);
  }

  // For single execution operations, a Promise can be used
  try {
    await makePromise(
      execute(link, {
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
      })
    );

    const data = await makePromise(
      execute(link, {
        query: gql`
          mutation newPlayer($email: String!) {
            publishPlayer(where: { email: $email }) {
              id
              email
            }
          }
        `,
        variables: {
          email: req.body.email,
        },
      })
    );
    res.status(200).json(data.publishPlayer);
  } catch (e) {
    console.error(e);
    res.status(e.statusCode).json(e);
  }
};

export default cors(createPlayer);
