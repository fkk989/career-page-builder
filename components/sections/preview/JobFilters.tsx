"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Props = {
    filters: {
        location: string;
        department: string;
        employment_type: string;
    };
    onChange: (key: string, value: string) => void;
    options: {
        locations: string[];
        departments: string[];
        types: string[];
    };
};

export default function JobFilters({ filters, onChange, options }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* ----- Mobile Filter Button ----- */}
            <button
                onClick={() => setOpen(!open)}
                className="max-sm:flex md:hidden w-full border rounded p-2 text-sm items-center justify-between"
            >
                Filters
                <ChevronDown size={16} className={open ? "rotate-180" : ""} />
            </button>

            {/* ----- Mobile Dropdown Panel ----- */}
            {open && (
                <div className="max-sm:block md:hidden  space-y-4 p-4 border rounded-lg bg-white shadow-sm">
                    {/* Location Filter */}
                    <select
                        className="border rounded p-2 text-sm w-full"
                        value={filters.location}
                        onChange={(e) => onChange("location", e.target.value)}
                    >
                        <option value="">All Locations</option>
                        {options.locations.map((loc) => (
                            <option key={loc} value={loc}>
                                {loc}
                            </option>
                        ))}
                    </select>

                    {/* Department Filter */}
                    <select
                        className="border rounded p-2 text-sm w-full"
                        value={filters.department}
                        onChange={(e) => onChange("department", e.target.value)}
                    >
                        <option value="">All Departments</option>
                        {options.departments.map((dep) => (
                            <option key={dep} value={dep}>
                                {dep}
                            </option>
                        ))}
                    </select>

                    {/* Employment Type Filter */}
                    <select
                        className="border rounded p-2 text-sm w-full"
                        value={filters.employment_type}
                        onChange={(e) => onChange("employment_type", e.target.value)}
                    >
                        <option value="">All Employment Types</option>
                        {options.types.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* ----- Desktop 3-select layout ----- */}
            <div className="max-sm:hidden md:grid grid-cols-3 gap-4 mb-6 mt-4">
                {/* Location Filter */}
                <select
                    className="border rounded p-2 text-sm"
                    value={filters.location}
                    onChange={(e) => onChange("location", e.target.value)}
                >
                    <option value="">All Locations</option>
                    {options.locations.map((loc) => (
                        <option key={loc} value={loc}>
                            {loc}
                        </option>
                    ))}
                </select>

                {/* Department Filter */}
                <select
                    className="border rounded p-2 text-sm"
                    value={filters.department}
                    onChange={(e) => onChange("department", e.target.value)}
                >
                    <option value="">All Departments</option>
                    {options.departments.map((dep) => (
                        <option key={dep} value={dep}>
                            {dep}
                        </option>
                    ))}
                </select>

                {/* Employment Type Filter */}
                <select
                    className="border rounded p-2 text-sm"
                    value={filters.employment_type}
                    onChange={(e) => onChange("employment_type", e.target.value)}
                >
                    <option value="">All Employment Types</option>
                    {options.types.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
}
