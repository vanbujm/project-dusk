/* eslint-disable @typescript-eslint/no-var-requires */
import { VercelRequest, VercelResponse } from '@vercel/node';
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const microCors = require('micro-cors');

const cors = microCors();

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

const createPlayer = async (req: VercelRequest, res: VercelResponse) => {
  await new Promise((resolve) => jwtCheck(req as any, res as any, resolve));
  // @ts-ignore
  console.log(req.user);
  console.log('--------------------------');
  // console.log(req);
  res.status(200).json({});
};

export default cors(createPlayer);
