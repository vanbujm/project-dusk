import { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';

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
  console.log(require('express-jwt'), require('jwks-rsa'));
  console.log(jwt, jwks);
  const results = await new Promise((resolve) => jwtCheck(req as any, res as any, resolve));
  res.status(200).json(results);
};

export default createPlayer;
