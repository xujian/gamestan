import { Fact } from './fact.model'
import { Franchise } from './franchise.model'
import { Genre } from './genre.model'
import { Image } from './image.model'
import { Platform } from './platform.model'

/**
 * Data model for game
 */
export interface Game {
  id: number
  aggregatedRating: number
  aggregatedRatingCount: number
  artworks: Image[]
  bundles: number[]
  category: number
  cover: Image
  createdAt: number
  dlcs: number[]
  firstReleaseDate: number
  franchises: Franchise[]
  gameEngines: Fact[]
  gameModes: Fact[]
  genres: Genre[]
  hypes: number
  involvedCompanies: number[]
  keywords: Fact[]
  name: string
  platforms: Platform[]
  rating: number
  ratingCount: number
  releaseDates: number[]
  screenshots: Image[]
  similarGames: number[]
  slug: string
  storyline: string
  summary: string
  tags: number[]
  themes: number[]
  totalRating: number
  totalRatingCount: number
  updatedAt: number
  url: string
  videos: number[]
  websites: number[]
  checksum: string
}
