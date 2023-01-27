import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { GamesController } from './games.controller'

@Module({
  imports: [HttpModule],
  controllers: [GamesController],
})
export class BankModule {}
