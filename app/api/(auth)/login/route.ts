import { NextRequest } from "next/server";
import { prisma } from "@/lib/clients/db-client";
import { userLoginSchema } from "@/lib/validations/user";
import { checkPassword, createJWT, generateResponse } from "@/lib/utils";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate with Zod
    const parsed = userLoginSchema.safeParse(body);
    if (!parsed.success) {
      return generateResponse(400, {
        success: false,
        message: "Validation failed",
        errors: z.treeifyError(parsed.error),
      });
    }

    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        company: true,
      },
    });

    if (!user) {
      return generateResponse(404, {
        success: false,
        message: "User not found",
      });
    }

    // Comparing password
    const validPassword = await checkPassword(password, user.password);

    if (!validPassword) {
      return generateResponse(401, {
        success: false,
        message: "Invalid Password",
      });
    }

    const token = createJWT({
      userId: user.id,
      company: user.company?.id as string,
    });

    // In real production you would create a JWT session here
    return generateResponse(200, {
      success: true,
      message: "Login successful",
      token,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        company: user.company,
      },
    });
  } catch (error) {
    console.error(error);
    return generateResponse(500, {
      success: false,
      message: "Internal server error",
    });
  }
}
