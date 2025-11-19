import { SectionInput } from "@/lib/validations/sections";
import AboutForm from "./forms/AboutForm";
import JobForm from "./forms/JobForm";

interface SectionRendererProps {
    index: number;
    section: SectionInput;
    updateSection: any
}

export default function SectionRenderer({
    index,
    section,
    updateSection,
}: SectionRendererProps) {
    switch (section.type) {
        case "about":
            return (
                <AboutForm
                    section={section}
                    index={index}
                    updateSection={updateSection}
                />
            );

        case "job":
            return <JobForm />;

        default:
            return <div>Unknown section</div>;
    }
}
