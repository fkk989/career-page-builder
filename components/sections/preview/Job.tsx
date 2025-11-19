"use client";

import { useJobs } from "@/hooks/useJobs";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import JobFilters from "./JobFilters";

export default function JobSectionPreview() {
    const { company } = useParams();
    const { data: jobs, isLoading } = useJobs(company as string);

    const [filters, setFilters] = useState({
        location: "",
        department: "",
        employment_type: "",
    });

    // Extract unique filter options
    const filterOptions = useMemo(() => {
        if (!jobs) return { locations: [], departments: [], types: [] };

        return {
            locations: Array.from(new Set(jobs.map((j) => j.location as string))),
            departments: Array.from(new Set(jobs.map((j) => j.department as string))),
            types: Array.from(new Set(jobs.map((j) => j.employment_type as string))),
        };
    }, [jobs]);

    const filteredJobs = useMemo(() => {
        if (!jobs) return [];

        return jobs.filter((job) => {
            return (
                (filters.location ? job.location === filters.location : true) &&
                (filters.department ? job.department === filters.department : true) &&
                (filters.employment_type ? job.employment_type === filters.employment_type : true)
            );
        });
    }, [jobs, filters]);

    const updateFilter = (key: string, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <section className="rounded-lg shadow-sm p-4 border">
            <h3 className="text-xl font-semibold mb-4">Open Roles</h3>

            {/* Filters */}
            <JobFilters
                filters={filters}
                onChange={updateFilter}
                options={filterOptions}
            />

            {/* Loading */}
            {isLoading && <p className="text-gray-500 text-sm">Loading jobs...</p>}

            {/* No Jobs */}
            {!isLoading && filteredJobs.length === 0 && (
                <p className="text-gray-500 text-sm">No roles match the filters.</p>
            )}

            {/* Job List */}
            {!isLoading && filteredJobs.length > 0 && (
                <div className="space-y-4 mt-3">
                    {filteredJobs.map((job) => (
                        <div
                            key={job.id}
                            className="rounded-lg border p-4 hover:shadow-sm transition"
                        >
                            <h4 className="font-semibold text-lg">{job.title}</h4>

                            <div className="text-gray-600 text-sm mt-1 space-y-1">
                                <p><b>Location:</b> {job.location}</p>
                                <p><b>Department:</b> {job.department}</p>
                                <p><b>Work policy:</b> {job.work_policy}</p>
                                <p><b>Experience:</b> {job.experience_level}</p>
                                <p><b>Employment type:</b> {job.employment_type}</p>
                                <p><b>Salary:</b> {job.salary_range}</p>
                            </div>

                            <a
                                href={`/job/${job.job_slug}`}
                                className="text-blue-600 text-sm mt-2 inline-block hover:underline"
                            >
                                View Details →
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
