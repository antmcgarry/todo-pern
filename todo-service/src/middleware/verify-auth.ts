import { Request, Response, NextFunction } from 'express';
import { encrypt } from '@/helpers/encrypt';

const VerifyAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bearerHeader = req.header('Authorization');
    if (!bearerHeader) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const bearer = bearerHeader.split(' ');

    const bearerToken = bearer[1];

    const decoded = encrypt.verifyToken(bearerToken);
    req.body.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export default VerifyAuth;
