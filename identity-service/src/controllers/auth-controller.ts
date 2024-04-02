import { Request, Response } from 'express';
import userService from '@/services/user-service';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role = 'user' } = req.body;
    const { newUser, token } = await userService.createUser({ name, email, password, role });
    return res.status(201).json({ message: 'User created successfully', user: newUser, token });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating user', error: (error as Error).message });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const { user, token } = await userService.loginUser({ email, password });
    const result = { user_id: user.id, name: user.name, email: user.email, role: user.role };

    return res.status(200).json({ message: 'Login successful', user: result, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const changePassword = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { oldPassword, newPassword, user } = req.body;
    const { message } = await userService.changePassword(user.user_id, oldPassword, newPassword);
    return res.status(200).json({ message });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUserDetails = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { user } = req.body;
    const userDetails = await userService.getUserDetails(user.user_id);
    return res.status(200).json({ user: userDetails });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
