import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Todolist } from "./Todolist";
import { TaskStatus } from "../types/api";

@Entity("tasks")
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: string;

  @PrimaryColumn({ name: 'todolistId' })
  todolistId: string;

  @ManyToOne(() => Todolist, (todoList) => todoList.tasks, { onDelete: 'CASCADE' })
  todolist: Todolist;

  @Column({ type: 'varchar', name: 'name', length: 64 })
  name: string;

  @Column({ type: 'text', name: 'description', nullable: true })
  description: string | null;

  @Column({ type: 'enum', name: 'status', default: TaskStatus.TODO, enum: TaskStatus })
  status: TaskStatus;
}