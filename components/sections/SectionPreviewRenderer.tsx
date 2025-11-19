"use client";

import AboutSectionPreview from "./preview/About";
import JobSectionPreview from "./preview/Job";

export default function SectionPreviewRenderer({ section }: { section: any }) {

    if (section.type === "about") {
        return <AboutSectionPreview content={section.content} />;
    }

    if (section.type === "job") {
        return <JobSectionPreview />;
    }

    return <></>;
}
