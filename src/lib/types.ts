/**
 * Shared domain types for studio spaces.
 */

export type StudioCategory =
  | "photo-studio"
  | "sound-stage"
  | "podcast-room"
  | "music-suite"
  | "art-workshop";

export interface Studio {
  /** Mongo `_id` serialized to a string. */
  id: string;
  title: string;
  category: StudioCategory;
  imageUrl: string;
  /** Dollars per hour, e.g. `45` renders as `$45 / hr`. */
  hourlyRate: number;
  rating: number;
  reviewCount: number;
  /** Human-readable location, e.g. `Brooklyn, NY`. */
  location: string;
}
