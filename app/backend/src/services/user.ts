import * as Bcrypt from 'bcryptjs';
import Token from '../utilities/Token';
import User from '../database/models/user';

class UserService {
  public login = async (email: string, password: string) => {
    const userFound = await User.findOne({ where: { email } });

    if (!userFound) return { message: 'Incorrect email or password' };

    if (!Bcrypt.compareSync(password, userFound.password)) {
      return { message: 'Incorrect email or password' };
    }

    const { id, username, role } = userFound;

    const token = await Token.create({ id });

    return {
      user: { id, username, role, email },
      token,
    };
  };

  public validate = async (id: number) => {
    const userFound = await User.findByPk(id);

    if (!userFound) return null;

    return userFound.role;
  };
}

export default UserService;
