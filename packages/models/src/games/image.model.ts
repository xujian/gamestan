
/**
 * Data model for game artwork, cover, screenshot ...
 */
export interface Image {
  id: number,
  game: number,
  height: number,
  width: number,
  url: string,
}
