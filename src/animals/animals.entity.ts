import { Column, Model, Table, DataType, ForeignKey, BelongsTo, HasOne, BelongsToMany } from 'sequelize-typescript';
import { Asociaciones } from 'src/asociaciones/entity/asociaciones.entity';
import { Users } from 'src/users/entity/users.entity';
import { Adoption } from 'src/adoptions/adoptions.entity';
import { AsPublication } from 'src/as_publications/entity/as_publications.entity';

@Table({
  timestamps:false,
})
export class Animal extends Model<Animal> {
  @Column({
    type:DataType.UUID,
    defaultValue:DataType.UUIDV4, // Or DataTypes.UUIDV1
    primaryKey:true,
    unique: true,
  })
    id: string;

  /*  @ForeignKey(() => Users)
  @Column({
    type:DataType.UUID,
    allowNull:true,
  })
    us_Id:string;*/

  @ForeignKey(() => Asociaciones)
  @Column({
    type:DataType.UUID,
    allowNull:false,
  })
    as_id: string;

  /*   @BelongsTo(() => Users)
    user: Users; */

  @BelongsTo(() => Asociaciones)
    asociacion: Asociaciones;
  
  @BelongsToMany(() => Users, () => Adoption)
    adoption: Users;

  @HasOne(() => AsPublication)
    as_publication:AsPublication;

  @Column({
    type:DataType.STRING,
    allowNull:false,
  })
    name: string;

  @Column({
    type:DataType.STRING,
    allowNull:false,
  })
    specie: string;

  @Column({
    type:DataType.ENUM,
    values:['male', 'female'],
    allowNull:false,
  })
    gender:string;

  @Column({
    type:DataType.STRING,
    allowNull:false,
  })
    breed: string;

  @Column({
    type:DataType.ENUM,
    values:['adopted', 'pending', 'homeless'],
    allowNull:false,
  })
    status: string;

  @Column({
    type:DataType.STRING,
    allowNull:false,
  })
    description: string;

  @Column({
    type:DataType.ARRAY(DataType.STRING),
  })
    image:string[] | string;
}