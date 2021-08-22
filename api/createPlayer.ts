import { VercelRequest, VercelResponse } from '@vercel/node';

const createPlayer = (req: VercelRequest, res: VercelResponse) => {
  res.status(200).send(`Hello World!`);
};

export default createPlayer;
