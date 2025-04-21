import { Column, Model, Table } from 'sequelize-typescript';
import { Roles } from '../admin/roles.decorator';

@Table
export class User extends Model<User> {
  @Column({ allowNull: false })
  declare name: string;

  @Column({ unique: true, allowNull: false })
  declare email: string;

  @Column({ allowNull: false })
  declare password: string;

  @Column({ defaultValue: false })
  declare role: string;
}