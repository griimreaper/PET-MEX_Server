import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AsociacionesModule } from './asociaciones/asociaciones.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AsociacionesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number;

  constructor(private readonly configureService: ConfigService) {
    AppModule.port = parseInt(configureService.get('SERVER_PORT'));
  }
}
