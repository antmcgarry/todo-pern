import { AppDataSource } from '@/data-source';
import { User } from '@/entity/User';
import { encrypt } from '@/helpers/encrypt';

const userRepository = AppDataSource.getRepository(User);

const createUser = async (details: { name: string; email: string; password: string; role?: string }) => {
  const { name, email, password, role = 'user' } = details;
  const existingUser = await userRepository.findOneBy({ email });
  if (existingUser) {
    throw new Error('Email already in use');
  }

  const encryptedPassword = await encrypt.encryptPassword(password);
  const newUser = userRepository.create({ name, email, password: encryptedPassword, role });
  await userRepository.save(newUser);

  const token = encrypt.generateToken({ id: newUser.id, role: newUser.role });
  return { newUser, token };
};

const loginUser = async ({ email, password }: { email: string; password: string }) => {
  const user = await userRepository.findOneBy({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await encrypt.comparePassword(user.password, password);

  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const token = encrypt.generateToken({ user_id: user.id, user_role: user.role });
  return { user, token };
};

const changePassword = async (userId: number, oldPassword: string, newPassword: string) => {
  const user = await userRepository.findOneBy({ id: userId });
  if (!user) {
    throw new Error('User not found');
  }
  console.log('user', user);
  const isPasswordValid = await encrypt.comparePassword(user.password, oldPassword);

  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const encryptedPassword = await encrypt.encryptPassword(newPassword);
  user.password = encryptedPassword;
  await userRepository.save(user);
  return { message: 'Password changed successfully' };
};

export const getUserDetails = async (userId: number) => {
  const user = await userRepository.findOneBy({ id: userId });
  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

const userService = {
  createUser,
  loginUser,
  changePassword,
  getUserDetails,
};

export default userService;
