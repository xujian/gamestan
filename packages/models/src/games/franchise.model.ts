
/**
 * Data model for game franchise
 */
export interface Franchise {
  id: number,
  name: string,
  slug: string,
  games: number[],
}
