"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { SectionType } from "@/lib/validations/sections";

export default function AddSectionDropdown({ onAdd }: { onAdd: (type: SectionType) => void }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative inline-block">
            {/* Button */}
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="px-3 py-1.5 md:px-6 md:py-3 flex items-center gap-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
                <Plus strokeWidth={1.75} />
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute max-sm:-left-29 mt-2 w-40 bg-white border shadow-lg rounded-md overflow-hidden z-20">
                    {/* About Section */}
                    <button
                        onClick={() => {
                            onAdd("about");
                            setOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                        ➕ About Us
                    </button>

                    {/* Job Section */}
                    <button
                        onClick={() => {
                            onAdd("job");
                            setOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                        ➕ Job Listings
                    </button>
                </div>
            )}
        </div>
    );
}
