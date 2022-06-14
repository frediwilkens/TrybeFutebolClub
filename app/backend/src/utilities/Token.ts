import * as jwt from 'jsonwebtoken';
import * as fs from 'fs/promises';

const secretKey = async () => fs.readFile('jwt.evaluation.key', 'utf-8');

class Token {
  static async create(payload: object) {
    const secret: string = await secretKey();
    const token = jwt.sign(payload, secret, { expiresIn: '2d' });
    return token;
  }

  static async decode(token: string) {
    const secret: string = await secretKey();
    return jwt.verify(token, secret);
  }
}

export default Token;
