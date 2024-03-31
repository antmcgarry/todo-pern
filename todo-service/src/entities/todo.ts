import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

/**
 * @openapi
 *  components:
 *  schemas:
 *    Todo:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        user_id:
 *          type: string
 *          format: email
 *        label:
 *          type: string
 *        description:
 *          type: string
 *        completed:
 *          type: boolean
 *          default: false
 *        due_date:
 *           type: string
 *           format: date-time
 *        createdAt:
 *            type: string
 *            format: date-time
 *        updatedAt:
 *            type: string
 *            format: date-time
 */

@Entity({ name: "todos" })
export class Todo {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid")
  user_id: string;

  @Column()
  label: string;

  @Column({ nullable: true, type: "text" })
  description: string;

  @Column({ default: false })
  completed: boolean;

  @Column({ nullable: true })
  due_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
