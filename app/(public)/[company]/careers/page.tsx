"use client";

import { useEffect, useState } from "react";
import { sectionStorage } from "@/lib/localStorage";
import SectionPreviewRenderer from "@/components/sections/SectionPreviewRenderer";
import { useCompany, useCompanyPublic } from "@/hooks/useCompany";
import { useParams, useRouter } from "next/navigation";
import { Section } from "@prisma/client";

export default function PreviewPage() {
    const [sections, setSections] = useState<Section[]>([]);
    const { company: company_slug } = useParams();

    const { data: company } = useCompanyPublic({ company_slug: company_slug as string });

    useEffect(() => {
        if (company && company.careerSections.length) {
            setSections(company.careerSections)
        }
    }, [company]);

    if (!company)
        return (
            <div className="p-10 text-center text-gray-500">
                Loading company...
            </div>
        );

    return (
        <div className="w-full flex flex-col items-center gap-5 min-h-screen  bg-[#f7f7f7]">

            {/* Banner */}
            {company.banner && (
                <div className="w-full">
                    <img
                        src={company.banner}
                        alt="Banner"
                        className="w-full h-56 object-cover"
                    />
                </div>
            )}
            <div className="w-[95%] md:w-[50%] flex flex-col items-center mt-5 gap-5">
                {/* Company Header */}
                <header className="  shadow-sm flex items-center gap-4">
                    {company.logo && (
                        <img
                            src={company.logo}
                            alt="Company Logo"
                            className="h-12 object-contain"
                        />
                    )}

                    <div>
                        <h1 className="text-2xl font-semibold">{company.name}</h1>
                    </div>
                </header>

                {/* Sections */}
                <main className="flex flex-col gap-5">
                    {sections.length === 0 ? (
                        <p className="text-gray-600 text-center">
                            No sections added yet.
                        </p>
                    ) : (
                        sections.map((section, i) => (
                            <SectionPreviewRenderer key={i} section={section} />
                        ))
                    )}
                </main>
            </div>
        </div>
    );
}
