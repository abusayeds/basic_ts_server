import { z } from "zod";

const createUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .max(50, { message: "Name must be at most 50 characters long" }),
    email: z.string().email({ message: "Email must be a valid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 8 characters long" })
      .max(100, { message: "Password must be at most 100 characters long" }),

    phone: z
      .string()
      .min(10, { message: "Phone number must be at least 10 digits" })
      .max(15, { message: "Phone number must be at most 15 digits" }),

    role: z.enum(["admin", "user"], {
      message: "Role must be either 'admin' or 'user'",
    }),
    address: z
      .string()
      .min(1, { message: "Address is required" })
      .max(200, { message: "Address must be at most 200 characters long" }),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "Name is required" })
      .min(1, "Name cannot be empty")
      .optional(),
    coverImage: z
      .string()
      .url({ message: "Cover image must be a valid URL" })
      .optional(),
    profileImage: z
      .string()
      .url({ message: "Profile image must be a valid URL" })
      .optional(),
    email: z
      .string({ required_error: "Email is required" })
      .email("Please enter a valid email address")
      .min(1, "Email cannot be empty")
      .optional(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .optional(),
    phone: z
      .string({ required_error: "Phone number is required" })
      .min(10, "Phone number must be at least 10 digits long")
      .min(1, "Phone number cannot be empty")
      .optional(),
    role: z
      .enum(["admin", "user"], {
        errorMap: () => ({ message: "Role must be either 'admin' or 'user'" }),
      })
      .optional(),
    address: z
      .string({ required_error: "Address is required" })
      .min(1, "Address cannot be empty")
      .optional(),
  }),
});
const changePasswordValidationSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is required",
    }),
    newPassword: z.string({
      required_error: "New Password is required",
    }),
    oldPassword: z.string({
      required_error: "Old Password is required",
    }),
  }),
});

export const userValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
  changePasswordValidationSchema,
};
