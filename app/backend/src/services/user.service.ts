import * as Bcrypt from 'bcryptjs';
import * as fs from 'fs/promises';
import * as jwt from 'jsonwebtoken';
import Token from '../utilities/Token';
import User from '../database/models/user';
import TokenPayload from '../interfaces/TokenPayload.interface';

class UserService {
  public login = async (email: string, password: string) => {
    const userFound = await User.findOne({ where: { email } });

    if (!userFound) return { message: 'Incorrect email or password' };

    if (!Bcrypt.compareSync(password, userFound.password)) {
      return { message: 'Incorrect email or password' };
    }

    const { id, username, role } = userFound;

    const token = await Token.create({ username, email, role });

    return {
      user: { id, username, role, email },
      token,
    };
  };

  public validate = async (token: string) => {
    const superSecret = await fs.readFile('jwt.evaluation.key', 'utf-8');

    try {
      const decode = jwt.verify(token, superSecret) as TokenPayload;
      return decode;
    } catch {
      const errorMessage: TokenPayload = { message: 'Invalid token' };
      return errorMessage;
    }
  };
}

export default UserService;
