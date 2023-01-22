

export interface BeerI {
    id: number | null;
    name: string;
    image_url: string;
    tagline: string;
    description: string;
    abv:  number | null;
    food_pairing: string[];
}
