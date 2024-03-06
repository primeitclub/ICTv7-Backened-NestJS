import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'users', database: 'tryDB' })
export class UserTry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false
  })
  username: string;
}
