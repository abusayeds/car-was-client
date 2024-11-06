/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TUser {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  profileImage: string;
  coverImage: string;
}
export interface TReview {
  _id: string;
  rating: number;
  title: string;
  description: string;
  user: TUser;

  createdAt: any;
}
