import { Controller, Get } from '@nestjs/common'
import { GamesService } from './games.service'
import { Game } from '@gamestan/models'

@Controller('games')
export class GamesController {
  constructor (private readonly service: GamesService) {}

  @Get('')
  async all (
    @Req() req,
    @Res() res,
  ) {
    this.service.findAll().then((data: Game) => {

    })
  }

}
