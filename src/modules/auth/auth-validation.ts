import { z } from "zod";

const createAuthValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

export const authValidation = {
  createAuthValidationSchema,
};
