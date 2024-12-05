import httpStatus from "http-status";
import sendResponse from "../../app/middwares/responseHendel";
import catchAsync from "../../app/utils/catechAsync-funtion";
import { authServise } from "./auth-servise";
import config from "../../app/config";


const createAuth = catchAsync(async (req, res) => {
  const result = await authServise.createAuthDB(req.body);
  const { refreshToken, accessToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is logged in successfully",
    token: accessToken,
    data: result.user,
  });
});


export const authController = {
  createAuth,
 
};
