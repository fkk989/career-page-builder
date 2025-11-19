import { SectionInput } from "@/lib/validations/sections";

interface AboutFormProps {
    section: Extract<SectionInput, { type: "about" }>;
    index: number;
    updateSection: (
        index: number,
        data: Partial<Extract<SectionInput, { type: "about" }>>
    ) => void;
}

export default function AboutForm({
    section,
    index,
    updateSection,
}: AboutFormProps) {

    const { title, description } = section.content;

    function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
        updateSection(index, {
            content: {
                ...section.content,
                title: e.target.value,
            },
        });
    }

    function handleDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        updateSection(index, {
            content: {
                ...section.content,
                description: e.target.value,
            },
        });
    }

    return (
        <div className="border rounded p-4 bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-2">About Section</h2>

            <label className="block text-sm mb-1">Title</label>
            <input
                value={title}
                onChange={handleTitleChange}
                className="border w-full rounded p-2 mb-3"
            />

            <label className="block text-sm mb-1">Description</label>
            <textarea
                value={description}
                onChange={handleDescriptionChange}
                className="border w-full rounded p-2"
                rows={4}
            />
        </div>
    );
}
