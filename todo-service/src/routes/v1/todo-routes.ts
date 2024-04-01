import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from "@/controllers/todo.controller";
import createBodyValidator from "@/middleware/create-body-validator";
import createParamValidator from "@/middleware/create-param-validator";
import VerifyAuth from "@/middleware/verify-auth";
import {
  CreateTodoSchema,
  UpdateTodoSchema,
  getTodoById,
} from "@/validation/todo-schema";
import { Router } from "express";

const router = Router();

router.use(VerifyAuth);

/**
 * @openapi
 * /todo:
 *  post:
 *      tags:
 *       - Todos
 *      summary: create a todo
 *      description: create a todo
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      label:
 *                        type: string
 *                      description:
 *                        type: string
 *      responses:
 *          200:
 *            description: Todo created successfully
 *            content:
 *             application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                         type: string
 *                      todo:
 *                          $ref: '#/components/schemas/Todo'
 *          400:
 *              description: Invalid request body
 *          401:
 *              description: Invalid credentials
 *          500:
 *              description: Internal server error
 *
 */
router.post("/todo", createBodyValidator(CreateTodoSchema), createTodo);

/**
 * @openapi
 * /todo:
 *    get:
 *      tags:
 *        - Todos
 *      summary: get all todos
 *      description: get all todos
 *      responses:
 *        200:
 *          description: Todos fetched successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                  todo:
 *                    $ref: '#/components/schemas/Todo'
 *                  amount:
 *                    type: number
 *        400:
 *         description: Invalid request body
 *        401:
 *         description: Invalid credentials
 *        500:
 *         description: Internal server error
 *
 */
router.get("/todo", getTodos);

/**
 * @openapi
 * /todo/{id}:
 *    get:
 *      tags:
 *        - Todos
 *      summary: get todo by id
 *      description: get todo by id
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *      responses:
 *          200:
 *            description: Todo fetched successfully
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                    todo:
 *                      $ref: '#/components/schemas/Todo'
 *          400:
 *            description: Invalid request body
 *          401:
 *            description: Invalid credentials
 *          500:
 *            description: Internal server error
 *
 */
router.get("/todo/:id", createParamValidator(getTodoById), getTodo);

/**
 * @openapi
 * /todo:
 *    put:
 *      tags:
 *        - Todos
 *      summary: update todo
 *      description: update todo
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                label:
 *                  type: string
 *                description:
 *                  type: string
 *      responses:
 *        200:
 *          description: Todo fetched successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                  todo:
 *                    $ref: '#/components/schemas/Todo'
 *        400:
 *          description: Invalid request body
 *        401:
 *          description: Invalid credentials
 *        500:
 *          description: Internal server error
 *
 */
router.put("/todo", createBodyValidator(UpdateTodoSchema), updateTodo);

/**
 * @openapi
 * /todo:
 *  delete:
 *    tags:
 *      - Todos
 *    summary: delete todo
 *    description: delete todo
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *    responses:
 *      200:
 *        description: Todo deleted successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *      400:
 *        description: Invalid request body
 *      401:
 *        description: Invalid credentials
 *      500:
 *        description: Internal server error
 *
 */

router.delete("/todo", createParamValidator(getTodoById), deleteTodo);

export default router;
