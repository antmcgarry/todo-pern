import { createUser, loginUser, changePassword } from '@/controllers/auth-controller';
import { VerifyAuth, createBodyValidator } from '@/middleware';
import changePasswordSchema from '@/validation/change-password';
import createUserSchema from '@/validation/create-user';
import loginUserSchema from '@/validation/login-user';
import { Router } from 'express';

const router = Router();

/**
 * @openapi
 * /auth/login:
 *  post:
 *      tags:
 *       - Auth
 *      summary: Login a user
 *      description: Login a user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                      example:
 *                          email: test@test.test
 *                          password: test
 *      responses:
 *          200:
 *            description: User logged in successfully
 *            content:
 *             application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                         type: string
 *                      user:
 *                          $ref: '#/components/schemas/User'
 *                      token:
 *                          type: string
 *          400:
 *              description: Invalid request body
 *          401:
 *              description: Invalid credentials
 *          500:
 *              description: Internal server error
 *
 */
router.post('/login', createBodyValidator(loginUserSchema), loginUser);

/**
 * @openapi
 * /auth/register:
 *  post:
 *      tags:
 *       - Auth
 *      summary: Register a user
 *      description: Create a user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                             type: string
 *                             example: John Doe
 *                          email:
 *                              type: string
 *                              format: email
 *                          password:
 *                              type: string
 *                      example:
 *                          name: John Doe
 *                          email: test@test.test
 *                          password: test
 *      responses:
 *          200:
 *            description: User created successfully
 *            content:
 *             application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                         type: string
 *                      user:
 *                          $ref: '#/components/schemas/User'
 *                      token:
 *                          type: string
 *          400:
 *              description: Invalid request body
 *          401:
 *              description: Email already in use
 *          500:
 *              description: Internal server error
 *
 */
router.post('/register', createBodyValidator(createUserSchema), createUser);

/**
 * @openapi
 * /auth/change-password:
 *  put:
 *      tags:
 *       - Auth
 *      summary: Change user password
 *      description: Change user password
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          newPassword:
 *                              type: string
 *                          oldPassword:
 *                              type: string
 *                      example:
 *                          newPassword: test
 *                          oldPassword: Password123
 *      responses:
 *          200:
 *            description: Password changed successfully
 *            content:
 *             application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                         type: string
 *          400:
 *              description: Invalid request body
 *          401:
 *              description: Invalid credentials
 *          500:
 *              description: Internal server error
 *
 */
router.put('/change-password', createBodyValidator(changePasswordSchema), VerifyAuth, changePassword);

export default router;
