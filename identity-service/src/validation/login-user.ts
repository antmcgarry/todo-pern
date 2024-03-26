import { z } from 'zod';

const loginUserSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  password: z.string(),
});

export default loginUserSchema;
