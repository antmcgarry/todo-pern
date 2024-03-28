import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import * as fs from "fs";
import path from "path";

dotenv.config();

const verifyToken = (token: string) => {
  const publicKey = fs.readFileSync(
    path.resolve(__dirname, "../../../jwtRS256_key.pub"),
    "utf8"
  );
  return jwt.verify(token, publicKey, { algorithms: ["RS256"] });
};

export const encrypt = {
  verifyToken,
};

export default encrypt;
