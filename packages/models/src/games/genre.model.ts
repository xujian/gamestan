import { Fact } from './fact.model'

/**
 * Data model for game artwork, cover, screenshot ...
 */
export interface Genre extends Fact {
  id: number,
  name: string,
  slug: string,
}
