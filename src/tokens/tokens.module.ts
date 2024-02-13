import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tokens } from './tokens.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UsersModule,
              TypeOrmModule.forFeature([Tokens]),
              JwtModule.register({
                  global: true,
              }),],
  providers: [TokensService],
  exports: [TokensService]
})
export class TokensModule {}
