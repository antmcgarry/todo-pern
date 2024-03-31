import { z } from 'zod';

const changePasswordSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

export default changePasswordSchema;
