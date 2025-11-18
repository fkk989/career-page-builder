import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface ResponseProps {
  success: boolean;
  message?: string;
  data?: unknown;
  [key: string]: any;
}

export function generateResponse(status: number, props: ResponseProps) {
  return NextResponse.json(props, { status });
}

export async function hashPassword(password: string): Promise<string> {
  const SALT = parseInt(process.env.SALT as string);
  const genSalt = await bcrypt.genSalt(SALT);
  const hashedPassword = await bcrypt.hash(password, genSalt);
  return hashedPassword;
}

export async function checkPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const passwordMatched = await bcrypt.compare(password, hashedPassword);
  return passwordMatched;
}

interface TokenProps {
  userId: string;
  company: string;
}

export function createJWT(payload: TokenProps) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not set in environment variables");
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET);

  return token;
}

export function verifyJWT(token: string) {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not set in environment variables");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded as TokenProps;
  } catch (error) {
    console.log("Invalid token: ", error);
    return null;
  }
}

export function getTokenFromHeader(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!auth || !auth.startsWith("Bearer ")) return null;
  return auth.split(" ")[1];
}
