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
      select: { id: true },
    });

    if (!company) {
      return generateResponse(400, {
        success: false,
        data: [],
      });
    }

    const jobs = await prisma.job.findMany({
      where: { companyId: company.id },
      orderBy: { postedAt: "desc" },
    });

    return generateResponse(200, {
      success: true,
      data: jobs,
    });
  } catch (e) {
    console.error(e);
    return generateResponse(400, {
      success: false,
      message: "Internal Server Error",
    });
  }
}
