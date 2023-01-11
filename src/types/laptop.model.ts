import { IUserInfo } from "./auth.model";
import { IProfile } from "./profile.model";

export interface ILaptop {
  _id: string;
  cpu: string;
  price: string;
  keyboard: string;
  productName: string;
  sku: string;
  productImg: string[];
  laptopID: string;
  brand: string;
  type: string;
  partNumber: string;
  color: string;
  chip: string;
  chipSet: string;
  rom: string;
  connector: string;
  ram: string;
  vga: string;
  disk: string;
  lightDisk: string;
  cardReader: string;
  screen: string;
  webcam: string;
  audio: string;
  internet: string;
  noWires: string;
  connectionPort: string;
  battery: string;
  size: string;
  weight: string;
  window: string;
  accessory: string;
  updatedAt: string;
  review: string;
}

export interface IComment {
  _id: string;
  userId: IUserInfo;
  userProfile: IProfile;
  comment: string;
  laptopId: string;
  rating: number;
  updatedAt: string;
}

export interface ILaptopDetail {
  laptop: ILaptop;
  comments: IComment[];
}
