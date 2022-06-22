import { Request, Response } from 'express';
import UserService from '../services/user.service';

class UserController {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await this.userService.login(email, password);

    if (user.message) return res.status(401).json(user);

    return res.status(200).json(user);
  };

  public validate = async (req: Request, res: Response) => {
    const { authorization: token } = req.headers;

    if (!token) return res.status(401).json({ message: 'Token not found' });

    const validatedUserRole = await this.userService.validate(token);

    if (validatedUserRole.message) return res.status(401).json(validatedUserRole);

    return res.status(200).send(validatedUserRole.role);
  };
}

export default UserController;
