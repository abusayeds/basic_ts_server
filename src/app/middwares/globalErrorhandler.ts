/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import { TErrorSoureces } from "../intarface/error";
import { ZodError } from "zod";
import hendleZodError from "../errors/hendleZodError";
import hendleMongooseValidationError from "./hendleMongooseError";
import handleDuplicateError from "./handleDuplicateError";
import hendelCastError from "./hendleCastErrror";
import appError from "./appError";
import config from "../config";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = err.message || "something is wrong";
  let errorSources: TErrorSoureces = [
    {
      path: "",
      message: err.message,
    },
  ];
  if (err instanceof ZodError) {
    const simplifliedError = hendleZodError(err);
    statusCode = simplifliedError?.statusCode;
    message = simplifliedError.message;
    errorSources = simplifliedError.errorSoures;
  } else if (err?.name === "ValidationError") {
    const simplifliedError = hendleMongooseValidationError(err);
    statusCode = simplifliedError?.statusCode;
    message = simplifliedError.message;
    errorSources = simplifliedError?.errorSoures;
  } else if (err?.name === "CastError") {
    const simplifliedError = hendelCastError(err);
    statusCode = simplifliedError.statusCode;
    message = simplifliedError.message;
    errorSources = simplifliedError.errorSoures;
  } else if (err?.code === 11000) {
    const simplifliedError = handleDuplicateError(err);
    statusCode = simplifliedError?.statusCode;
    message = simplifliedError?.message;
    errorSources = simplifliedError?.errorSoures;
  } else if (err instanceof appError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.node_env === "devlopment" ? err?.stack : null,
  });
};
export default globalErrorHandler;
