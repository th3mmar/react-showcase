export interface ZipCode {
  id: string;
  zipCode: string;
  warehouse?: WareHouse | undefined;
}

export interface WareHouse {
  id: string;
  pkId: string;
  name: string;
  latitude: number;
  longitude: number;
}
