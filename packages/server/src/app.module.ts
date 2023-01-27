import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { BankModule } from './modules/bank/bank.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BankModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
