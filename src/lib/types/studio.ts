export interface Studio {
  _id: string; // MongoDB primary key
  id?: string;
  title: string;
  category: string;
  capacity: number;
  location: string;
  overview: string;
  amenities: string[];
  rate: number; // MongoDB field
  deposit: number;
  image: string; // MongoDB field
  rating?: number;
  reviewCount?: number;
  hostInfo: {
    name: string;
    email: string;
  };
}