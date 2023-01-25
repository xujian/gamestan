
/**
 * Data model for game
 */
export interface Game {
  id: number
  ageRatings: number[]
  aggregatedRating: number
  aggregatedRatingCount: number
  alternativeNames: number[]
  artworks: number[]
  bundles: number[]
  category: number
  collection: number
  cover: number
  createdAt: number
  dlcs: number[]
  externalGames: number[]
  firstReleaseDate: number
  follows: number
  franchises: number[]
  gameEngines: number[]
  gameModes: number[]
  genres: number[]
  hypes: number
  involvedCompanies: number[]
  keywords: number[]
  name: string
  platforms: number[]
  playerPerspectives: number[]
  rating: number
  ratingCount: number
  releaseDates: number[]
  screenshots: number[]
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
