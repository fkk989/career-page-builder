import { Navbar } from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function RecruiterLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute>
            <div className="min-h-screen">
                <Navbar />
                {/* Page content */}
                <main className="md:p-6">
                    {children}
                </main>
            </div>
        </ProtectedRoute>
    );
}
