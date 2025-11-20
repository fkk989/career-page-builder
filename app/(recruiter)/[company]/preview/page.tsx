"use client";

import { useEffect, useState } from "react";
import { sectionStorage } from "@/lib/localStorage";
import SectionPreviewRenderer from "@/components/sections/SectionPreviewRenderer";
import { useCompany } from "@/hooks/useCompany";
import { useRouter } from "next/navigation";
import { useUpdateSections } from "@/hooks/useUpdateSection";

export default function PreviewPage() {
    const [sections, setSections] = useState<any[]>([]);
    const { data: company } = useCompany();
    const { mutateAsync } = useUpdateSections()
    const navigate = useRouter()

    useEffect(() => {
        const stored = sectionStorage.getSections();
        if (stored) setSections(stored);
    }, []);

    if (!company)
        return (
            <div className="p-10 text-center text-gray-500">
                Loading company...
            </div>
        );

    return (
        <div className="w-full">
            <div className="w-full my-4 flex items-center justify-end gap-5">
                <button className="px-3 py-1.5 md:px-6 md:py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition max-sm:text-sm"
                    onClick={() => {
                        navigate.push(`/${company.slug}/edit`)
                    }}
                >Edit</button>

                <button className="px-3 py-1.5 md:px-6 md:py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition max-sm:text-sm"
                    onClick={async () => {
                        try {
                            await mutateAsync(sections)
                            navigate.push("/dashboard")
                        } catch (error) {
                            console.log("Error publising sections: ", error)
                        }

                    }}
                >Publish</button>

            </div>
            <div className="w-full flex flex-col items-center min-h-screen  bg-[#f7f7f7]">

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
                <div className="w-[95%] md:w-[50%] flex flex-col items-center mt-5">
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
                            {company.banner && (
                                <p className="text-gray-500 text-sm">Preview Mode</p>
                            )}
                        </div>
                    </header>

                    {/* Sections */}
                    <main className="w-full flex flex-col justify-center gap-[30px] mt-5">
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
        </div>
    );
}
