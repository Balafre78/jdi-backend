import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Todolist } from "./Todolist";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid", { name: 'id' })
  id: string;

  @Column({ type: 'varchar', name: 'username', unique: true, length: 64 })
  username: string;

  @Column({ type: 'varchar', name: 'email', unique: true, length: 128 })
  email: string;

  @Column({ type: 'varchar', name: 'password', length: 256 })
  password: string;

  @Column({ type: 'varchar', name: 'firstName', length: 64 })
  firstName: string;

  @Column({ type: 'varchar', name: 'lastName', length: 64 })
  lastName: string;

  @Column({ type: 'timestamp', name: 'createdAt', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Todolist, (toDoList) => toDoList.owner)
  ownedTodoLists: Todolist[];
}