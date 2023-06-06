import { Table, Column, Model, DataType, HasMany, BelongsToMany, AllowNull } from 'sequelize-typescript';
import { Animal } from 'src/animals/animals.entity';
import { Users } from 'src/users/entity/users.entity';
// import { UsersAssociated } from './usersAssociated.entity';
import { RedSocial } from './redSocial.entity';
import { RedSocialDto } from '../dto/create-RedSocial.dto';

@Table
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
    dateStart: Date;

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

  // @BelongsToMany(()=> Users, ()=> UsersAssociated)
  //   members: Users[];

  @HasMany(() => RedSocial)
    reds: RedSocial;

}