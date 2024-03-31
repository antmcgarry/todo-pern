import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import path from 'path';

dotenv.config();

const PEM_PATH = process.env.PEM_FILE_PATH || path.resolve(__dirname, '../../../jwtRS256_key.pem');
const PUB_PATH = process.env.PUB_FILE_PATH || path.resolve(__dirname, '../../../jwtRS256_key.pub');

const encryptPassword = async (password: string) => {
  return bcrypt.hash(password, 12);
};
const comparePassword = async (hashPassword: string, password: string) => {
  return bcrypt.compareSync(password, hashPassword);
};

const generateToken = (payload: any) => {
  const privateKey = fs.readFileSync(PEM_PATH, 'utf8');
  return jwt.sign(payload, privateKey, { expiresIn: '1d', algorithm: 'RS256' });
};

const verifyToken = (token: string) => {
  const publicKey = fs.readFileSync(PUB_PATH, 'utf8');
  return jwt.verify(token, publicKey, { algorithms: ['RS256'] });
};

export const encrypt = {
  encryptPassword,
  comparePassword,
  generateToken,
  verifyToken,
};

export default encrypt;
