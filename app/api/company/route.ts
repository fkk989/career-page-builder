import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/clients/db-client";
import { generateResponse, getTokenFromHeader, verifyJWT } from "@/lib/utils";
import { companySchema } from "@/lib/validations/company";
import { z } from "zod";

export async function GET(req: NextRequest) {
  try {
    const token = getTokenFromHeader(req);

    if (!token) {
      return generateResponse(401, {
        success: false,
        message: "Unauthorized",
      });
    }

    const decodedToken = verifyJWT(token);

    if (!decodedToken) {
      return generateResponse(401, {
        success: false,
        message: "Unauthorized",
      });
    }

    const company = await prisma.company.findUnique({
      where: { id: decodedToken.company },
    });

    if (!company) {
      return generateResponse(404, {
        success: false,
        message: "Company not found",
      });
    }

    return generateResponse(200, {
      success: true,
      data: company,
    });
  } catch (err) {
    console.error(err);
    return generateResponse(500, {
      success: false,
      message: "Internal server error",
    });
  }
}

export async function PUT(
  req: NextRequest
) {
  try {
    const token = getTokenFromHeader(req);

    if (!token) {
      return generateResponse(401, {
        success: false,
        message: "Unauthorized",
      });
    }

    const decodedToken = verifyJWT(token);
    console.log("Decoded token: ", decodedToken);
    if (!decodedToken) {
      return generateResponse(401, {
        success: false,
        message: "Unauthorized",
      });
    }

    const body = await req.json();
    const parsed = companySchema.safeParse(body);

    if (!parsed.success) {
      return generateResponse(400, {
        success: false,
        message: "Validation fildes",
        errors: z.treeifyError(parsed.error),
      });
    }

    const updated = await prisma.company.update({
      where: { id: decodedToken.company },
      data: parsed.data,
    });

    return generateResponse(200, {
      success: true,
      message: "Company details updated",
      data: updated,
    });
  } catch (err) {
    console.error(err);
    return generateResponse(500, {
      success: false,
      message: "Internal server error",
    });
  }
}
