import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
      UserModule,
      TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'node22',
        autoLoadEntities: true,
      entities: [],
      synchronize: true,
    }),
      AuthModule,
      CommonModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
