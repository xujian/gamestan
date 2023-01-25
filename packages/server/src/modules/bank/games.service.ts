import { Game } from '@gamestan/models'
import { Injectable } from '@nestjs/common'

@Injectable()
export class GamesService {
  constructor () {}

  async fetchAll (): Promise<Game[]> {
    return new Promise<Game[]>([])
  }
}
