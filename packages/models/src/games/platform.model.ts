import { Fact } from './fact.model';

/**
 * Data model for game platform
 */
export interface Platform extends Fact {
  id: number,
  name: string,
  slug?: string,
  games?: number[],
  level?: number
}
