import { Request, Response } from 'express';
import UserService from '../services/user';

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
    const { userId } = req;

    const userRole = await this.userService.validate(userId);

    if (!userRole) return res.status(400).end();

    return res.status(200).send(userRole);
  };
}

export default UserController;
