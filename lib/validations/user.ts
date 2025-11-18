import { z } from "zod";

export const userSignupSchema = z.object({
  company: z.string().min(2, "Company should be at least 2 characters"),
  name: z.string().min(2, "Name should be at least 2 characters"),
  email: z.email("Invalid email format"),
  password: z.string(),
});

export const userLoginSchema = z.object({
  email: z.email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export type UserSignupInput = z.infer<typeof userSignupSchema>;
export type UserLoginInput = z.infer<typeof userLoginSchema>;
