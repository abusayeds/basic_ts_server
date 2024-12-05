import httpStatus from "http-status";
import sendResponse from "../../app/middwares/responseHendel";
import catchAsync from "../../app/utils/catechAsync-funtion";
import { userServise } from "./user-servise";

const createUser = catchAsync(async (req, res) => {
  const result = await userServise.createUserDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});
const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await userServise.updateUserDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});
const getSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await userServise.getSingleUserDB(id,);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " get single user successfully",
    data: result,
  });
});

export const userController = {
  createUser,
  updateUser,
  getSingleUser
};
