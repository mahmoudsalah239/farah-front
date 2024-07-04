export interface Photographer {
    photographyID: number;
    reviews: any[];
    ownerID: string;
    description: string;
    pictures: any; 
    pictureUrls: string[];
    serviceStatus: number;
    isFavorite: boolean;
}
