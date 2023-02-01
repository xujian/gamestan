import { Controller, Get, Res, Req, Param, HttpStatus } from '@nestjs/common'
import Axios, { AxiosInstance, AxiosResponse } from 'axios'
import { Game, Genre } from '@gamestan/models'

@Controller('api')
export class GamesController {

  private axios: AxiosInstance

  constructor () {
    this.createAxiosInstance()
  }

  @Get('/games')
  async games (
  ) {
    const lastYearBegin = new Date('2022-1-1'),
    lastYearEnd = new Date('2022-12-31 23:59:59'),
    where = [
      'where',
      `first_release_date > ${lastYearBegin.valueOf()}`,
      `& first_release_date < ${lastYearEnd.valueOf()}`,
      `& rating > 90 & rating < 100;`,
    ].join(' ')
    const body = [
      'fields *, cover.*, artworks.*, franchises.*, genres.*, platforms.*, screenshots.*;',
      // 'search "wolfenstein";',
      where,
      'sort rating desc;',
      'limit 40;'
    ].join(' ')
    const data = await this.axios.post<string, Game[]>('/games', body),
      games = data.map(d => this.format(d))
    console.log('/games------')
    return games
  }

  @Get('/games/:id')
  async game (
    @Param('id') id: string
  ) {
    const where = `where id = ${id};`,
      body = [
        'fields *, cover.*, artworks.*, franchises.*, genres.*, platforms.*, screenshots.*;',
        where
      ].join(' ')
    const [game] = await this.axios.post<string, Game[]>('/games', body)
    return game
  }

  @Get('/search/:keyword')
  async search (
    @Param('keyord') keyword: string
  ) {
    const search = `search ${keyword};`
    const body = [
      'fields id, name, cover.*, platforms.*',
      search,
      'sort rating desc;',
      'limit 40;'
    ].join(' ')
    const data = await this.axios.post<string, Game[]>('/games', body),
      games = data.map(d => this.format(d))
    return games
  }


  @Get('/genres')
  async genres (
    @Res() res,
  ) {
    const body = `fields *;`
    const data = await this.axios.post<string, Genre[]>('/genres', body),
      genres = data.map(d => this.format(d))
    return res.json(genres)
  }

  private createAxiosInstance (): void {
    const instance = Axios.create({
      baseURL: 'https://api.igdb.com/v4',
      headers: {
        'Client-ID': process.env.IGDB_CLIENT_ID,
        Authorization: `Bearer ${process.env.IGDB_TOKEN}`
      }
    })
    instance.interceptors.response.use((value: AxiosResponse<any, any>) => {
      // format keys to camel
      const { data } = value
      return data
    })
    this.axios = instance
  }

  private format<T> (data: any): T {
    const result: {[K in keyof T]?: any} = {}
    Object.keys(data).forEach((k: string) => {
      const key = this.camelize(k)
      result[key] = data[k]
    })
    return result as T
  }

  private camelize (input: string): string {
    return input.split('_').map(
      (item, index) => index
        ? item.charAt(0).toUpperCase() + item.slice(1)
        : item.toLowerCase()
    ).join('')
  }

}
