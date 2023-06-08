import { Table, Column, Model, DataType, HasMany, BelongsToMany } from 'sequelize-typescript';
import { Animal } from 'src/animals/animals.entity';
import { RedSocial } from './redSocial.entity';

@Table({ tableName: 'asociaciones', timestamps: false })
export class Asociaciones extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue:DataType.UUIDV4,
    primaryKey: true,
  })
    id: string;

  @Column({
    unique: true,
    allowNull: false,
  })
    email: string;

  @Column({
    allowNull: false,
  })
    password: string;

  @Column({
    allowNull: false,
  })
    name: string;

  @Column
    img_profile: string;

  @Column
    date_created: Date;

  @Column
    description: string;

  @Column
    country: string;

  @Column
    address: string;

  @Column
    status: boolean;

  @HasMany(()=> Animal)
    pets: Animal[];

  @HasMany(() => RedSocial)
    reds: RedSocial;

}