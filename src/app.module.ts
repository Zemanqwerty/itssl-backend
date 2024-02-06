import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LessonsModule } from './lessons/lessons.module';
import { RecordsModule } from './records/records.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),

    AuthModule,

    LessonsModule,

    RecordsModule,

    RolesModule,
  ],
})
export class AppModule {}