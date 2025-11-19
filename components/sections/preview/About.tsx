"use client";

export default function AboutSectionPreview({ content }: any) {
    return (
        <section className="rounded-lg shadow-sm">
            <h3 className="text-2xl font-semibold mb-2">{content.title}</h3>
            <p className="text-gray-700 leading-relaxed">{content.description}</p>
        </section>
    );
}
