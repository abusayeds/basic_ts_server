/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IUserModel, TUser } from "./user-interface";
import config from "../../app/config";

const userSchema = new Schema<TUser, IUserModel>(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});
userSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});
userSchema.statics.isUserExistsByCustomEmail = async function (email: string) {
  return await this.findOne({ email }).select("+password");
};
userSchema.statics.isPasswordMatched = async function name(
  plainTextPassword: string,
  hashPassword: string
) {
  return await bcrypt.compare(plainTextPassword, hashPassword);
};

export const userModel = model<TUser, IUserModel>("User", userSchema);
