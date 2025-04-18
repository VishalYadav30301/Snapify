import { Column, DataType, Model,BelongsTo, Table, ForeignKey } from 'sequelize-typescript';
import { User } from './user.model';

@Table
export class Photo extends Model {
  @Column(DataType.STRING)
  caption: string;

  @Column(DataType.STRING)
  filename: string;

  @Column(DataType.STRING)
  url: string;

  @Column(DataType.INTEGER)
  size: number;

  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
   user: User;
}
