import { NextRequest } from "next/server";
import { prisma } from "@/lib/clients/db-client";
import { generateResponse, getTokenFromHeader, verifyJWT } from "@/lib/utils";

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

    const sections = await prisma.section.findMany({
      where: { companyId: decodedToken.company },
    });

    if (!sections) {
      return generateResponse(404, {
        success: false,
        message: "Company not found",
      });
    }

    return generateResponse(200, {
      success: true,
      data: sections,
    });
  } catch (err) {
    console.error(err);
    return generateResponse(500, {
      success: false,
      message: "Internal server error",
    });
  }
}

export async function PUT(req: NextRequest) {
  try {
    // 1. Auth
    const token = getTokenFromHeader(req);
    if (!token) {
      return generateResponse(401, {
        success: false,
        message: "Unauthorized",
      });
    }

    const decoded: any = verifyJWT(token);
    if (!decoded?.userId) {
      return generateResponse(401, {
        success: false,
        message: "Unauthorized",
      });
    }

    const userId = decoded.userId;

    // 2. Get sections from request body
    const { sections } = await req.json();

    if (!Array.isArray(sections)) {
      return generateResponse(400, {
        success: false,
        message: "Sections must be an array",
      });
    }

    // 3. Get company of this user
    const company = await prisma.company.findUnique({
      where: { userId },
    });

    if (!company) {
      return generateResponse(404, {
        success: false,
        message: "Company not found",
      });
    }

    await prisma.section.deleteMany({
      where: { companyId: company.id },
    });

    // 5. Insert new sections with correct order
    const createdSections = await prisma.$transaction(
      sections.map((section, index) =>
        prisma.section.create({
          data: {
            type: section.type,
            content: section.content || {},
            order: index,
            companyId: company.id,
          },
        })
      )
    );

    return generateResponse(200, {
      success: true,
      message: "Sections updated successfully",
      data: createdSections,
    });
  } catch (err) {
    console.error(err);
    return generateResponse(500, {
      success: false,
      message: "Internal server error",
    });
  }
}
