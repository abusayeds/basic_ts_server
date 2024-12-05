/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { TUser } from "./user-interface";
import { userModel } from "./user-model";
import appError from "../../app/middwares/appError";

const createUserDB = async (payload: TUser) => {
  const isUserExists = await userModel.findOne({ email: payload?.email });

  if (isUserExists) {
    throw new appError(
      httpStatus.BAD_REQUEST,
      "This user is alredy exists  ! "
    );
  }
  const result = await userModel.create(payload);
  return result;
};
const getSingleUserDB = async (id: string) => {
  const result = await userModel.findById({ _id: id });
  return result;
};

const updateUserDB = async (id: string, payload: TUser) => {
  const role = await userModel.findById({ _id: id });

  if (role?.role === payload.role) {
    throw new appError(
      httpStatus.BAD_REQUEST,
      ` This Role alredy ${role?.role} `
    );
  }

  const result = await userModel.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
export const userServise = {
  createUserDB,
  updateUserDB,
  getSingleUserDB
};
