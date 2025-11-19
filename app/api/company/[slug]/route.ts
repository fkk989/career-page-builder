import { prisma } from "@/lib/clients/db-client";
import { generateResponse } from "@/lib/utils";

export async function GET(
  req: Request,
  ctx: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await ctx.params;

    const company = await prisma.company.findUnique({
      where: { slug },
    });

    if (!company) {
      return generateResponse(400, {
        success: false,
        message: "No company found",
      });
    }

    return generateResponse(200, {
      success: true,
      data: company,
    });
  } catch (e) {
    console.error(e);
    return generateResponse(400, {
      success: false,
      message: "Internal Server Error",
    });
  }
}
