/**
 * Shared domain types for studio spaces.
 */

// export type StudioCategory =
//   | "photo-studio"
//   | "sound-stage"
//   | "podcast-room"
//   | "music-suite"
//   | "art-workshop";

export type StudioCategory = 
  | "photo-studio" 
  | "film-stage" 
  | "podcast-lounge" 
  | "music-suite" 
  | "art-workshop" 
  | "dance-studio" 
  | "sound-stage" 
  | string;

// export interface Studio {
//   /** Mongo `_id` serialized to a string. */
//   id: string;
//   title: string;
//   category: StudioCategory;
//   imageUrl: string;
//   /** Dollars per hour, e.g. `45` renders as `$45 / hr`. */
//   hourlyRate: number;
//   rating: number;
//   reviewCount: number;
//   /** Human-readable location, e.g. `Brooklyn, NY`. */
//   location: string;
// }

// export interface Studio {
//   /** Mongo `_id` serialized to a string. */
//   _id: string;
//   title: string;
//   category: StudioCategory;
//   image: string;
//   // imageUrl: string;
//   /** Dollars per hour, e.g. `45` renders as `$45 / hr`. */
//   hourlyRate: number;
//   rating: number;
//   reviewCount: number;
//   /** Human-readable location, e.g. `Brooklyn, NY`. */
//   location: string;
//   overview: string;
// }

export interface Studio {
  /** Mongo `_id` or `id` serialized to a string */
  _id?: string;
  id?: string;
  
  title: string;
  category: StudioCategory;
  
  /** Support both image field names */
  image?: string;
  imageUrl?: string;
  
  /** Support both rate field names */
  rate?: number;
  hourlyRate?: number;
  
  rating?: number;
  reviewCount?: number;
  
  /** Human-readable location */
  location?: string;
  overview?: string;
  capacity?: number;
  amenities?: string[];
  deposit?: number;
  hostInfo?: Record<string, unknown>;
  
  /** Index signature to safely allow dynamic backend fields */
  [key: string]: unknown;
}
