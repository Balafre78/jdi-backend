import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Task } from "./Task";

@Entity("todolists")
export class Todolist extends BaseEntity {
  @PrimaryGeneratedColumn("uuid", { name: 'id' })
  id: string;

  @Column({ type: 'varchar', name: 'title', unique: true, length: 64 })
  title: string;

  @Column({ type: 'text', name: 'description', nullable: true })
  description: string | null;

  @Column({ type: 'boolean', name: 'archived', default: false })
  archived: boolean;

  @ManyToOne(() => User, (user) => user.ownedTodoLists)
  owner: User;

  @Column({ type: 'timestamp', name: 'createdAt', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Task, (task) => task.todolist, { eager: true })
  tasks: Task[];
}