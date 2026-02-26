import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleName } from '../../common/enums/role.enum';
import { User } from './user.entity';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: RoleName;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}

