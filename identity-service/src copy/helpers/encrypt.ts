import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import path from 'path';

dotenv.config();

const encryptPassword = async (password: string) => {
  return bcrypt.hash(password, 12);
};
const comparePassword = async (hashPassword: string, password: string) => {
  return bcrypt.compareSync(password, hashPassword);
};

const generateToken = (payload: any) => {
  const privateKey = fs.readFileSync(path.resolve(__dirname, './jwtRS256_key.pem'), 'utf8');
  return jwt.sign(payload, privateKey, { expiresIn: '1d', algorithm: 'RS256' });
};

const verifyToken = (token: string) => {
  const publicKey = fs.readFileSync(path.resolve(__dirname, './jwtRS256_key.pub'), 'utf8');
  return jwt.verify(token, publicKey, { algorithms: ['RS256'] });
};

export const encrypt = {
  encryptPassword,
  comparePassword,
  generateToken,
  verifyToken,
};

export default encrypt;
