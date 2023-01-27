
/**
 * Data model for game platform
 */
export interface Platform {
  id: number,
  name: string,
  slug: string,
  games: number[],
}
