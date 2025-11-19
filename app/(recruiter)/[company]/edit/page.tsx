"use client";

import { useCallback, useEffect, useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";
import { useParams, useRouter } from "next/navigation";

import SortableItem from "@/components/editor/SortableItem";
import SectionRenderer from "@/components/editor/SectionRenderer";
import { SectionInput } from "@/lib/validations/sections";
import { sectionStorage } from "@/lib/localStorage";
import { useSection } from "@/hooks/useSections";
import { RefreshCcw, Trash } from "lucide-react";
import AddSectionDropdown from "@/components/editor/AddSectionDropdown";
import { defaultSection } from "@/lib/constants";

export default function EditCareerPage() {
    const [sections, setSections] = useState<SectionInput[]>([]);

    const { data: sectionData } = useSection()

    useEffect(() => {
        const draft = sectionStorage.getSections();

        if (draft && draft.length > 0) {
            setSections(draft);
        } else {
            setSections(sectionData || []);
        }
    }, [sectionData]);


    const navigate = useRouter()
    const { company } = useParams()

    function onDragEnd(event: any) {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = sections.findIndex((_, i) => i === active.id);
        const newIndex = sections.findIndex((_, i) => i === over.id);

        const reordered = arrayMove(sections, oldIndex, newIndex)
            .map((s, i) => ({ ...s, order: i })); // updates the section order

        setSections(reordered);
    }

    const updateSection = useCallback(function (index: number, data: any) {
        setSections((prev) =>
            prev.map((section, i) =>
                index === i ? { ...section, ...data } : section
            )
        );
    }, [])

    const removeSection = useCallback(function (index: number) {
        console.log("Remove index: ", index)
        setSections((prev) => {
            const filteredSections = prev.filter((section, i) => index !== i)
            return filteredSections
        }
        );
    }, [])

    return (
        <div className="w-[95%] md:max-w-3xl mx-auto py-10">
            <div className="w-full h-[100px] flex items-center justify-between">
                <h1 className="text-xl md:text-3xl font-semibold">Edit Career Page</h1>

                <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 md:px-6 md:py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                        onClick={() => {
                            sectionStorage.setSections(sections)
                            navigate.push(`/${company}/preview`)
                        }}
                    >Preview</button>
                    <button className="px-3 py-1.5 md:px-6 md:py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                        onClick={() => {
                            sectionStorage.removeSections()
                            if (sectionData && sectionData.length) {
                                setSections(sectionData)
                            } else {
                                setSections([])
                            }
                        }}
                    ><RefreshCcw /></button>
                    <AddSectionDropdown onAdd={(type) => {
                        setSections((pre) => {
                            const sectionToAdd = defaultSection.find((sec) => sec.type === type)

                            if (sectionToAdd) {
                                const updatedSections = [...pre, sectionToAdd]
                                return updatedSections
                            }
                            return pre

                        })
                    }} />
                </div>
            </div>
            <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                <SortableContext
                    items={sections.map((_, index) => index)}
                    strategy={verticalListSortingStrategy}
                >
                    {sections.map((section, index) => (

                        <SortableItem key={index} id={index} >
                            <SectionRenderer
                                index={index}
                                section={section}
                                updateSection={updateSection}
                            />

                            <div className="w-full flex items-center justify-end mt-[10px]">
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded-lg text-lg font-medium hover:bg-red-400 disabled:opacity-60 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        removeSection(index)
                                    }}
                                ><Trash color="white" /></button>
                            </div>
                        </SortableItem>


                    ))}
                </SortableContext>
            </DndContext>
        </div>
    );
}
