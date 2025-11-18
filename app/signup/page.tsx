"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

type LoginFormValues = {
    company: string
    email: string;
    password: string;
};

export default function SignupPage() {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>();

    const onSubmit = async (data: LoginFormValues) => {
        setLoading(true);

        try {


        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow">
                <h1 className="text-2xl font-semibold text-center mb-6">Recruiter Login</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* company */}
                    <div>
                        <label className="block text-sm mb-1">Company</label>
                        <input
                            type="=text"
                            {...register("company", {
                                required: "Company is required"
                            })}
                            className="w-full border rounded-md px-3 py-2"
                            placeholder="Your company name"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.company?.message}</p>
                        )}
                    </div>
                    {/* Email */}
                    <div>
                        <label className="block text-sm mb-1">Email</label>
                        <input
                            type="email"
                            {...register("email", {
                                required: "Email is required", validate: {
                                    matchPattern: (value) =>
                                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || "email is not valid"
                                }
                            })}
                            className="w-full border rounded-md px-3 py-2"
                            placeholder="you@example.com"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm mb-1">Password</label>
                        <input
                            type="password"
                            {...register("password", { required: "Password is required" })}
                            className="w-full border rounded-md px-3 py-2"
                            placeholder="••••••••"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password?.message}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        disabled={loading}
                        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
                    >
                        {loading ? "Signin Up..." : "Sign Up"}
                    </button>
                </form>
            </div>
        </main>
    );
}
