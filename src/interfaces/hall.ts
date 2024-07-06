export interface Hall {
  hallID: number;
  ownerID: string;
  price: number;
  features: string[];
  name: string;
  description: string;
  capacity: number;
  governorateID: number;
  city: number;
  pictures: string | null;
  pictureUrls: string[];
  isFavorite: boolean;
}
