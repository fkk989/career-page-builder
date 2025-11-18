import { NextRequest } from "next/server";
import { prisma } from "@/lib/clients/db-client";
import { userSignupSchema } from "@/lib/validations/user";
import { createJWT, generateResponse, hashPassword } from "@/lib/utils";
import { z } from "zod";
import { generateAvailableSlug } from "@/lib/slug-generator";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = userSignupSchema.safeParse(body);

    if (!parsed.success) {
      return generateResponse(400, {
        success: false,
        message: "Validation failed",
        errors: z.treeifyError(parsed.error),
      });
    }

    const { company: companyName, name, email, password } = parsed.data;

    // Checking if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return generateResponse(409, {
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await hashPassword(password);

    const { user, company } = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      const company_slug = await generateAvailableSlug(
        companyName,
        async (slug) => {
          const exists = await tx.company.findUnique({ where: { slug } });
          return exists !== null;
        }
      );

      const company = await tx.company.create({
        data: {
          name: companyName,
          userId: user.id,
          slug: company_slug,
        },
      });

      return { user, company };
    });

    const token = createJWT({
      userId: user.id,
      company: company.id,
    });

    return generateResponse(201, {
      success: true,
      message: "User registered successfully",
      token,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        company: company.name,
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
