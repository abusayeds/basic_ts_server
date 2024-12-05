/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  profileImage?: string;
  coverImage?: string;
  phone: string;
  role: "admin" | "user";
  address: string;
}

export interface IUserModel extends Model<TUser> {
  isUserExistsByCustomEmail(email: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashPassword: string
  ): Promise<boolean>;
}
export type TuserRole = keyof typeof USER_ROLE;
