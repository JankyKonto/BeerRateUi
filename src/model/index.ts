export interface Beer {
  id: number;
  name: string;
  producer: string;
  kind: number;
  originCountry: string;
  alcoholAmount: number;
  ibu: number;
  image: string;
}

export interface Review {
  id: number;
  text: string;
  tasteRate: number;
  aromaRate: number;
  foamRate: number;
  colorRate: number;
  beerId: number;
  userId: number;
  userName: string;
}
