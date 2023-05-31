import { Sequelize } from 'sequelize-typescript';
import { Asociaciones } from 'src/asociaciones/entity/asociaciones.entity';
import { Animal } from '../animals/animals.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        logging: false,
        native: false,
      });
      sequelize.addModels([Asociaciones, Animal]);
      await sequelize.sync({ force: true });
      return sequelize;
    },
  },
];
