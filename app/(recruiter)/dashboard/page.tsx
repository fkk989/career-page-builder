"use client";

import { useCompany } from "@/hooks/useCompany";
import { useUpdateCompany } from "@/hooks/useUpdateCompany";
import { UploadDropzone } from "@/lib/uploadingthings";
import { CompanyInput } from "@/lib/validations/company";
import { use, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function DashboardPage() {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { isSubmitting, isLoading },
    } = useForm<CompanyInput>();

    const logo = watch("logo");
    const banner = watch("banner");

    const { data: Company } = useCompany();
    const { mutateAsync, isPending } = useUpdateCompany()

    useEffect(() => {
        if (Company) reset(Company);
    }, [Company]);

    async function onSubmit(values: CompanyInput) {
        try {
            mutateAsync(values)
        } catch (error) {
            console.log("Error updating compoany details: ", error)
        }
    }

    return (
        <div className="w-[95%] md:max-w-3xl mx-auto py-10">
            <h1 className="text-2xl md:text-4xl font-bold mb-4">Company Details</h1>
            <button className="my-3 text-sm md:text-lg">Career page link: <span
                onClick={async (e) => {
                    try {
                        await navigator.clipboard.writeText(`${window.location.origin}/${Company?.slug}/careers`)
                        alert("Link copied")
                    } catch (error) {
                        alert("Failed to copy link")
                    }
                }}
                className="text-blue-500 hover:text-blue-400 cursor-pointer">
                {`${window.location.origin}/${Company?.slug}/careers`}</span></button>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-8 bg-white p-8 rounded-xl shadow-sm border"
            >
                {/* Company Name */}
                <div className="space-y-1">
                    <label className="block font-semibold text-gray-700">
                        Company Name
                    </label>
                    <input
                        {...register("name")}
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-black/20 outline-none"
                        placeholder="Your company name"
                        required
                    />
                </div>

                {/* Logo */}
                <div className="space-y-2">
                    <label className="block font-semibold text-gray-700">Logo</label>

                    {logo ? (
                        <div className="flex flex-col gap-3">
                            <img
                                src={logo}
                                alt="Logo"
                                className="w-40 h-[50px] object-contain border rounded-lg bg-gray-50 p-2"
                            />
                            <button
                                type="button"
                                onClick={() => setValue("logo", "")}
                                className="text-sm text-red-600 underline"
                            >
                                Remove logo
                            </button>
                        </div>
                    ) : (
                        <div className="border border-dashed rounded-lg p-4 bg-gray-50">
                            <UploadDropzone
                                endpoint="imageUploader"
                                onClientUploadComplete={(res) =>
                                    setValue("logo", res[0].ufsUrl, {
                                        shouldDirty: true,
                                        shouldTouch: true,
                                    })
                                }
                                onUploadError={() => { }}
                            />
                        </div>
                    )}
                </div>

                {/* Banner */}
                <div className="space-y-2">
                    <label className="block font-semibold text-gray-700">
                        Banner Image
                    </label>

                    {banner ? (
                        <div className="flex flex-col gap-3">
                            <img
                                src={banner}
                                alt="Banner"
                                className="w-full h-[150px] object-cover rounded-lg border"
                            />
                            <button
                                type="button"
                                onClick={() => setValue("banner", "")}
                                className="text-sm text-red-600 underline"
                            >
                                Remove banner
                            </button>
                        </div>
                    ) : (
                        <div className="border border-dashed rounded-lg p-4 bg-gray-50">
                            <UploadDropzone
                                endpoint="imageUploader"
                                onClientUploadComplete={(res) =>
                                    setValue("banner", res[0].ufsUrl, {
                                        shouldDirty: true,
                                        shouldTouch: true,
                                    })
                                }
                                onUploadError={() => { }}
                            />
                        </div>
                    )}
                </div>

                {/* Theme Color */}
                <div className="space-y-2">
                    <label className="block font-semibold text-gray-700">
                        Theme Color
                    </label>
                    <input
                        {...register("themeColor")}
                        type="color"
                        className="w-14 h-14 rounded-lg cursor-pointer border"
                    />
                </div>

                {/* Save Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-black text-white px-3 py-1.5 md:px-6 md:py-3 rounded-lg text-lg font-medium hover:bg-black/90 disabled:opacity-60 max-sm:text-lg cursor-pointer"
                >
                    {isPending ? "Saving..." : "Save Changes"}
                </button>
            </form>
        </div>
    );
}
